import type { EndpointOutput, IncomingRequest } from "@sveltejs/kit";
import axios from "axios";
import fs from "fs/promises";
import sampleData from "../../sample";
import type { Asset, ClientData, ExportData, ExportDataAsset, ExportDataMission, ExportDataMissionPilot, MissionTarget } from "./types";
import { Coalition } from "./types";

function byKey<T>(key: keyof T) {
    return (a: T, b: T) => {
        return a[key] > b[key] ? 1 : a[key] === b[key] ? 0 : -1;
    }
}

function extract<T, R>(obj: T, filter: ((id: string, props: T[keyof T]) => boolean) | false, fn: (id: string, props: T[keyof T]) => R): R[] {
    let values = filter
        ? Object.entries(obj).filter(([id, props]) => filter(id, props))
        : Object.entries(obj);
    return values
        .sort(([a], [b]) => a > b ? 1 : a === b ? 0 : -1)
        .map(([id, props]) => fn(id, props));
}

function target(data: ExportData, { target }: { target: MissionTarget }): Asset {
    const asset: ExportDataAsset = data.coalitions[target.coalition].assets[target.region][target.name];
    return {
        sitetype: asset?.sitetype != "EWR" ? asset?.sitetype : undefined,
        codename: asset.codename,
        status: asset.status,
        type: asset.type,
    }
}

function getAirbases(data: ExportData, coalitions: Coalition[] = []) {
    if (coalitions.length === 0) {
        coalitions = [Coalition.Blue, Coalition.Neutral, Coalition.Red];
    }
    let output: Asset[] = [];
    for (const coalition of coalitions) {
        const coalitionAirbases = extract(data.coalitions[coalition].assets, false, (region, assets) =>
            extract(assets, (_, asset: any) => !asset.dead && asset.type === "AIRBASE", (name, _) => ({
                coalition,
                region,
                name,
            }))
        );
        output = output.concat(coalitionAirbases.flat().sort(byKey("name")));
    }
    return output;
}

function getSAMs(data: ExportData, coalition: Coalition) {
    return extract(data.coalitions[coalition].assets, false, (region, assets) => ({
        name: region,
        assets: extract(assets,
            (_, asset: ExportDataAsset) => !asset.dead && asset.type === "SAM",
            (_, asset: ExportDataAsset) => ({
                sitetype: asset.sitetype ?? "Unknown",
                codename: asset.codename,
            }))
            .sort(byKey("codename"))
            .sort(byKey("sitetype"))
    }));
}

function getAssets(data: ExportData, coalition: Coalition) {
    return extract(data.coalitions[coalition].assets, false, (region, assets) => ({
        name: region,
        assets: extract(assets,
            (_, asset: ExportDataAsset) => !asset.dead && asset.strategic && asset.type !== "SAM",
            (name, asset: ExportDataAsset) => ({
                codename: asset.type === "AIRBASE" ? name : asset.codename,
                type: asset.type,
            }))
            .sort(byKey("codename"))
            .sort(byKey("type"))
    }));
}

function assignedPilots(mission: ExportDataMission) {
    return mission.assigned
        .filter((assigned) => assigned.player != null)
        .map(({ group, player, aircraft }) => ({ group, player, aircraft }));
}

function getMissions(data: ExportData, coalition: Coalition) {
    return extract(data.coalitions[coalition].missions,
        (_, mission: ExportDataMission) => mission.assigned.filter((assigned) => assigned.player != null).length > 0,
        (_, mission: ExportDataMission) => ({
            region: mission.target.region,
            target: target(data, mission),
            assigned: assignedPilots(mission),
            type: mission.type,
            mode1: mission.iffmode1,
        }))
        .sort(byKey("target"))
        .sort(byKey("type"));
}

function getTickets(data: ExportData) {
    return {
        "1": data.coalitions[1].tickets && {
            text: data.coalitions[1].tickets.text
        },
        "2": data.coalitions[2].tickets && {
            text: data.coalitions[2].tickets.text
        }
    };
}

const exportDataPath = process.env["EXPORT_DATA_PATH"];
const exportDataEndpoint = process.env["EXPORT_DATA_ENDPOINT"];
const exportDataSubkey = process.env["EXPORT_DATA_SUBKEY"];
const customTitle = process.env["CUSTOM_TITLE"];

async function getExportData(): Promise<ExportData> {
    if (exportDataPath != null && exportDataPath.length > 0) {
        const data = await fs.readFile(exportDataPath, { encoding: "utf-8" });
        return JSON.parse(data);
    } else if (exportDataEndpoint != null && exportDataEndpoint.length > 0) {
        const data = await axios.get(exportDataEndpoint).then((response) => response.data);
        if (exportDataSubkey != null && exportDataSubkey.length > 0) {
            return data[exportDataSubkey];
        } else {
            return data;
        }
    } else {
        return sampleData;
    }
}

export async function get(req: IncomingRequest): Promise<EndpointOutput<ClientData>> {
    const data = await getExportData();
    // Return cached response if not newer than the last
    const clientDate = new Date(req.headers["if-modified-since"]);
    if (!isNaN(clientDate.valueOf()) && new Date(data.date) <= clientDate) {
        return {
            status: 304,
        };
    }
    // Otherwise, build a new response
    return {
        headers: {
            "Cache-Control": "no-cache, must-revalidate",
            "Last-Modified": new Date(data.date).toUTCString(),
        },
        body: {
            missions: getMissions(data, Coalition.Blue),
            enemySAMs: getSAMs(data, Coalition.Red),
            enemyAssets: getAssets(data, Coalition.Red),
            airbases: getAirbases(data),
            tickets: getTickets(data),
            theater: data.theater,
            sortie: data.sortie,
            version: data.version,
            date: data.date,
            pageTitle: customTitle,
            toJSON() {
                return this;
            },
        },
    };
}
