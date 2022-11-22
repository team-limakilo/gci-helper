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

export function formatTime(totalSeconds: number) {
    if (totalSeconds <= 0) return "0:00:00";
    totalSeconds = totalSeconds % (24 * 60 * 60);
    const hours = String(Math.floor(totalSeconds / 3600));
    const minutes = padTime(Math.floor((totalSeconds / 60) % 60), 2);
    const seconds = padTime(Math.floor(totalSeconds % 60), 2);
    return `${hours}:${minutes}:${seconds}`;
}
