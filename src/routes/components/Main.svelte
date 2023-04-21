<script lang="ts">
    import { onMount } from "svelte";
    import {
        formatPlayerList,
        formatTime,
        rightPad,
        ticketsHint,
    } from "../../utils";
    import { ClientData, Coalition } from "../data/types";
    import Hint from "./Hint.svelte";
    import MissionList from "./MissionList.svelte";
    import MissionTable from "./MissionTable.svelte";
    import VersionLink from "./VersionLink.svelte";
    export let data: ClientData;

    const DCT_VERSION_PATH = import.meta.env.VITE_DCT_VERSION_PATH;

    let restartTimeLeft: number;
    let currentWorldTime: number;
    let missionTimers: { [key: string]: number } = {};

    function updateTimers() {
        const updateDate = new Date(data.date).getTime();
        const updateAge = (Date.now() - updateDate) / 1000;
        restartTimeLeft =
            data.restartPeriod > 0
                ? 1 + data.restartPeriod - data.modelTime - updateAge
                : null;
        currentWorldTime = data.absTime + updateAge;
        missionTimers = {};
        for (const mission of data.missions) {
            missionTimers[mission.id] =
                mission.timeout - data.absTime - updateAge;
        }
    }

    onMount(() => {
        updateTimers();
        const interval = setInterval(updateTimers, 1000);
        return () => clearInterval(interval);
    });

    let redTickets: string;
    let redTicketsNumber: number;
    let redTicketsStartNumber: startnumber;
    let blueTickets: string;
    let blueTicketsNumber: number;
    let blueTicketsStartNumber: startnumber;

    $: redTickets = data.tickets["1"].text;
    $: redTicketsNumber = data.tickets["1"].number;
    $: redTicketsStartNumber = data.tickets["1"].startnumber;
    $: blueTickets = data.tickets["2"].text;
    $: blueTicketsNumber = data.tickets["2"].number;
    $: blueTicketsStartNumber = data.tickets["2"].startnumber;

    const missionTypes = ['ANTISHIP', 'ARMEDRECON', 'BAI', 'CAP', 'CAS', 'OCA', 'SEAD', 'STRIKE'];
    const availableMissions = missionTypes.map( t => {
        const found = data.availableMissions.find(m => {
            return m.type === t
        });
        return found || {count:0, type: t}
    })
</script>

<section>
    <h1>{data.sortie}</h1>
    <p class="uppercase extra">{data.theater}</p>
</section>

<section>
    <h2>Campaign overview</h2>
    <div class="row">
        <div class="card">
            <h3>Campaign Started:</h3>
            <div><b>{new Date(data.startDate).toLocaleString("uk")}</b></div>
        </div>
        <div class="card">
            <h3>In-Game Time:</h3>
            <div><b>{formatTime(currentWorldTime)}</b></div>
        </div>
        <div class="card">
            <h3>Next Restart:</h3>
            <div><b>{formatTime(restartTimeLeft)}</b></div>
        </div>
        <div class="card">
            <h3>Players Online:</h3>
            <div>
                <b>{data.players.current - 1}</b>/{data.players.max - 1}
            </div>
        </div>
    </div>
</section>

<section>
    <h2>Coalition strength</h2>
    <div class="row coalition">
        <div class="card">
            <h3 class="blue">Blue Coalition:</h3>
            <div><b>{blueTicketsNumber}</b>/{blueTicketsStartNumber} {blueTickets}</div>
        </div>
        <div class="card">
            <h3 class="red">Red Coalition:</h3>
            <div><b>{redTicketsNumber}</b>/{redTicketsStartNumber} {redTickets}</div>
        </div>
    </div>
</section>

<section>
    <h2>Available missions</h2>
    <div class="row missions">
        {#each availableMissions as { type, count }}
            <div class="card">
                <h3 class="uppercase">{type}</h3>
                <div><b>{count}</b></div>
            </div>
        {/each}
    </div>
</section>

<section>
    <h2>Active missions</h2>
    <MissionTable
            className="desktop"
            missions={data.missions}
            {missionTimers}
    />
    <MissionList className="mobile" missions={data.missions} {missionTimers} />
</section>

<section>
    <h2>Airbase Information</h2>
    <div class="row">
        <div class="card">
            <h3 class="blue">Friendly Airbases:</h3>
            {#each data.airbases as airbase}
                {#if airbase.coalition == Coalition.Blue}
                    <div>{airbase.name}</div>
                {/if}
            {/each}
        </div>
        <div class="card">
            <h3 class="red">Hostile Airbases:</h3>
            {#each data.airbases as airbase}
                {#if airbase.coalition == Coalition.Red}
                    <div>{airbase.name}</div>
                {/if}
            {/each}
        </div>
        <div class="card">
            <h3 class="neutral">Neutral Airbases:</h3>
            {#each data.airbases as airbase}
                {#if airbase.coalition == Coalition.Neutral}
                    <div>{airbase.name}</div>
                {/if}
            {/each}
        </div>
    </div>
</section>

<footer>
    <div class="dim">
        Last Update: {new Date(data.date).toLocaleString("uk")}
    </div>
    <div class="dim">
        DCS Version: <VersionLink
            version={data.dcsVersion}
            trailingSlash={true}
    />
<!--        , DCT Version: <VersionLink-->
<!--            base={DCT_VERSION_PATH}-->
<!--            version={data.version}-->
<!--            trim={8}-->
<!--    />-->
    </div>
</footer>
