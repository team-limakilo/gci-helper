import type { ToJSON } from "@sveltejs/kit/types/helper";
import type { ExportData } from "../../sample";
export type { ExportData } from "../../sample";

export interface ClientData extends ToJSON {
    missions: Mission[];
    airbases: Asset[];
    enemySAMs: { name: string, assets: Asset[] }[];
    enemyAssets: { name: string, assets: Asset[] }[];
    tickets: { [coalition: string]: { text?: string }};
    theater: string;
    sortie?: string;
    version: string;
    date: string;
    startDate?: string;
    players?: { current: number, max: number },
    pageTitle?: string;
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
    status?: number;
}

export interface Mission {
    type: string;
    region: string;
    target: Asset;
    assigned: { aircraft: string, group: string, player: string }[];
    mode1?: string;
}

export type ExportDataAsset = ExportData["coalitions"]["1"]["assets"]["Hama"]["Hama_1_Reg3Sa2-1"];
export type ExportDataMission = ExportData["coalitions"]["2"]["missions"]["5500"];
export type ExportDataMissionPilot = ExportData["coalitions"]["2"]["missions"]["5500"]["assigned"][0];

export interface MissionTarget {
    coalition: string;
    region: string;
    name: string;
}
