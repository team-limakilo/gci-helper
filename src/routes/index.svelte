<script lang="ts">
    import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime.js";
    import { onMount } from "svelte";
    import type { ClientData } from "./data/types";
    import Main from "./main.svelte";
    dayjs.extend(relativeTime);

    let interval: NodeJS.Timer;
    let data: ClientData;
    let error = "";

    async function updateData() {
        async function fetchData(): Promise<ClientData | Error> {
            const response = await fetch("data").catch(() => {
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

        const result = await fetchData();
        if (result instanceof Error) {
            error = `Error: ${result.message}`;
        } else {
            error = "";
            data = result;

            // Warn the user in case the server stops generating new data exports for a while
            if (dayjs().diff(data.date, "minutes") >= 10) {
                const ago = dayjs(data.date).fromNow();
                error = `Warning: this data is from ${ago}`;
            }
        }
    }

    onMount(() => {
        updateData();
        interval = setInterval(updateData, 10 * 1000);
        return () => clearInterval(interval);
    });
</script>

<svelte:head>
    {#if data != null}
        <title>{data.pageTitle || `Campaign Status - ${data.theater}`}</title>
    {/if}
</svelte:head>

<div class="warning {error.length > 0 ? 'visible' : ''}">{error}</div>

<main>
    {#if data != null}
        <Main {data} />
    {:else if error == ""}
        <h1>Loading...</h1>
    {/if}
</main>

<style global>
    body {
        font-family: Arial, Helvetica, sans-serif;
        color: #f0f0f0;
        background: #0f0f0f;
        line-height: 1.25;
        max-width: 1024px;
        padding: 0 1em;
        margin: auto;
    }
    h1 {
        border-bottom: 1px solid #aaa;
        padding: 4px 0;
        font-size: 24pt;
    }
    h2 {
        font-size: 16pt;
    }
    .warning {
        top: -3em;
        position: fixed;
        background: #a33;
        visibility: hidden;
        color: white;
        padding: 0.5em;
        width: calc(1024px - 1em);
        max-width: calc(100% - 3rem);
        transition: top 100ms linear;
        border-radius: 8px;
        text-align: center;
    }
    .warning.visible {
        visibility: visible;
        top: 1em;
    }
    .mono {
        font-family: "Courier New", Courier, monospace;
    }
    .spaced + .spaced {
        margin-top: 1em;
    }
    .friendly {
        color: #5af;
    }
    .enemy {
        color: #f55;
    }
    .neutral {
        color: #ff8;
    }
    .left {
        float: left;
    }
    .right {
        float: right;
    }
    .dim {
        color: #777;
    }
    footer {
        font-size: 10pt;
        margin: 4em 0 1em 0;
    }
</style>
