import { json, redirect, RequestEvent } from "@sveltejs/kit";
import axios from "axios";
import parser from "luaparse";

export async function GET(event: RequestEvent): Promise<Response> {
    const res = await axios.get('https://kestrelsnest.co.ua/luastats');
    const lua = res.data;
    let ast = await parser.parse(lua, {comments:false});
    const start = ast.body[0].init[0].fields;
    const data = recursiveWalk(start)

    // Then build a new response
    return json({
        stats: data
    });
}

function recursiveWalk(fields) {
    let res = {};
    fields.map(ee => {
        let k = ee.key.raw.replaceAll("\"", "");
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