<script lang="ts">
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import { getDataAndUserMessage } from "./common";
    import LoadingSpinner from "./components/LoadingSpinner.svelte";
    import Main from "./components/Main.svelte";
    import Toast from "./components/Toast.svelte";
    import type { ClientData } from "./data/types";

    let interval: NodeJS.Timer;
    let toasts: ToastData[] = [];

    export let data: ClientData;
    export let message = "";

    function updateData() {
        getDataAndUserMessage().then((result) => {
            data = result.data;
            message = result.message;
        });
    }

    onMount(() => {
        updateData();
        window.toasts = writable([]);
        window.toasts.subscribe((value: ToastData[]) => (toasts = value));
        interval = setInterval(updateData, 10 * 1000);
        return () => clearInterval(interval);
    });
</script>

<svelte:head>
    {#if data != null}
        <title>
            {data.pageTitle ||
                `Campaign Status - ${data.sortie || data.theater}`}
        </title>
    {/if}
</svelte:head>

<div class="alert {data.ended ? 'visible' : ''}" tabindex="-1">
    The server is restarting, please wait... <LoadingSpinner />
</div>

<div class="alert error {message.length > 0 ? 'visible' : ''}" tabindex="-1">
    {message}
</div>

<main>
    {#if data != null}
        <Main {data} />
    {:else if message == ""}
        <h1>Loading...</h1>
    {/if}
</main>

{#each toasts as toast (toast.time)}
    <Toast text={toast.text} time={toast.time} />
{/each}

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
    .alert {
        top: -3em;
        left: 50%;
        position: fixed;
        background: #252;
        color: white;
        visibility: hidden;
        padding: 0.5em 1.5em;
        max-width: calc(100% - 5em);
        transition: top 100ms linear, visibility 100ms;
        transform: translateX(-50%);
        border-radius: 8px;
        text-align: center;
        z-index: 1000;
    }
    .alert.error {
        background: #a33;
    }
    .alert.visible {
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
    .warning {
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
    .dim,
    .dim a {
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
            th,
            td {
                padding: 2px 6px !important;
                min-width: 30px;
            }
        }
        @media (max-width: 799px) {
            table {
                font-size: 0.85em;
            }
            .min-small {
                display: none;
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
        .alert {
            transform: unset;
            left: unset;
            width: 100%;
        }
        .desktop {
            display: none;
        }
    }
</style>
