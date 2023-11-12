import fs from 'fs';
export async function load(event) {

    const data = fs.readFileSync(process.env["ANALYTICS_DATA_PATH"],
        { encoding: 'utf8', flag: 'r' });
    const traffic = JSON.parse(`[${data.slice(0, -1)}]`);

    event.setHeaders({
        "Cache-Control": "max-age=300, must-revalidate",
        "Last-Modified": new Date(traffic[traffic.length-1].time).toUTCString()
    });

    return {
        traffic
    };
}