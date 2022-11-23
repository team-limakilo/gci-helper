import type { ExportData } from "../../sample";
export type { ExportData };

export interface ClientData {
    missions: Mission[];
    airbases: Asset[];
    enemySAMs: { name: string, assets: Asset[] }[];
    enemyAssets: { name: string, assets: Asset[] }[];
    tickets: { [coalition: string]: { text?: string } };
    availableMissions: { type: string, count: number }[];
    theater: string;
    sortie: string;
    version: string;
    date: string;
    absTime: number;
    modelTime: number;
    startDate: string;
    worldDate: string;
    dcsVersion: string;
    players: { current: number, max: number, list?: PlayerDetails[] };
    restartPeriod: number;
    pageTitle?: string;
    tugOfWar: number;
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
    id: string;
    type: string;
    region: string;
    target: Asset;
    assigned: { aircraft: string, group: string, player: string }[];
    timeout: number;
    mode1: string;
}

export interface PlayerDetails {
    name: string;
    side: string;
    slot: string;
    host?: boolean;
}

export type ExportDataAsset = ExportData["coalitions"]["1"]["assets"]["Hama"]["Hama_1_Reg3Sa2-1"];
export type ExportDataMission = ExportData["coalitions"]["2"]["missions"]["5730"];
export type ExportDataMissionPilot = ExportData["coalitions"]["2"]["missions"]["5730"]["assigned"][0];

export interface MissionTarget {
    coalition: string;
    region: string;
    name: string;
}
