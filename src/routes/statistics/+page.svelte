<script lang="ts">
    import { base } from "$app/paths";
    import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime.js";
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import Toast from "../components/Toast.svelte";
    import type { ClientData } from "../data/types";
    import Select from 'svelte-select';
    import Menu from "../components/Menu.svelte";
    import {formatTime} from "../../utils";
    import { prettyAircraftName } from "../data/format";

    dayjs.extend(relativeTime);

    let interval: NodeJS.Timer;
    let data: any;
    let toasts: ToastData[] = [];
    let error = "";
    let pilots = [];
    let pilotsFiltered = [];
    let airframeTimes = {}
    const general = {
        topAa: {
            name: '',
            kills: ''
        },
        topAg: {
            name: '',
            kills: ''
        },
        topAirframe: {
            name: '',
            time: ''
        },
        topSorties: {
            name: '',
            amount: ''
        },
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
            data = result;
            pilots = [];

            Object.keys(data.stats).forEach(p => {
                if (!data.stats[p].times || !Object.keys(data.stats[p].times).length) return;

                const times = data.stats[p].times;
                const lastName = Object.keys(data.stats[p].names).length
                const name = data.stats[p].names[ lastName + ''];
                const airframe = Object.keys(times).sort((a, b) => {
                    return times[b].inAir - times[a].inAir;
                })
                const totalTimeSeconds = Object.keys(times).reduce((a, b) => {
                    if (+times[b].inAir) {
                        return a + times[b].inAir;
                    }
                    return a;
                }, 0);
                const totalAa = Object.keys(times).reduce((a, b) => {
                    if(times[b].kills?.Planes?.total) {
                        return a + times[b].kills.Planes.total;
                    }
                    if(times[b].kills?.Helicopters?.total) {
                        return a + times[b].kills.Helicopters.total;
                    }
                    return a;
                }, 0);
                const totalAg = Object.keys(times).reduce((a, b) => {
                    if(times[b].kills && times[b].kills['Ground Units']?.total) {
                        a = a + times[b].kills['Ground Units'].total;
                    }
                    if(times[b].kills && times[b].kills['Buildings']?.total) {
                        a = a + times[b].kills['Buildings'].total;
                    }
                    if(times[b].kills && times[b].kills['Ships']?.total) {
                        a = a + times[b].kills['Ships'].total;
                    }
                    return a;
                }, 0);
                const totalLandings = Object.keys(times).reduce((a, b) => {
                    if(times[b].kills && times[b].actions?.landing) {
                        const landing = times[b].kills && times[b].actions?.landing;
                        if (landing.landedWhileDamaged) {
                            delete landing.landedWhileDamaged;
                        }
                        const total = Object.values(landing).reduce((a, b) => a + b, 0)
                        return a + total;
                    }
                    return a;
                }, 0);
                const totalLoses = Object.keys(times).reduce((a, b) => {
                    let death = 0;
                    let crash = 0;
                    let eject = 0;
                    if(times[b].actions?.losses?.crash) {
                        crash = times[b].actions.losses.crash;
                    }
                    if(times[b].actions?.losses?.pilotDeath) {
                        death = times[b].actions.losses.pilotDeath;
                    }
                    if(times[b].actions?.losses?.eject) {
                        eject = times[b].actions.losses.eject;
                    }
                    return a + Math.max(crash, death, eject);
                }, 0);

                const totalTime = formatTime(totalTimeSeconds, true);

                pilots.push({
                    id: data.stats[p].id,
                    name,
                    airframe: airframe[0],
                    airframeSeconds: times[airframe[0]].inAir,
                    totalTime,
                    totalAa,
                    totalAg,
                    totalLoses,
                    totalLandings,
                    totalTimeSeconds
                })
            });
            
            if (pilots.length) {

                const generalAa = pilots.sort((a, b) => {
                    return b.totalAa - a.totalAa;
                });
                general.topAa.name = generalAa[0].name;
                general.topAa.kills = generalAa[0].totalAa;

                const generalAg = pilots.sort((a, b) => {
                    return b.totalAg - a.totalAg;
                });
                general.topAg.name = generalAg[0].name;
                general.topAg.kills = generalAg[0].totalAg;

                const generalSorties = pilots.sort((a, b) => {
                    return b.totalLandings - a.totalLandings;
                });
                general.topSorties.name = generalSorties[0].name;
                general.topSorties.amount = generalSorties[0].totalLandings;

                airframeTimes = {}
                pilots.forEach(p => {
                    if (airframeTimes[p.airframe]) {
                        airframeTimes[p.airframe].time += +p.airframeSeconds;
                    } else {
                        airframeTimes[p.airframe] = {
                            name: p.airframe,
                            time: p.airframeSeconds,
                        }
                    }
                });
                const generalAirframe:any = Object.values(airframeTimes).sort((a:any, b:any) => {
                    return b.time - a.time;
                })

                general.topAirframe.name = generalAirframe[0].name;
                general.topAirframe.time = formatTime(generalAirframe[0].time, true);
            }
            pilotsFiltered = pilots.sort((a, b) => b.totalTimeSeconds - a.totalTimeSeconds);
        }
    }

    function timeConvert(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return num + " minutes = " + rhours + " hour(s) and " + rminutes + " minute(s).";
    }

    function onSelectPilot(e) {
        
        if (e.detail) {
            pilotsFiltered = [];
            e.detail.forEach(p => {
                pilotsFiltered.push(p)
            })
        } else {
            pilotsFiltered = pilots;
        }
    }

    function onShowPilot(name) {
        window.location = window.location.href + '/' + name;
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
        <h1>{data.data.sortie}</h1>
        <p class="uppercase extra">{data.data.theater}</p>
    </section>
    
    <section>
        <h2>Campaign Statistics</h2>
        <div class="row">
            <div class="card">
                <div class="card-row">
                    <h3>Top Fighter Pilot</h3>
                    <h3>A/A Kills</h3>
                </div>
                <div class="card-row">
                    <div>
                        {general.topAa.name}
                    </div>
                    <div>
                        {general.topAa.kills}
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-row">
                    <h3>Top Attacker Pilot</h3>
                    <h3>A/G Kills</h3>
                </div>
                <div class="card-row">
                    <div>
                        {general.topAg.name}
                    </div>
                    <div>
                        {general.topAg.kills}
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-row">
                    <h3>Most Used Airframe</h3>
                    <h3>Time</h3>
                </div>
                <div class="card-row">
                    <div>
                        {prettyAircraftName(general.topAirframe.name)}
                    </div>
                    <div>
                        {general.topAirframe.time}
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-row">
                    <h3>Completed Sorties</h3>
                    <h3>Pilot</h3>
                </div>
                <div class="card-row">
                    <div>
                        {general.topSorties.amount}
                    </div>
                    <div>
                        {general.topSorties.name}
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section>
        <div class="filter-row">
            <h2>Pilot Statistics</h2>
            <div class=filters>
                <Select items={pilots} 
                 itemId="id" 
                 label="name" 
                 placeholder="All pilots" 
                 multiple
                 closeListOnChange={false}
                 on:input={onSelectPilot}
                 showChevron />
            </div>
        </div>
        <table class="hide-mobile">
            <thead>
                <tr>
                    <th class="dim">Pilot</th>
                    <th class="dim">Total Time Flown</th>
                    <th class="dim">Airframe</th>
                    <th class="dim">A/A Kills</th>
                    <th class="dim">A/G Kills</th>
                    <th class="dim">Loses</th>
                </tr>
            </thead>
            <tbody>
                {#each pilotsFiltered as pilot}
                        <tr on:click={onShowPilot(pilot.name)}>
                            <td><b>{pilot.name}</b></td>
                            <td>{pilot.totalTime}</td>
                            <td>{prettyAircraftName(pilot.airframe)}</td>
                            <td>{pilot.totalAa}</td>
                            <td>{pilot.totalAg}</td>
                            <td>{pilot.totalLoses}</td>
                        </tr>
                {:else}
                    <tr>
                        <td colspan="999">No data</td>
                    </tr>
                {/each}
            </tbody>
        </table>

        <div class="hide-desktop">
            {#each pilotsFiltered as pilot}
            <ul on:click={onShowPilot(pilot.name)}>
                <li>
                    <p class="dim">Pilot</p>
                    <p>{pilot.name}</p>
                </li>
                <li>
                    <p class="dim">Total Time Flown</p>
                    <p>{pilot.totalTime}</p>
                </li>
                <li>
                    <p class="dim">Airframe</p>
                    <p>{pilot.airframe}</p>
                </li>
                <li>
                    <p class="dim">A/A Kills</p>
                    <p>{pilot.totalAa}</p>
                </li>
                <li>
                    <p class="dim">A/G Kills</p>
                    <p>{pilot.totalAg}</p>
                </li>
                <li>
                    <p class="dim">Losses</p>
                    <p>{pilot.totalLoses}</p>
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
        padding-left: 245px;
    }
    .content {
        max-width: 1340px;
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
        flex: 1 0 21%;
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
        cursor: pointer;
    }

    tbody tr {
        background: #272A31;
        border-radius: 4px;
    }

    tbody tr:hover {
        background: #272a315e;
        transition: .2s ease;

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
        cursor: pointer;
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
