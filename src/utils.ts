import type { PlayerDetails } from "./routes/data/types";

// Keep a list of known-good DCS chngelogs in case we need to add a .1 or .2 to resolve it
const DCS_CHANGELOG_URLS: { [key: string]: string } = {};

export async function getResolvableDCSVersion(version: string, patch: number | null = null): Promise<string> {
    if (DCS_CHANGELOG_URLS[version]) {
        return DCS_CHANGELOG_URLS[version];
    }

    if (patch === 0) {
        throw new Error(`DCS version = ${version} and tried to look through 5 hotfixes: either there is no such version or there are too many hotfixes to parse through`);
    }

    const base = process.env["VITE_DCS_VERSION_PATH"];
    if (base && version) {
        try {
            const fullVersion = patch != null ? `${version}.${patch}` : version;
            console.log(`Checking DCS changelog page: ${base}/${fullVersion}/`);
            const response = await fetch(`${base}/${fullVersion}/`, { redirect: "follow", signal: AbortSignal.timeout(2500) });
            if (response.status > 500) {
                throw new Error("DCS website internal error");
            } else if (response.status >= 400 && response.status < 500) {
                throw new Error(`DCS website request failed with status: ${response.status}`);
            } else if (response.status >= 200 && response.status < 300) {
                const content = await response.text();
                if (content.includes("not found")) {
                    return getResolvableDCSVersion(version, patch == null ? 5 : patch - 1);
                }
                console.log("Latest hotfix found");
                DCS_CHANGELOG_URLS[version] = fullVersion;
                return fullVersion;
            }
        } catch (error) {
            console.warn(`Failed to get resolvable DCS URL for version ${version}.${patch || 0}: ${error}`);
        }
    }

    return version;
}

export function padTime(str: any, len: number) {
    return str.toString().padStart(len, "0");
}

export function rightPad(str: any, len: number) {
    return str.toString().padEnd(len, "\xA0");
}

export function ticketsHint(text: string) {
    const hint = {
        Critical: "Less than 25%",
        Marginal: "25% to 75%",
        Nominal: "75% to 125%",
        Excellent: "More than 125%",
    };
    return hint[text];
}

export function coalitionName(coalition: string | number, suffix: boolean = false) {
    coalition = coalition.toString();
    switch (coalition) {
        case "0": return "Neutral";
        case "1": return suffix ? "REDFOR" : "Red";
        case "2": return suffix ? "BLUFOR" : "Blue";
        default: return "Unknown";
    }
}

export function formatPlayerList(players: PlayerDetails[]) {
    const byCoalition: { [key: string]: string } = {};
    const sortedPlayers = players.sort((a, b) => a.name > b.name ? 1 : -1);
    for (let player of sortedPlayers) {
        if (player.host) {
            continue;
        }
        if (!byCoalition[player.side]) {
            byCoalition[player.side] = `${coalitionName(player.side, true)} Players:\n`;
        }
        byCoalition[player.side] += ` ${player.name}\n`;
    }
    if (Object.keys(byCoalition).length > 0) {
        return Object.values(byCoalition).join("\n");
    } else {
        return "No players in server";
    }
}

export function formatTime(totalSeconds: number) {
    if (totalSeconds <= 0) return "0:00:00";
    totalSeconds = totalSeconds % (24 * 60 * 60);
    const hours = String(Math.floor(totalSeconds / 3600));
    const minutes = padTime(Math.floor((totalSeconds / 60) % 60), 2);
    const seconds = padTime(Math.floor(totalSeconds % 60), 2);
    return `${hours}:${minutes}:${seconds}`;
}
