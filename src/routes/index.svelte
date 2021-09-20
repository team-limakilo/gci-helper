<script lang="ts">
    import data from "../data";

    const RED = 1;
    const BLUE = 2;
</script>

<h1 class="friendly">Missions</h1>
{#each Object.entries(data.coalitions[BLUE].missions) as [_, mission]}
    <div class="mono">
        <strong>{mission.type}</strong>
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

<h1 class="enemy">SAM Threats</h1>
{#each Object.entries(data.coalitions[RED].assets) as [region, assets]}
    <h2>{region}</h2>
    {#each Object.entries(assets).filter(([_, asset]) => asset.type === "SAM") as [_, asset]}
        <div class="mono">{asset.sitetype}: {asset.codename}</div>
    {:else}
        <div class="mono">Clear</div>
    {/each}
{/each}

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
