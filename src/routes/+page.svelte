<script lang="ts">
    import { base } from "$app/paths";
    import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime.js";
    import { onMount } from "svelte";
    import type { ClientData } from "./data/types";
    import Main from "./components/Main.svelte";
    dayjs.extend(relativeTime);

    let interval: NodeJS.Timer;
    let data: ClientData;
    let error = "";

    async function updateData() {
        async function fetchData(): Promise<ClientData | Error> {
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
        <title
            >{data.pageTitle ||
                `Campaign Status - ${data.sortie || data.theater}`}</title
        >
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
    .bold {
        font-weight: bold;
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
    .hint {
        text-decoration: underline dotted;
        text-underline-offset: 4px;
        cursor: help;
    }
    .tickets {
        position: relative;
        display: inline-block;
        background-color: #c33;
        border-radius: 2px;
        height: 0.6em;
        width: 256px;
    }
    .tickets > .bar {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background-color: #27d;
        border-radius: 2px 0 0 2px;
        border-right: 1px dotted white;
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
    /* Desktop layout */
    @media (min-width: 1080px),
        (min-width: 660px) and (orientation: landscape) {
        .grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-auto-flow: row dense;
        }
        .grid > * {
            overflow: auto;
        }
        .grid.spaced {
            gap: 1em;
        }
        .mobile {
            display: none;
        }

        /* Shrink table text on small phones */
        @media (max-width: 1079px) {
            table {
                font-size: 0.9em;
            }
        }
        @media (max-width: 799px) {
            table {
                font-size: 0.8em;
            }
        }
        @media (max-width: 699px) {
            table {
                letter-spacing: -0.5px;
            }
        }
    }
    /* Mobile layout */
    @media (max-width: 659px), (max-width: 1079px) and (orientation: portrait) {
        .grid.spaced > * {
            margin-top: 1em;
        }
        .desktop {
            display: none;
        }
    }
</style>
