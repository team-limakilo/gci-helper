<script lang="ts">
    import { base } from "$app/paths";
    import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime.js";
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import Toast from "../../components/Toast.svelte";
    import type { ClientData } from "../../data/types";
    import Select from 'svelte-select';
    import Menu from "../../components/Menu.svelte";
    import {formatTime} from "../../../utils.js";

    export let data;
    const slug = data.params.slug + '';
    dayjs.extend(relativeTime);

    let interval: NodeJS.Timer;
    let pageData: any;
    let toasts: ToastData[] = [];
    let error = "";
    let pilots = [];
    let airframes = [];
    let filteredAirframes = [];
    let pilotName = [];
    const general = {
        totalTime: 0,
        totalAirframe: 0,
        totalWeapon: 0,
        totalSorties: 0,
        totalAa: 0,
        totalAg: 0,
        totalLoses: 0,
    }

    async function updateData() {
        async function fetchData(): Promise<ClientData | Error> {
            const response = await fetch(`https://kestrelsnest.co.ua/stats`).catch((e) => {
                console.log(e)
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
            console.log(data)
            error = "";
            pageData = result;
            airframes = [];


            const found = Object.values(pageData.stats).find(item => {
                if (item.names) {
                    const lastName = Object.keys(item.names).length
                    return item.names[lastName] === slug
                }
                return false;
            })

            if (!found) return;

            const times = found.times;
            const lastName = Object.keys(found.names).length
            pilotName = found.names[lastName];

            Object.keys(times).map((name) => {
                const data = times[name];

                data.totalTime = formatTime(data.inAir, true);
                data.ag = 0;
                data.aa = 0;
                data.weapon = '';
                data.sorties = 0;
                data.loses = 0;

                if(data.kills && data.kills['Ground Units']?.total) {
                    data.ag += data.kills['Ground Units'].total;
                }

                if(data.kills && data.kills['Buildings']?.total) {
                    data.ag += data.kills['Buildings'].total;
                }

                if(data.kills && data.kills['Ships']?.total) {
                    data.ag += data.kills['Ships'].total;
                }
                
                if(data.kills?.Planes?.total) {
                    data.aa += data.kills.Planes.total;
                }
                if(data.kills?.Helicopters?.total) {
                    data.aa += data.kills.Helicopters.total;
                }
                
                if(data.weapons) {
                    data.weapon = Object.keys(data.weapons).sort((a, b) => {
                        console.log(a, b)
                        return data.weapons[b].shot - data.weapons[a].shot
                    })[0];
                }

                if(data.kills && data.actions?.landing) {
                    const landing = data.kills && data.actions?.landing;
                    if (landing.landedWhileDamaged) {
                        delete landing.landedWhileDamaged;
                    }
                    data.sorties = Object.values(landing).reduce((a, b) => a + b, 0);
                }

                if (data.actions?.losses) {
                    let death = 0;
                    let crash = 0;
                    let eject = 0;
                    if(data.actions?.losses?.crash) {
                        crash = data.actions.losses.crash;
                    }
                    if(data.actions?.losses?.pilotDeath) {
                        death = data.actions.losses.pilotDeath;
                    }
                    if(data.actions?.losses?.eject) {
                        eject = data.actions.losses.eject;
                    }
                    data.loses = Math.max(crash, death, eject);
                }

                airframes.push({
                    name,
                    ...data
                })
            });

            if (airframes.length) {
              
                general.totalTime = Object.keys(airframes).reduce((a, b) => {
                    return a + airframes[b].inAir;
                }, 0);
                general.totalTime = formatTime(general.totalTime, true);
            
                general.totalAirframe = airframes.sort((a, b) => {
                    return b.sorties - a.sorties;
                })[0].name;
                
                general.totalSorties = airframes.reduce((a, b) => {
                    return a + b.sorties;
                }, 0);
                general.totalAa = airframes.reduce((a, b) => {
                    return a + b.aa;
                }, 0);
                general.totalAg = airframes.reduce((a, b) => {
                    return a + b.ag;
                }, 0);
                general.totalLoses = airframes.reduce((a, b) => {
                    return a + b.loses;
                }, 0);

                const weaponsCounter = {};
                airframes.map(frame => {
                    if (weaponsCounter[frame.weapon]) {
                        weaponsCounter[frame.weapon] += frame.weapon;
                    } else {
                        weaponsCounter[frame.weapon] = 0;
                    }
                });

                general.totalWeapon = Object.keys(weaponsCounter).sort((a, b) => {
                    return weaponsCounter[b].sorties - weaponsCounter[a].sorties;
                })[0];
                

            }
            filteredAirframes = airframes;
        }
    }


    function onSelectWeapon(e) {
        
        if (e.detail) {
            filteredAirframes = [];
            e.detail.forEach(a => {
                filteredAirframes.push(a)
            })
        } else {
            filteredAirframes = airframes;
        }
    }

    onMount(() => {
        updateData();
        window.toasts = writable([]);
        window.toasts.subscribe((value: ToastData[]) => (toasts = value));
    });
</script>

<svelte:head>
    {#if data != null}
        <title>Campaign Statistics</title>
    {/if}
</svelte:head>

<div class="warning {error.length > 0 ? 'visible' : ''}">{error}</div>

<main>
    <Menu></Menu>
    <div class="content">
        {#if data != null}

            <section>
                <h1>{pilotName}</h1>
            </section>

            <section>
                <h2>Pilot Statistics</h2>
                <div class="row">
                    <div class="card">
                        <div class="card-row">
                            <h3>Total Time Flown</h3>
                        </div>
                        <div class="card-row">
                            <div>
                                {general.totalTime}
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-row">
                            <h3>Most Used Airframe</h3>
                        </div>
                        <div class="card-row">
                            <div>
                                {general.totalAirframe}
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-row">
                            <h3>Most Used Weapon</h3>
                        </div>
                        <div class="card-row">
                            <div>
                                {general.totalWeapon}
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-row">
                            <h3>Completed Sorties</h3>
                        </div>
                        <div class="card-row">
                            <div>
                                {general.totalSorties}
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-row">
                            <h3>Total A/A Kills</h3>
                        </div>
                        <div class="card-row">
                            <div>
                                {general.totalAa}
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-row">
                            <h3>Total A/G Kills</h3>
                        </div>
                        <div class="card-row">
                            <div>
                                {general.totalAg}
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-row">
                            <h3>Total Loses</h3>
                        </div>
                        <div class="card-row">
                            <div>
                                {general.totalLoses}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div class="filter-row">
                    <h2>Airframe Statistics</h2>
                    <div class=filters>
                        <!--                <Select items={airframes} -->
                        <!--                 itemId="id" -->
                        <!--                 label="name" -->
                        <!--                 placeholder="All airframes" -->
                        <!--                 multiple-->
                        <!--                 closeListOnChange={false}-->
                        <!--                 on:input={onSelectWeapon}-->
                        <!--                 showChevron />-->
                    </div>
                </div>
                <table class="hide-mobile">
                    <thead>
                    <tr>
                        <th class="dim">Airframe</th>
                        <th class="dim">Total Time Flown</th>
                        <th class="dim">A/A Kills</th>
                        <th class="dim">A/G Kills</th>
                        <th class="dim">Most Used Weapon</th>
                        <th class="dim">Completed Sorties</th>
                        <th class="dim">Loses</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each filteredAirframes as airframe}
                        <tr>
                            <td><b>{airframe.name}</b></td>
                            <td>{airframe.totalTime}</td>
                            <td>{airframe.aa}</td>
                            <td>{airframe.ag}</td>
                            <td>{airframe.weapon}</td>
                            <td>{airframe.sorties}</td>
                            <td>{airframe.loses}</td>
                        </tr>
                    {:else}
                        <tr>
                            <td colspan="999">No data</td>
                        </tr>
                    {/each}
                    </tbody>
                </table>

                <div class="hide-desktop">
                    {#each filteredAirframes as airframe}
                        <ul>
                            <li>
                                <p class="dim">Airframe</p>
                                <p>{airframe.name}</p>
                            </li>
                            <li>
                                <p class="dim">Total Time Flown</p>
                                <p>{airframe.totalTime}</p>
                            </li>
                            <li>
                                <p class="dim">A/A Kills</p>
                                <p>{airframe.aa}</p>
                            </li>
                            <li>
                                <p class="dim">A/G Kills</p>
                                <p>{airframe.ag}</p>
                            </li>
                            <li>
                                <p class="dim">Most Used Weapon</p>
                                <p>{airframe.weapon}</p>
                            </li>
                            <li>
                                <p class="dim">Completed Sorties</p>
                                <p>{airframe.sorties}</p>
                            </li>
                            <li>
                                <p class="dim">Loses</p>
                                <p>{airframe.loses}</p>
                            </li>
                        </ul>
                    {/each}
                    {#if !pilots.length}
                        <ul>
                            <li>
                                <p class="dim">No data</p>
                            </li>
                        </ul>
                    {/if}
                </div>
            </section>
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
        padding-left: 320px;
    }
    .content {
        margin: 0 auto;
        padding: 40px;
        max-width: 1340px;
        width: 100%;
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
        flex: 1 0 13%;
    }
    .card-row {
        display: flex;
        justify-content: space-between;
    }
    footer, th, td {
        font-weight: 400;
        text-align: start;
    }
    table {
        width: 100%;
        border-collapse: collapse;
    }

    tr {
        border-bottom: 12px solid #222429;
    }

    tbody tr {
        background: #272A31;
        border-radius: 4px;
    }

    td, th {
        padding: 16px;
        vertical-align: top;
    }

    td div + div {
        margin-top: 16px;
    }
    .svelte-select {
        background: #272A31 !important;
        border-radius: 0 !important;
    }
    .svelte-select {
        min-height: 56px !important;
        border-color: transparent !important;
    }
    .svelte-select-list {
        background: #272A31 !important;
    }
    .svelte-select-list .item {
        background: #272A31 !important;
    }
    .svelte-select-list .item:hover {
        background: #30333b !important;
    }
    .svelte-select .multi-item{
        background: #43464d !important;
        border-radius: 0 !important;
        outline: none !important;
        border-color: transparent !important;
    }
    ul {
        list-style: none;
        padding: 16px;
        margin: 0;
        margin-bottom: 16px;
        background: #272A31;
    }

    li {
        display: flex;
        border-radius: 4px;
        margin-bottom: 4px;
    }

    li p:first-child {
        min-width: 150px;
    }
    
    .flex-column {
        display: flex;
        flex-direction: column;
    }

    .flex-column div + div {
        margin-top: 6px;
    }

    .filter-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .filters {
        box-sizing: border-box;
        display: flex;
        max-width: 500px;
        width: 100% !important;
        gap: 16px;
        margin-bottom: 16px;
    }
    
    @media ( max-width: 1599px ) {
        .card {
            flex: 1 0 20%
        }
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

        .filter-row {
            flex-direction: column;
        }
        .filters {
            max-width: 100%;
        }
    }

    @media ( max-width: 575px ) {
        .card {
            flex: 1 0 100%
        }

        .missions .card {
            flex: 1 0 41%
        }
        .filters {
            flex-direction: column;
        }
        .filters > div {
            width: 100% !important;
        }
    }

    @media (min-width: 835px) and (max-width: 1225px) {
        .card {
            flex: 1 0 41%;
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
    }

</style>
