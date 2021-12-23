import type { EndpointOutput, IncomingRequest } from "@sveltejs/kit";
import axios from "axios";
import sampleData from "../../sample";
import type { Asset, ClientData, ExportData, ExportDataAsset, ExportDataMission, MissionTarget } from "./types";
import { Coalition } from "./types";
import fs from "fs/promises";

function extract<T, R>(obj: T, filter: ((id: string, props: T[keyof T]) => boolean) | false, fn: (id: string, props: T[keyof T]) => R): R[] {
    let values = filter
        ? Object.entries(obj).filter(([id, props]) => filter(id, props))
        : Object.entries(obj);
    return values
        .sort(([a], [b]) => a > b ? 1 : -1)
        .map(([id, props]) => fn(id, props));
}

function target(data: ExportData, { target }: { target: MissionTarget }): Asset {
    const asset: ExportDataAsset = data.coalitions[target.coalition].assets[target.region][target.name];
    return {
        sitetype: asset.sitetype,
        codename: asset.codename,
        status: asset.status,
        type: asset.type,
    }
}

function getAirbases(data: ExportData, coalition?: Coalition) {
    if (coalition == null) {
        return [
            ...getAirbases(data, Coalition.Blue),
            ...getAirbases(data, Coalition.Red),
            ...getAirbases(data, Coalition.Neutral),
        ].flat();
    }
    return extract(data.coalitions[coalition].assets, false, (region, assets) =>
        extract(assets, (_, asset: any) => !asset.dead && asset.type === "AIRBASE", (name, _) => ({
            coalition,
            region,
            name,
        }))
    );
}

function getSAMs(data: ExportData, coalition: Coalition) {
    return extract(data.coalitions[coalition].assets, false, (region, assets) => ({
        name: region,
        assets: extract(assets,
            (_, asset: ExportDataAsset) => !asset.dead && asset.type === "SAM",
            (_, asset: ExportDataAsset) => ({
                sitetype: asset.sitetype ?? "Unknown",
                codename: asset.codename,
            })).sort((a, b) => a.sitetype > b.sitetype ? 1 : -1)
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
            })).sort((a, b) => a.type > b.type ? 1 : -1)
    }));
}

function getMissions(data: ExportData, coalition: Coalition) {
    return extract(data.coalitions[coalition].missions,
        (_, mission: ExportDataMission) => mission.assigned.filter((assigned) => assigned.player != null).length > 0,
        (_, mission: ExportDataMission) => ({
            region: mission.target.region,
            target: target(data, mission),
            assigned: mission.assigned.filter((assigned) => assigned.player != null),
            type: mission.type,
        }))
        .sort((a, b) => a.target > b.target ? 1 : -1)
        .sort((a, b) => a.type > b.type ? 1 : -1);
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
            theater: data.theater,
            version: data.version,
            date: data.date,
            pageTitle: customTitle,
            toJSON() {
                return this;
            },
        },
    };
}
