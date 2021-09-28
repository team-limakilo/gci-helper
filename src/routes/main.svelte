<script lang="ts">
    import { ClientData, Coalition } from "./data/types";
    export let data: ClientData;

    let version: string;
    $: version =
        data.version.length > 20 ? data.version.substring(0, 8) : data.version;
</script>

<section>
    <h1>Missions</h1>
    {#each data.missions as mission}
        <div class="mono spaced">
            <strong class="friendly">{mission.type}</strong>
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
            Pilots: {mission.assigned
                .map((assigned) => assigned.player)
                .join(", ")}
            {#if mission.target}
                <br />
                Status: Active ({mission.target.status}% complete)
            {:else}
                Status: Active
            {/if}
        </div>
    {:else}
        <div class="mono">No Missions</div>
    {/each}
</section>

<section>
    <h1>Airbases</h1>
    {#each data.airbases as airbase}
        <div class="mono">
            {#if airbase.coalition == Coalition.Blue}
                <span class="friendly">Friendly</span> {airbase.name}
            {:else if airbase.coalition == Coalition.Red}
                <span class="enemy">Hostile&nbsp;</span> {airbase.name}
            {:else}
                <span class="neutral">Neutral&nbsp;</span> {airbase.name}
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
                <span class="enemy">{asset.sitetype}</span> ({asset.codename})
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
                <span class="enemy">{asset.type}</span> ({asset.codename})
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
    <div class="right dim">Server DCT Version: {version}</div>
    <br />
</footer>
