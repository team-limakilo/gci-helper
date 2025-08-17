import axios from "axios";
import crypto from "crypto";
import fs from "fs/promises";
import getSampleData from "../../sample";
import type { Asset, ExportData, ExportDataAsset, ExportDataMission, MissionTarget } from "./types";
import { Coalition } from "./types";

export const exportDataPath = process.env["EXPORT_DATA_PATH"];
export const exportDataEndpoint = process.env["EXPORT_DATA_ENDPOINT"];
export const exportDataSubkey = process.env["EXPORT_DATA_SUBKEY"];
export const hideRegions = parseList(process.env["HIDE_REGIONS"]);
export const customTitle = process.env["CUSTOM_TITLE"];

function parseList(env?: string): string[] {
    if (env == null) {
        return [];
    } else {
        return env.split(",");
    }
}

async function getSalt() {
    const keyPath = "salt.txt";
    try {
        await fs.stat(keyPath);
    } catch (err) {
        if (err.code === "ENOENT") {
            await fs.writeFile(keyPath, crypto.randomBytes(8).toString("base64"));
        } else {
            throw err;
        }
    }
    return fs.readFile(keyPath, { encoding: "utf-8" });
}

const SALT = await getSalt();

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

function assignedPilots(mission: ExportDataMission) {
    return mission.assigned
        .filter((assigned) => assigned.player != null)
        .map(({ group, player, type: aircraft }) => ({ group, player, aircraft }));
}

export function getAirbases(data: ExportData, coalitions: Coalition[] = []) {
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

export function getSAMs(data: ExportData, coalition: Coalition) {
    return extract(data.coalitions[coalition].assets,
        (region, _) => !hideRegions.includes(region),
        (region, assets) => ({
            name: region,
            assets: extract(assets,
                (_, asset: ExportDataAsset) =>
                    !asset.dead &&
                    !asset.ignore &&
                    asset.type === "SAM",
                (_, asset: ExportDataAsset) => ({
                    sitetype: asset.sitetype ?? "Unknown",
                    codename: asset.codename,
                }))
                .sort(byKey("codename"))
                .sort(byKey("sitetype"))
        })
    );
}

export function getStaticAssets(data: ExportData, coalition: Coalition) {
    return extract(data.coalitions[coalition].assets,
        (region, _) => !hideRegions.includes(region),
        (region, assets) => ({
            name: region,
            assets: extract(assets,
                (_, asset: ExportDataAsset) =>
                    !asset.dead &&
                    !asset.ignore &&
                    asset.strategic &&
                    asset.type !== "SAM",
                (name, asset: ExportDataAsset) => ({
                    codename: asset.type === "AIRBASE" ? name : asset.codename,
                    type: asset.type,
                }))
                .sort(byKey("codename"))
                .sort(byKey("type"))
        })
    );
}

export function getMissions(data: ExportData, coalition: Coalition) {
    return extract(data.coalitions[coalition].missions,
        (_, mission: ExportDataMission) => mission.assigned.filter((assigned) => assigned.player != null).length > 0,
        (id, mission: ExportDataMission) => {
            let regionName = mission.target.region || "";
            if (hideRegions.includes(regionName)) {
                regionName = "Other";
            }
            return {
                id: crypto.createHash("sha1").update(`${SALT}${id}`).digest("hex").substring(0, 8),
                region: regionName,
                target: target(data, mission),
                assigned: assignedPilots(mission),
                type: mission.type,
                mode1: mission.iffmode1,
                timeout: mission.timeout,
            };
        })
        .sort(byKey("target"))
        .sort(byKey("type"));
}

export function getAvailableMissions(data: ExportData, coalition: Coalition) {
    if (data.coalitions[coalition].commander) {
        return Object.entries(data.coalitions[coalition].commander.availablemissions)
            .map(([type, count]) => ({ type, count }))
            .sort(byKey("type"));
    }
}

export function getTickets(data: ExportData) {
    const tickets = {};
    if (data.coalitions[1].tickets.text) {
        tickets[1] = { text: data.coalitions[1].tickets.text };
    }
    if (data.coalitions[2].tickets.text) {
        tickets[2] = { text: data.coalitions[2].tickets.text };
    }
    if (Object.keys(tickets).length > 0) {
        return tickets;
    }
}

export function getPlayers(data: ExportData) {
    return {
        list: data.players.list?.map((player) => ({
            name: player.name,
            side: player.side?.toString(),
            slot: player.slot?.toString(),
            host: player.id === 1 || undefined,
        })),
        current: data.players.current,
        max: data.players.max,
    };
}

export function getTugOfWar(data: ExportData) {
    const blueRatio = Math.min(data.coalitions[2].tickets.current / data.coalitions[2].tickets.start, 1);
    const redRatio = Math.min(data.coalitions[1].tickets.current / data.coalitions[1].tickets.start, 1);
    const ratio = 0.5 - (redRatio - blueRatio) / (redRatio + blueRatio) / 2;
    return Math.round(ratio * 100) / 100;
}

export function getDCSDateTime(isoDate: string, absTime: number): Date {
    const date = new Date(isoDate).getTime() + absTime * 1000;
    return new Date(date);
}

export async function getExportData(): Promise<ExportData> {
    if (exportDataPath != null && exportDataPath.length > 0) {
        // Read from file
        const data = await fs.readFile(exportDataPath, { encoding: "utf-8" });
        return JSON.parse(data);
    } else if (exportDataEndpoint != null && exportDataEndpoint.length > 0) {
        // Read from external API
        const data = await axios.get(exportDataEndpoint).then((response) => response.data);
        if (exportDataSubkey != null && exportDataSubkey.length > 0) {
            return data[exportDataSubkey];
        } else {
            return data;
        }
    } else {
        // Serve default data file
        return getSampleData();
    }
}
