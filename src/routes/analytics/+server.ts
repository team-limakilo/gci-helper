import { json, RequestEvent } from "@sveltejs/kit";
import fs from "fs";

export async function GET(event: RequestEvent): Promise<Response> {

    const data = fs.readFileSync(process.env["ANALYTICS_DATA_PATH"],
        { encoding: 'utf8', flag: 'r' });
    const traffic = JSON.parse(`[${data.slice(0, -2)}]`);

    event.setHeaders({
        "Cache-Control": "max-age=60",
        "Access-Control-Allow-Origin": "*",
    });

    return json({
        traffic
    });
}