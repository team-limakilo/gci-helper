import type { ToJSON } from "@sveltejs/kit/types/helper";
import type { ExportData } from "../../sample";
export type { ExportData } from "../../sample";

export interface ClientData extends ToJSON {
    missions: Mission[];
    airbases: Asset[];
    enemySAMs: { name: string, assets: Asset[] }[];
    enemyAssets: { name: string, assets: Asset[] }[];
    theater: string;
    version: string;
    date: string;
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
    status?: string;
}

export interface Mission {
    type: string;
    region: string;
    target: Asset;
    assigned: { group: string, player: string }[];
}

export type ExportDataAsset = ExportData["coalitions"]["1"]["assets"]["Hama"]["Hama_1_Reg3Sa2-1"];

export interface MissionTarget {
    coalition: string;
    region: string;
    name: string;
}
