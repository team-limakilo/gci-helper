<script context="module" lang="ts">
    import type { LoadInput, LoadOutput } from "@sveltejs/kit";
    import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime.js";
    import { onMount } from "svelte";
    import type { ClientData } from "./data";
    import Main from "./main.svelte";
    type Fetch = typeof fetch;

    dayjs.extend(relativeTime);

    function getData(fetch: Fetch) {
        return fetch("data").then((data) => data.json());
    }

    export async function load({ fetch }: LoadInput): Promise<LoadOutput> {
        try {
            return {
                props: {
                    data: await getData(fetch),
                },
            };
        } catch (error) {
            return {
                error,
            };
        }
    }
</script>

<script lang="ts">
    export let data: ClientData;
    let interval: NodeJS.Timer;
    let error = "";

    onMount(() => {
        interval = setInterval(async () => {
            try {
                data = await getData(fetch);
                error = "";
                if (dayjs().diff(data.date, "minutes") >= 10) {
                    const age = dayjs(data.date).fromNow(true);
                    error = `Warning: this data is ${age} old (server may be offline)`;
                }
            } catch (err) {
                console.log(err);
                error = `Error: ${err.message ?? "Unknown error"}`;
                throw err;
            }
        }, 5000);
        return () => clearInterval(interval);
    });
</script>

<div class="warning {error.length > 0 ? 'visible' : ''}">{error}</div>

<main>
    {#if data != null}
        <Main {data} />
    {:else}
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
