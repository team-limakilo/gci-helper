<script lang="ts">
    import { onMount } from "svelte";
    import { ClientData, Coalition } from "./data/types";
    export let data: ClientData;

    let restartTimeLeft: number;
    let currentWorldTime: number;
    let missionTimers: { [key: string]: number } = {};

    function padTime(str: any, len: number) {
        return str.toString().padStart(len, "0");
    }

    function padType(str: any, len: number) {
        return str.toString().padEnd(len, "\xA0");
    }

    function formatTime(totalSeconds: number) {
        if (totalSeconds <= 0) return "0:00:00";
        totalSeconds = totalSeconds % (24 * 60 * 60);
        const hours = String(Math.floor(totalSeconds / 3600));
        const minutes = padTime(Math.floor((totalSeconds / 60) % 60), 2);
        const seconds = padTime(Math.floor(totalSeconds % 60), 2);
        return `${hours}:${minutes}:${seconds}`;
    }

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

    let version: string;
    $: version =
        data.version.length > 20 ? data.version.substring(0, 8) : data.version;
</script>

<section>
    <h1>Overview</h1>
    <div class="mono">
        Campaign Started: {new Date(data.startDate).toLocaleString()}
    </div>
    <div class="mono">
        <span class="friendly">BLUFOR</span> Tickets: {data.tickets["2"].text}
    </div>
    <div class="mono">
        <span class="enemy">REDFOR</span> Tickets: {data.tickets["1"].text}
    </div>
    <div class="mono">
        In-Game Time: {formatTime(currentWorldTime)}
    </div>
    {#if data.restartPeriod > 0}
        <div class="mono">
            Next Restart: {formatTime(restartTimeLeft)}
        </div>
    {/if}
    <div class="mono">
        Players: {data.players.current - 1}/{data.players.max - 1}
    </div>
</section>

<section>
    <h1>Missions</h1>
    <div class="mono spaced">
        <strong>Available</strong>
        {#each data.availableMissions as { type, count }}
            <div>{padType(`${type}:`, 12)} {count}</div>
        {:else}
            <div>None</div>
        {/each}
    </div>
    {#each data.missions as mission}
        <div class="mono spaced">
            <strong class="friendly">{mission.type}</strong>
            <span class="dim">
                M1({mission.mode1}) - Time Left: {formatTime(
                    missionTimers[mission.id]
                )}
            </span>
            <br />
            Region: {mission.region}
            {#if mission.target}
                <br />
                Target: {mission.target.codename} ({mission.target.type})
                {#if mission.target.sitetype}
                    [{mission.target.sitetype}]
                {/if}
            {/if}
            <br />
            Pilots:
            {#each mission.assigned as assigned, index (assigned.group)}
                {#if index !== 0},{/if}
                <span class="player" title="Aircraft: {assigned.aircraft}">
                    {assigned.player}
                </span>
            {/each}
            {#if mission.target}
                <br />
                Status: Active ({mission.target.status}% complete)
            {:else}
                Status: Active
            {/if}
        </div>
    {/each}
</section>

<section>
    <h1>Airbases</h1>
    {#each data.airbases as airbase}
        <div class="mono">
            {#if airbase.coalition == Coalition.Blue}
                <span class="friendly">{padType("Friendly", 8)}</span>
                {airbase.name}
            {:else if airbase.coalition == Coalition.Red}
                <span class="enemy">{padType("Hostile", 8)}</span>
                {airbase.name}
            {:else}
                <span class="neutral">{padType("Neutral", 8)}</span>
                {airbase.name}
            {/if}
        </div>
    {/each}
</section>

<section>
    <h1>SAM Threats</h1>
    {#each data.enemySAMs as region}
        <h2>{region.name}</h2>
        {#each region.assets as asset}
            <div class="mono">
                <span class="enemy">{padType(asset.sitetype, 5)}</span>
                ({asset.codename})
            </div>
        {:else}
            <div class="mono">Clear</div>
        {/each}
    {/each}
</section>

<section>
    <h1>Enemy Assets</h1>
    {#each data.enemyAssets as region}
        <h2>{region.name}</h2>
        {#each region.assets as asset}
            <div class="mono">
                <span class="enemy">{padType(asset.type, 10)}</span>
                ({asset.codename})
            </div>
        {:else}
            <div class="mono">No Assets</div>
        {/each}
    {/each}
</section>

<footer>
    <div class="left dim">
        Last Update: {new Date(data.date).toLocaleString()}
    </div>
    <div class="right dim">
        DCS Version: {data.dcsVersion}, DCT Version: {version}
    </div>
    <br />
</footer>
