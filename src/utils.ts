import type { PlayerDetails } from "./routes/data/types";

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
    for (let player of players) {
        if (player.host) {
            continue;
        }
        if (!byCoalition[player.side]) {
            byCoalition[player.side] = `${coalitionName(player.side, true)} Players\n`;
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
    return `${hours}:${minutes}:${seconds} `;
}
