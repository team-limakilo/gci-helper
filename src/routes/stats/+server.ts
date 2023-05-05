import { json, redirect, RequestEvent } from "@sveltejs/kit";
import parser from "luaparse";
import fs from "fs";

export async function GET(event: RequestEvent): Promise<Response> {

    const filePath = process.env["SLMOD_DATA_PATH"] || '';
    const lua = fs.readFileSync(filePath,
        { encoding: 'utf8', flag: 'r' });
    let ast = await parser.parse(lua, {comments:false});
    const start = ast.body[0].init[0].fields;
    const data = recursiveWalk(start)

    event.setHeaders({
        "Cache-Control": "max-age=60",
    });

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