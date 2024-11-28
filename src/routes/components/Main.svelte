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
    export let dropdown: any;

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

    let isOpen = false;
    const togglePopup = () => isOpen = !isOpen;

</script>

<section class="header">
    <div class="campaign-name">
        <div>
            <h1 class="prevent-select" on:click={togglePopup}>
                {data.sortie}
                <span class="chevron"></span>
            </h1>
            {#if isOpen}
            <div class="popup">
                {#each dropdown as item}
                    {#if item.active}
                        <a class="menu-item active">
                            <div>
                                <b>{item.campaignName}</b>
                                <span class="map">({item.mapName})</span>
                            </div>
                            <span class="check"></span>
                        </a>
                    {:else}
                        <a data-sveltekit-reload href={`/status/${item.fileName}`} class="menu-item ">
                            <div>
                                <b>{item.campaignName}</b>
                                <span class="map">({item.mapName})</span>
                            </div>
                            <span class="check"></span>
                        </a>
                    {/if}
                {/each}
            </div>
            {/if}
        </div>
        <p class="uppercase extra">{data.theater}</p>
    </div>
    {#if data.weather}
    <div class="metar">
        <div class="raw">
            METAR: <b>{data.weather.raw}</b>
        </div>
        <div class="weather">
            <div>Clouds: <b>{data.weather.clouds}</b></div>
            <div>Temperature: <b>{data.weather.temp} Celcius</b></div>
            <div>Visibility: <b>{data.weather.visibility} meters</b></div>
            <div>QNH: <b>{data.weather.qnh} Hpa</b></div>
            <div>Wind: <b>{data.weather.wind} Kts</b></div>
        </div>
    </div>
    {/if}
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
    <h2>Active missions</h2>
    <MissionTable
            className="desktop"
            missions={data.missions}
            {missionTimers}
    />
    <MissionList className="mobile" missions={data.missions} {missionTimers} />
</section>

<section>
    <h2>Players Online <small>{data.players.current - 1}<span>/{data.players.max - 1}</span></small></h2>
    <div class="row coalition">
        <div class="card">
            <h3 class="blue">Blue Coalition:</h3>
            {#each data.playersBlue as player}
                <div>
                    {player.name}
                </div>
            {/each}
            {#if !data.playersBlue.length}
                <div>none</div>
            {/if}
        </div>
        <div class="card">
            <h3 class="red">Red Coalition:</h3>
            {#each data.playersRed as player}
                <div>
                    {player.name}
                </div>
            {/each}
            {#if !data.playersRed.length}
                <div>none</div>
            {/if}
        </div>
    </div>
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

<section>
    <h2>SAM Threats</h2>
    <div class="row">
        {#each data.enemySAMs as region}
            <div class="card">
                <h3 class="red">{ region.name }:</h3>
                {#each region.assets as a}
                    <div>{ a.sitetype } ({ a.codename })</div>
                {/each}
            </div>
        {/each}
    </div>
</section>

<section>
    <h2>Enemy Assets:</h2>
    <div class="row">
        {#each data.enemyAssets as region}
            <div class="card">
                <h3 class="red">{ region.name }:</h3>
                {#each region.assets as a}
                    <div>{ a.type } ({ a.codename })</div>
                {/each}
            </div>
        {/each}
    </div>
</section>

<footer>
    <div class="dim">
        Last Update: {new Date(data.date).toLocaleString()}
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
<style>
.prevent-select {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

.campaign-name {
    position:relative;
}

.campaign-name p {
    color: #fff;
}

h1 {
    display: flex;
    align-items: center;
    background-color: #272A31;
    padding: 8px 16px;
    margin-bottom: 5px;
    cursor:pointer;
    border-radius: 4px;
}

h1:hover {
    opacity: .95;
}

.popup {
  background: #272A31;
  border-radius: 4px;
  padding: 0;
  font-family: "Noto Sans Mono", monospace;
  position:absolute;
  min-width: 100%;
  width: max-content;
  cursor:pointer;
  margin-top: 5px;
  box-shadow: 0px 8px 25px 0px #00000080;
}

.header {
  color: #FA253C;
  font-size: 18px;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chevron {
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
  display: inline-block;
  margin-left: 16px;
  margin-top: -5px;
}

.menu-item {
  color: #c8c8c8;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
}

.menu-item.active {
  color: #fff;
  background-color: #222429;
  cursor: default;
}

.menu-item:not(.active):hover {
    opacity: .9;
}

.menu-item b {
    font-weight: 700;
}

.menu-item .map {
    color: #c8c8c8;
}

.check {
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
  width: 6px;
  height: 14px;
  transform: rotate(45deg);
  display: none;
  margin-left: 32px;
  margin-top: -2px;
}

.menu-item.active .check {
  display: inline-block;
}
</style>