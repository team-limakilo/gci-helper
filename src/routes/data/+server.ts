import { json, redirect, RequestEvent } from "@sveltejs/kit";
import { customTitle, getAirbases, getAssets, getAvailableMissions, getDCSDateTime, getExportData, getMissions, getSAMs, getTickets, getTugOfWar } from "./methods";
import { Coalition } from "./types";

export async function GET(event: RequestEvent): Promise<Response> {
    const data = await getExportData();

    // Check if cached response is fresh enough
    const clientCachedDate = new Date(event.request.headers["if-modified-since"]);
    if (!isNaN(clientCachedDate.valueOf()) && new Date(data.date) <= clientCachedDate) {
        return redirect(304, '');
    }

    event.setHeaders({
        "Cache-Control": "no-cache, must-revalidate",
        "Last-Modified": new Date(data.date).toUTCString(),
        "Access-Control-Allow-Origin": "*",
    });

    // Then build a new response
    return json({
        missions: getMissions(data, Coalition.Blue),
        availableMissions: getAvailableMissions(data, Coalition.Blue),
        enemySAMs: getSAMs(data, Coalition.Red),
        enemyAssets: getAssets(data, Coalition.Red),
        airbases: getAirbases(data),
        tickets: getTickets(data),
        theater: data.theater,
        sortie: data.sortie,
        version: data.version,
        date: data.date,
        absTime: data.abstime,
        modelTime: data.modeltime,
        worldDate: getDCSDateTime(data.modeldate, data.abstime).toISOString(),
        startDate: data.startdate,
        dcsVersion: data.dcs_version,
        players: data.players,
        pageTitle: customTitle,
        restartPeriod: data.period,
        tugOfWar: getTugOfWar(data)
    });
}
