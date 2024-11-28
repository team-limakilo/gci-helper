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
    import { prettyAircraftName } from "../../data/format";

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
    let showUnits = '';
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
            const response = await fetch(`${base}/stats`).catch(() => {
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
                data.weapon = 'none';
                data.sorties = 0;
                data.loses = 0;
                data.targets = Object.keys(data.kL?.objects || {}).map(k => {
                    return {
                        name: k,
                        count: data.kL?.objects[k]
                    };
                }).sort(((a, b) => b.count - a.count));

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
                        return data.weapons[b].kills - data.weapons[a].kills
                    })[0];
                    // if (weapon[0] === 'M-61' && weapon[1]) {
                    //     data.weapon = weapon[1]
                    // } else {
                    //     data.weapon = weapon[0]
                    // }
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
                    if (+airframes[b].inAir) {
                        return a + airframes[b].inAir;
                    }
                    return a;
                }, 0);
                general.totalTime = formatTime(general.totalTime);
            
                general.totalAirframe = airframes.sort((a, b) => {
                     return b.inAir - a.inAir;
                    return 
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
                    if (frame.weapons) {
                        Object.keys(frame.weapons).map(w => {
                            if (weaponsCounter[w]) {
                                weaponsCounter[w] += frame.weapons[w].kills;
                            } else {
                                weaponsCounter[w] = frame.weapons[w].kills;
                            }
                        });
                    }
                });

                general.totalWeapon = Object.keys(weaponsCounter).sort((a, b) => {
                    return weaponsCounter[b] - weaponsCounter[a];
                })[0];
                

            }
            filteredAirframes = airframes.sort((a, b) => b.inAir - a.inAir);
        }
    }

    function onToggle(name) {
        if (showUnits === name) {
            showUnits = '';
        } else {
            showUnits = name;
        }
        console.log(name)
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
                                {prettyAircraftName(general.totalAirframe)}
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
                        <tr class="airframe-row" on:click={() => onToggle(airframe.name)}>
                            <td><b>{prettyAircraftName(airframe.name)}</b></td>
                            <td>{airframe.totalTime}</td>
                            <td>{airframe.aa}</td>
                            <td>{airframe.ag}</td>
                            <td>{airframe.weapon}</td>
                            <td>{airframe.sorties}</td>
                            <td>{airframe.loses}</td>
                        </tr>
                        {#if showUnits === airframe.name}
                            {#if airframe.targets.length}
                                <tr class="target-row">
                                    <td colspan="7">
                                        <h3 class="target-title"><b>Units destroyed by {airframe.name}</b></h3>
                                       
                                        <div class="target-list">
                                        {#each airframe.targets as t}
                                            <div class="target-item">
                                                <div>
                                                    {t.name}: <span>{t.count}</span>
                                                </div>
                                            </div>
                                        {/each}
                                        </div>
                                    </td>
                                </tr>
                            {:else}
                                <tr>
                                    <td colspan="7">No kills</td>
                                </tr>  
                            {/if}
                        {/if}
                    {:else}
                        <tr>
                            <td colspan="999">No data</td>
                        </tr>
                    {/each}
                    </tbody>
                </table>

                <div class="hide-desktop">
                    {#each filteredAirframes as airframe}
                        <ul on:click={() => onToggle(airframe.name)}>
                            <li>
                                <p class="dim">Airframe</p>
                                <p>{prettyAircraftName(airframe.name)}</p>
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

                        {#if showUnits === airframe.name}
                        <ul class="target-mobile">
                            {#if airframe.targets.length}
                                <li>
                                    <h3 class="target-title"><b>Units destroyed by {airframe.name}</b></h3>
                                
                                    <div class="target-list">
                                    {#each airframe.targets as t}
                                        <div class="target-item">
                                            <div>
                                                {t.name}: <span>{t.count}</span>
                                            </div>
                                        </div>
                                    {/each}
                                    </div>
                                </li>
                            {:else}
                                <li>
                                    No kills
                                </li>  
                            {/if}
                        </ul>
                        {/if}
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
        font-family: "Noto Sans Mono", monospace;
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

    tr + tr {
        border-top: 12px solid #222429;
    }

    .airframe-row:hover {
        background: #272a315e;
        transition: .2s ease;
        cursor: pointer;
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
        background: #272A31;
    }
    ul + ul {
        margin-top: 16px;
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

    /* .target-row {
        border: none;
    } */
    /* .target-row td {
        padding-top: 0;
    } */

    .target-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        max-width: 600px;
    }

    .target-item {
        margin-top: 0;
        color: #C8C8C8;
        font-size: 14px;
        flex: 1 0 40%;

    }
    .target-item div {
        width: 200px;
        display: flex;
        justify-content: space-between;
    }
    .target-title {
        margin-bottom: 16px;
    }

    .target-mobile {
        margin-top: 0;
    }
    .target-mobile li {
        display: list-item;
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
