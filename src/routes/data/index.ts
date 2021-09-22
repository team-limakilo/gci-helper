import type { EndpointOutput, IncomingRequest } from "@sveltejs/kit";
import type { ToJSON } from "@sveltejs/kit/types/helper";
import fs from "fs";
import os from "os";
import path from "path";
import type { ExportData } from "../../sample";
import sampleData from "../../sample";

export interface ClientData extends ToJSON {
    missions: Mission[];
    airbases: Asset[],
    enemysams: { name: string, assets: Asset[] }[],
    enemyassets: { name: string, assets: Asset[] }[],
    theater: string;
    version: string,
    date: string,
}

export enum Coalition {
    Neutral = "0",
    Red = "1",
    Blue = "2",
}

export interface Asset {
    codename?: string;
    type?: string;
    name?: string;
    sitetype?: string;
    coalition?: string;
}

export interface Mission {
    type: string;
    region: string;
    target: Asset;
    assigned: { group: string, player: string }[];
}

type ExportDataAsset = ExportData["coalitions"]["1"]["assets"]["Hama"]["Hama_1_Reg3Sa2-1"];

interface MissionTarget {
    coalition: string;
    region: string;
    name: string;
}

function extract<T, R>(obj: T, filter: ((id: string, props: T[keyof T]) => boolean) | false, fn: (id: string, props: T[keyof T]) => R): R[] {
    let values = filter
        ? Object.entries(obj).filter(([id, props]) => filter(id, props))
        : Object.entries(obj);
    return values.map(([id, props]) => fn(id, props));
}

function target(data: ExportData, { target }: { target: MissionTarget }): Asset {
    const asset = data.coalitions[target.coalition].assets[target.region][target.name];
    return {
        codename: asset.codename,
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
        assets: extract(assets, (_, asset: ExportDataAsset) => !asset.dead && asset.type === "SAM", (_, asset: ExportDataAsset) => ({
            sitetype: asset.sitetype ?? "Unknown",
            codename: asset.codename,
        })).sort((a, b) => a.sitetype > b.sitetype ? 1 : -1)
    }));
}

function getAssets(data: ExportData, coalition: Coalition) {
    return extract(data.coalitions[coalition].assets, false, (region, assets) => ({
        name: region,
        assets: extract(assets, (_, asset: ExportDataAsset) => !asset.dead && asset.strategic && asset.type !== "SAM", (name, asset: ExportDataAsset) => ({
            codename: asset.type === "AIRBASE" ? name : asset.codename,
            type: asset.type,
        })).sort((a, b) => a.type > b.type ? 1 : -1)
    }));
}

async function getExportFilePath(): Promise<string> {
    const savedGames = path.join(os.homedir(), "Saved Games");
    const folders = await fs.promises.readdir(savedGames);
    const DCSFolders = folders.filter((folder) => folder.match(/^DCS(_server)?(\.openbeta)?$/));
    const firstDCSFolder = path.join(savedGames, DCSFolders[0]);
    const DCSFolderContents = await fs.promises.readdir(firstDCSFolder);
    const exportFile = DCSFolderContents.filter((file) => file.endsWith(".export.json"))[0];
    return path.join(firstDCSFolder, exportFile);
}

let exportFilePath: string | undefined;

async function getExportData(): Promise<string> {
    if (import.meta.env.VITE_NETLIFY) {
        return JSON.stringify(sampleData);
    }
    if (!exportFilePath) {
        exportFilePath = await getExportFilePath();
        console.log(`Export file path: ${exportFilePath}`);
    }
    return fs.promises.readFile(exportFilePath, { encoding: "utf-8" });
}

export async function get(req: IncomingRequest): Promise<EndpointOutput<ClientData>> {
    const data: ExportData = JSON.parse(await getExportData());
    const clientDate = new Date(req.headers["if-modified-since"]);
    if (!isNaN(clientDate.valueOf()) && new Date(data.date) < clientDate) {
        return {
            status: 304,
        };
    }
    return {
        headers: {
            "Cache-Control": "no-cache, must-revalidate",
            "Last-Modified": new Date(data.date).toUTCString(),
        },
        body: {
            missions: extract(data.coalitions[Coalition.Blue].missions, false, (_, mission) => ({
                region: mission.target.region,
                target: target(data, mission),
                assigned: mission.assigned,
                type: mission.type,
            })),
            enemysams: getSAMs(data, Coalition.Red),
            enemyassets: getAssets(data, Coalition.Red),
            airbases: getAirbases(data),
            theater: data.theater,
            version: data.version,
            date: data.date,
            toJSON() {
                return this;
            },
        },
    };
}
