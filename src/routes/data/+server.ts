import { json, redirect, type RequestEvent } from "@sveltejs/kit";
import { customTitle, getAirbases, getAssets, getAvailableMissions, getDCSDateTime, getExportData, getMissions, getPlayers, getSAMs, getTickets, getTugOfWar } from "./methods";
import { Coalition, type ExportData } from "./types";

let data: ExportData;

export async function GET(event: RequestEvent): Promise<Response> {
    try {
        data = await getExportData();
    } catch (dataError) {
        console.error("Failed to read latest data:", dataError);
    }

    // Check if cached response is fresh enough
    const clientCachedDate = new Date(event.request.headers.get("if-modified-since"));
    if (!isNaN(clientCachedDate.valueOf()) && new Date(data.date) <= clientCachedDate) {
        throw redirect(304, '');
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
        players: getPlayers(data),
        pageTitle: customTitle,
        restartPeriod: data.period,
        tugOfWar: getTugOfWar(data),
        ended: data.ended,
    });
}
