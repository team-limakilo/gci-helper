import axios from "axios";
import crypto from "crypto";
import fs from "fs/promises";
import getSampleData from "../../sample";
import type { Asset, ExportData, ExportDataAsset, ExportDataMission, MissionTarget } from "./types";
import { Coalition } from "./types";
import 'dotenv/config'

export const exportDataPath = process.env["EXPORT_DATA_PATH"];
export const exportDataFiles = process.env["EXPORT_DATA_FILES"];
export const exportDataEndpoint = process.env["EXPORT_DATA_ENDPOINT"];
export const exportDataSubkey = process.env["EXPORT_DATA_SUBKEY"];
export const customTitle = process.env["CUSTOM_TITLE"];

const SALT = crypto.pseudoRandomBytes(4).toString("hex");

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
    return extract(data.coalitions[coalition].assets, false, (region, assets) => ({
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
    }));
}

export function getAssets(data: ExportData, coalition: Coalition) {
    return extract(data.coalitions[coalition].assets, false, (region, assets) => ({
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
    }));
}

export function getMissions(data: ExportData, coalition: Coalition) {
    return extract(data.coalitions[coalition].missions,
        (_, mission: ExportDataMission) => mission.assigned.filter((assigned) => assigned.player != null).length > 0,
        (id, mission: ExportDataMission) => ({
            id: crypto.createHash("sha1").update(`${SALT}${id}`).digest("hex").substring(0, 8),
            region: mission.target.region,
            target: target(data, mission),
            assigned: assignedPilots(mission),
            type: mission.type,
            mode1: mission.iffmode1,
            timeout: mission.timeout,
        }))
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
        tickets[1] = { 
            text: data.coalitions[1].tickets.text,
            number: data.coalitions[1].tickets.current,
            startnumber: data.coalitions[1].tickets.start
        };
    }
    if (data.coalitions[2].tickets.text) {
        tickets[2] = { 
            text: data.coalitions[2].tickets.text,
            number: data.coalitions[2].tickets.current,
            startnumber: data.coalitions[2].tickets.start
        };
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

export function getAvailableCampaigns() {
    return exportDataFiles?.replace(/\.state\.export\.json/g, "").trim().split("|")
}

export async function getExportData(campaing: string): Promise<ExportData> {


    if (exportDataPath != null && exportDataPath.length > 0) {
        if (!getAvailableCampaigns().includes(campaing)) {
            return
        }

        const filePath = exportDataPath + campaing + '.state.export.json';
        // Read from file
        const data = await fs.readFile(filePath, { encoding: "utf-8" });
        const result = JSON.parse(data);
        result.fileName = campaing;
        return result;
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
