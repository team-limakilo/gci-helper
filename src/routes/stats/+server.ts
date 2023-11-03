import { json, redirect, RequestEvent } from "@sveltejs/kit";
import axios from "axios";
import parser from "luaparse";

export async function GET(event: RequestEvent): Promise<Response> {
    const additionalData = {};

    const res = await axios.get('https://campaign.kestrelsnest.co.ua/luastats');
    const lua = res.data;
    let ast = await parser.parse(lua, {comments:false});

    const stats = recursiveWalk(ast.body[0].init[0].fields);

    ast.body.shift();

    const updated = ast.body.map((table, i) => {
        additionalData[i] = [];
        walkThroughKeys(table.variables[0], i);
        const data = {
            fields: additionalData[i].reverse(),
            value: table.init[0].fields ? recursiveWalk(table.init[0].fields) : table.init[0].value
        };

        return convertToObject(data.fields, 0, data.value);
    });

    const mergeUpdated = updated.reduce((a,b)=> {
        return mergeDeep(a, b)
    }, {})

    const updateStats = mergeDeep(stats, mergeUpdated)

    event.setHeaders({
        "Cache-Control": "max-age=60",
        "Access-Control-Allow-Origin": "*",
    });
    // Then build a new response
    return json({
        stats: updateStats
    });

    function walkThroughKeys(data, id) {
        if (data.base) {
            if (data.index?.raw) {
                additionalData[id].push(data.index?.raw?.replaceAll("\"", ""));
            }
            return walkThroughKeys(data.base, id);
        }
    }
}


function convertToObject(arr, i, val) {
    const d = {}
    if (arr[i+1]) {
        let r =  convertToObject(arr, i+1, val);
        d[arr[i]] = r;
    } else {
        d[arr[i]] = val;
    }
    return d;
}

function recursiveWalk(fields) {
    let res = {};
    fields.map(ee => {
        let k = ee.key.raw.replaceAll("\"", "");;
        if (k === 'host') {
            return;
        }
        if (ee.value && ee.value.fields) {
            res[k] = recursiveWalk(ee.value.fields);
        } else if(ee.value && ee.value.value) {
            res[k] = ee.value.value;
        } else if(ee.value && ee.value.raw) {
            res[k] = ee.value.raw.replaceAll("\"", "");
        }
    });
    return res;
}

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}