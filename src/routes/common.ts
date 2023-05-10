import { base } from "$app/paths";
import dayjs from "dayjs";
import type { ClientData } from "./data/types";

import relativeTime from "dayjs/plugin/relativeTime.js";
dayjs.extend(relativeTime);

const nativeFetch = fetch;
type Fetch = typeof nativeFetch;

export async function fetchDataFromServer(fetch = nativeFetch): Promise<ClientData | Error> {
    const response = await fetch(`${base}/data`).catch(() => {
        return new Error("Could not connect to server");
    });
    if (response instanceof Error) {
        return response;
    }
    if (response.status >= 200 && response.status < 400) {
        return response.json().catch((err) => {
            console.error(err);
            return new Error("Could not understand data from server");
        });
    } else {
        return new Error("The server returned an error");
    }
}

export async function getDataAndUserMessage() {
    const data = await fetchDataFromServer();
    if (data instanceof Error) {
        return { data: null, message: `Error: ${data.message}` };
    } else {
        if (dayjs().diff(data.date, "minutes") >= 10) {
            // Warn the user in case the server stops generating new data exports for a while
            const timeAgo = dayjs(data.date).fromNow();
            return { data, message: `Warning: this data is from ${timeAgo}` };
        } else {
            return { data, message: "" };
        }
    }
}
