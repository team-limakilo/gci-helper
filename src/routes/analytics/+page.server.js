import fs from 'fs';
export async function load(event) {

    const data = fs.readFileSync(process.env["ANALYTICS_DATA_PATH"],
        { encoding: 'utf8', flag: 'r' });
    const traffic = JSON.parse(`[${data.slice(0, -2)}]`);
    // const traffic = [];
    //
    // resp.sort((a, b) => {
    //     traffic.push(a);
    //     if (b.time < (a.time - 15*60*1000)) {
    //         traffic.push({ip:'', country:'', time: a.time + 10*60*1000})
    //     }
    // })
    //
    // const lastTime = traffic[traffic.length - 1];
    // if (lastTime.time < (Date.now() - 10*60*1000)) {
    //     traffic.push({ip:'', country:'', time: lastTime.time + 10*60*1000})
    // }
    //
    // console.log(traffic[traffic.length - 1])

    event.setHeaders({
        "Cache-Control": "max-age=300, must-revalidate",
        "Last-Modified": new Date(traffic[traffic.length-1].time).toUTCString()
    });

    return {
        traffic
    };
}