<script lang="ts">
    import { base } from "$app/paths";
    import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime.js";
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import Main from "../components/Main.svelte";
    import Toast from "../components/Toast.svelte";
    import type { ClientData } from "../data/types";
    import Menu from "../components/Menu.svelte";

    dayjs.extend(relativeTime);

    let interval: NodeJS.Timer;
    let data: ClientData;
    let toasts: ToastData[] = [];
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
        window.toasts = writable([]);
        window.toasts.subscribe((value: ToastData[]) => (toasts = value));
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
    <Menu></Menu>
    <div class="content">
        {#if data != null}
            <Main {data} />
        {:else if error == ""}
            <h1>Loading...</h1>
        {/if}
    </div>
</main>

{#each toasts as toast (toast.time)}
    <Toast text={toast.text} time={toast.time} />
{/each}

<style global>
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
    .neutral {
        color: #FBCD55;
    }
    .red {
        color: #FB556C;
    }
    .blue {
        color: #55ABFB;
    }
    .dim {
        color: #C8C8C8;
    }
    .uppercase {
        text-transform: uppercase;
    }
    body {
        font-family: "IBM Plex Mono", Arial, Helvetica, sans-serif;
        color: #fff;
        background: #222429;
        line-height: 1.5;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        margin: 0;
    }
    h1,h2,h3,h4,p {
        margin: 0;
    }
    main {
        padding-left: 245px;
    }

    .content {
        max-width: 1120px;
        margin: 0 auto;
        padding: 40px;
    }
    h1 {
        color: #FA253C;
        font-weight: 700;
        font-size: 24px;
        line-height: 31px;
        text-transform: uppercase;
    }
    h2 {
        font-weight: 700;
        font-size: 20px;
        margin-bottom: 16px;
    }
    h3 {
        font-weight: 400;
        font-size: 14px;
        color: #C8C8C8;
        margin-bottom: 4px;
    }
    h2 span{
        font-weight: 400;
    }
    .extra {
        font-size: 16px;
    }
    section {
        margin-bottom: 40px;
    }
    .row {
        gap: 16px;
        flex-wrap: wrap;
        display: flex;
        justify-content: space-between;
    }
    .row + .row {
        margin-top: 16px;
    }
    .card {
        background: #272A31;
        border-radius: 4px;
        padding: 16px;
        flex: 1 0 21%
    }
    footer, th, td {
        font-weight: 400;
        text-align: start;
    }

    .header {
        display: flex;
        justify-content: space-between;
    }

    .weather {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 40px;
    }

    .weather b {
        display: block;
    }

    .metar {
        font-size: 14px;
    }

    .metar .raw {
        text-align: end;
        margin-bottom: 10px;
    }

    @media ( max-width: 834px ) {
        .content {
            padding: 40px 16px;
        }
        .card {
            flex: 1 0 100%
        }

        .coalition .card {
            flex: 1 0 40%
        }

        .missions .card {
            flex: 1 0 21%
        }

        .metar .raw {
            display: none;
        }
    }

    @media ( max-width: 575px ) {
        .card {
            flex: 1 0 100%
        }

        .missions .card {
            flex: 1 0 41%
        }

        .weather {
            flex-direction: column;
            align-items: flex-start;
        }

        .weather b {
            display: inline;
        }
    }

    @media (max-width: 1000px) {
        .hide-mobile {
            display: none;
        }
        main {
            padding-left: 0;
        }

    }

    @media ( max-width: 1250px ) {
        .header {
            flex-direction: column;
            gap: 40px;
        }

        .weather {
            gap: 10px;
        }
    }

    @media (min-width: 1000px) {
        .hide-desktop {
            display: none;
        }
    }

    @media (min-width: 1600px) {
        .content {
            max-width: 1600px;
        }

        .missions .card {
            flex: 1 0 10%
        }

        .weather b {
            display: inline;
        }
    }

</style>
