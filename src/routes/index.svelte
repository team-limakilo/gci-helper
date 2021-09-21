<script lang="ts">
    import data from "../data";

    const RED = 1;
    const BLUE = 2;
</script>

<section>
    <h1>Missions</h1>
    {#each Object.entries(data.coalitions[BLUE].missions) as [_, mission]}
        <div class="mono">
            <strong class="friendly">{mission.type}</strong>
            <br />
            Region: {mission.target.region}
            <br />
            Target: {data.coalitions[mission.target.coalition].assets[
                mission.target.region
            ][mission.target.name].codename} ({data.coalitions[
                mission.target.coalition
            ].assets[mission.target.region][mission.target.name].type})
            <br />
            Participants: {mission.assigned
                .map((assigned) => assigned.player)
                .join(", ")}
        </div>
    {/each}
</section>

<section>
    <h1>Airbases</h1>
    {#each Object.entries(data.coalitions[BLUE].assets) as [_, assets]}
        {#each Object.entries(assets).filter(([_, asset]) => asset.type === "AIRBASE" && !asset.dead) as [name, _]}
            <div class="mono">
                <span class="friendly">Friendly</span>
                {name}
            </div>
        {/each}
    {/each}
    {#each Object.entries(data.coalitions[RED].assets) as [_, assets]}
        {#each Object.entries(assets).filter(([_, asset]) => asset.type === "AIRBASE" && !asset.dead) as [name, _]}
            <div class="mono">
                <span class="enemy">Hostile&nbsp;</span>
                {name}
            </div>
        {/each}
    {/each}
</section>

<section>
    <h1>SAM Threats</h1>
    {#each Object.entries(data.coalitions[RED].assets) as [region, assets]}
        <h2>{region}</h2>
        {#each Object.entries(assets)
            .filter(([_, asset]) => asset.type === "SAM" && !asset.dead)
            .sort( ([_1, a], [_2, b]) => (a.sitetype > b.sitetype ? 1 : 0) ) as [_, sam]}
            <div class="mono">
                <span class="enemy">{sam.sitetype}</span> ({sam.codename})
            </div>
        {:else}
            <div class="mono">Clear</div>
        {/each}
    {/each}
</section>

<section>
    <h1>Enemy Assets</h1>
    {#each Object.entries(data.coalitions[RED].assets) as [region, assets]}
        <h2>{region}</h2>
        {#each Object.entries(assets)
            .filter(([_, asset]) => asset.type !== "SAM" && asset.strategic && !asset.dead)
            .sort( ([_1, a], [_2, b]) => (a.type > b.type ? 1 : 0) ) as [name, asset]}
            <div class="mono">
                <span class="enemy">{asset.type}</span> ({asset.type ===
                "AIRBASE"
                    ? name
                    : asset.codename})
            </div>
        {:else}
            <div class="mono">No Assets</div>
        {/each}
    {/each}
</section>

<style global>
    body {
        font-family: Arial, Helvetica, sans-serif;
        color: #f0f0f0;
        background: #0f0f0f;
        line-height: 1.25;
        max-width: 1024px;
        padding: 0 1em 4em 1em;
        margin: auto;
    }
    h1 {
        border-bottom: 1px solid #aaa;
        padding: 4px 0;
        font-size: 24pt;
    }
    h2 {
        font-size: 16pt;
    }
    .mono {
        font-family: "Courier New", Courier, monospace;
    }
    .friendly {
        color: #5af;
    }
    .enemy {
        color: #f55;
    }
</style>
