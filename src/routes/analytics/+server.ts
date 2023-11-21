import { json, RequestEvent } from "@sveltejs/kit";
import fs from "fs";
import CryptoJs from 'crypto-js';

export async function GET(event: RequestEvent): Promise<Response> {
    let traffic = [];

    try {
        const data = fs.readFileSync(process.env["ANALYTICS_DATA_PATH"],
            { encoding: 'utf8', flag: 'r' });
        traffic = JSON.parse(`[${data.trim().slice(0, -1)}]`);
        traffic = traffic.map(t => ({...t, ip: CryptoJs.MD5(t.ip).toString()}))
    } catch(e) {}

    return json({
        traffic
    });
}