import { json, redirect, RequestEvent } from "@sveltejs/kit";
import { customTitle, getAirbases, getAssets, getAvailableMissions, getDCSDateTime, getExportData, getMissions, getPlayers, getSAMs, getTickets, getTugOfWar } from "./methods";
import { Coalition } from "./types";
import fs from "fs";
import 'dotenv/config'

export async function GET(event: RequestEvent): Promise<Response> {
    const searchParams = event.url.searchParams;
    const campaign = searchParams.get('c');
    const refresh = searchParams.get('r');
    
    const data = await getExportData(campaign);
    const metarDataPath = process.env["METAR_DATA_PATH"];

    if (!refresh) {
        // Check if cached response is fresh enough
        const clientCachedDate = new Date(event.request.headers.get("if-modified-since"));
        if (!isNaN(clientCachedDate.valueOf()) && new Date(data.date) <= clientCachedDate) {
            throw redirect(304, '');
        }
    }

    let weather = null;

    if (metarDataPath) {
        try {
            const jsonString = fs.readFileSync(process.env["METAR_DATA_PATH"]);
            const resp = JSON.parse(jsonString);
            const w = resp.data[0]
            weather = {
                clouds: w.clouds[0].text,
                temp: w.temperature.celsius,
                visibility: w.visibility.meters,
                wind: `${w.wind.degrees}/${w.wind.speed_kts}`,
                qnh: w.barometer.hpa,
                raw: w.raw_text
            };
        } catch (e) {
            console.log(e)
        }
    }

    event.setHeaders({
        "Cache-Control": "no-cache, must-revalidate",
        "Last-Modified": new Date(data.date).toUTCString(),
        "Access-Control-Allow-Origin": "*",
    });
    const players = getPlayers(data);
    const playersBlue = players?.list?.filter(p => +p.side === 2) || [];
    const playersRed = players?.list?.filter(p => +p.side === 1) || [];

    const samThreads = getSAMs(data, Coalition.Red).filter(sam => sam.assets.length);

    // Then build a new response
    return json({
        missions: getMissions(data, Coalition.Blue),
        availableMissions: getAvailableMissions(data, Coalition.Blue),
        enemySAMs: getSAMs(data, Coalition.Red).filter(sam => sam.assets.length),
        enemyAssets: getAssets(data, Coalition.Red).filter(a => a.assets.length),
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
        pageTitle: customTitle,
        restartPeriod: data.period,
        tugOfWar: getTugOfWar(data),
        players,
        playersBlue,
        playersRed,
        weather
    });
}
