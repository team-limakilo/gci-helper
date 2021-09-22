<script lang="ts">
    import { ClientData, Coalition } from "./data/index";
    export let data: ClientData;
</script>

<svelte:head>
    <title>GCI Helper - {data.theater}</title>
</svelte:head>

<section>
    <h1>Missions</h1>
    {#each data.missions as mission}
        <div class="mono">
            <strong class="friendly">{mission.type}</strong>
            <br />
            Region: {mission.region}
            <br />
            Target: {mission.target.codename} ({mission.target.type})
            <br />
            Participants: {mission.assigned
                .map((assigned) => assigned.player)
                .join(", ")}
        </div>
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
                <span>Neutral&nbsp;</span> {airbase.name}
            {/if}
        </div>
    {/each}
</section>

<section>
    <h1>SAM Threats</h1>
    {#each data.enemysams as region}
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
    {#each data.enemyassets as region}
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
    <div class="right dim">Server DCT Version: {data.version}</div>
    <br />
</footer>
