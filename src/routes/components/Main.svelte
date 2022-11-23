<script lang="ts">
    import { onMount } from "svelte";
    import { formatPlayerList, formatTime, rightPad, ticketsHint } from "../../utils";
    import { ClientData, Coalition } from "../data/types";
    import MissionList from "./MissionList.svelte";
    import MissionTable from "./MissionTable.svelte";
    export let data: ClientData;

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

    let version: string;
    let redTickets: string;
    let blueTickets: string;

    $: version =
        data.version.length > 20 ? data.version.substring(0, 8) : data.version;
    $: redTickets = data.tickets["1"].text;
    $: blueTickets = data.tickets["2"].text;
</script>

<section>
    <h1>Overview</h1>
    <div class="grid">
        <div>
            <div class="mono">
                Campaign Started: {new Date(data.startDate).toLocaleString()}
            </div>
            <div class="mono">
                Tug of War: <div class="tickets">
                    <div class="bar" style={`width: ${data.tugOfWar * 100}%`} />
                </div>
            </div>
            <div class="mono">
                <span class="friendly">BLUFOR</span> Tickets:
                <span class="hint" title={ticketsHint(blueTickets)}
                    >{blueTickets}</span
                >
            </div>
            <div class="mono">
                <span class="enemy">REDFOR</span> Tickets:
                <span class="hint" title={ticketsHint(redTickets)}
                    >{redTickets}</span
                >
            </div>
        </div>
        <div>
            <br />
            <div class="mono">
                In-Game Time: {formatTime(currentWorldTime)}
            </div>
            {#if data.restartPeriod > 0}
                <div class="mono">
                    Next Restart: {formatTime(restartTimeLeft)}
                </div>
            {/if}
            <div class="mono">
                Players:
                {#if data.players.list}
                    <span class="hint" title={formatPlayerList(data.players.list)}>
                        {data.players.current - 1}/{data.players.max - 1}
                    </span>
                {:else}
                    {data.players.current - 1}/{data.players.max - 1}
                {/if}
            </div>
        </div>
    </div>
</section>

<section>
    <h1>Missions</h1>
    <div class="mono spaced">
        <strong>Available</strong>
        {#each data.availableMissions as { type, count }}
            <div>{rightPad(`${type}:`, 12)} {count}</div>
        {:else}
            <div>None</div>
        {/each}
    </div>
    <br />
    <MissionTable
        className="desktop"
        missions={data.missions}
        {missionTimers}
    />
    <MissionList className="mobile" missions={data.missions} {missionTimers} />
</section>

<section>
    <h1>Airbases</h1>
    <div class="grid">
        <div>
            {#each data.airbases as airbase}
                <div class="mono">
                    {#if airbase.coalition == Coalition.Blue}
                        <span class="friendly">{rightPad("Friendly", 8)}</span>
                        {airbase.name}
                    {/if}
                </div>
            {/each}
        </div>
        <div>
            {#each data.airbases as airbase}
                <div class="mono">
                    {#if airbase.coalition == Coalition.Neutral}
                        <span class="neutral">{rightPad("Neutral", 8)}</span>
                        {airbase.name}
                    {/if}
                </div>
            {/each}
            {#each data.airbases as airbase}
                <div class="mono">
                    {#if airbase.coalition == Coalition.Red}
                        <span class="enemy">{rightPad("Hostile", 8)}</span>
                        {airbase.name}
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</section>

<section>
    <h1>SAM Threats</h1>
    <div class="grid">
        {#each data.enemySAMs as region}
            <div>
                <h2>{region.name}</h2>
                {#each region.assets as asset}
                    <div class="mono">
                        <span class="enemy">{rightPad(asset.sitetype, 5)}</span>
                        ({asset.codename})
                    </div>
                {:else}
                    <div class="mono">Clear</div>
                {/each}
            </div>
        {/each}
    </div>
</section>

<section>
    <h1>Enemy Assets</h1>
    <div class="grid">
        {#each data.enemyAssets as region}
            <div>
                <h2>{region.name}</h2>
                {#each region.assets as asset}
                    <div class="mono">
                        <span class="enemy">{rightPad(asset.type, 10)}</span>
                        ({asset.codename})
                    </div>
                {:else}
                    <div class="mono">No Assets</div>
                {/each}
            </div>
        {/each}
    </div>
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
