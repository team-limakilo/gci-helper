<script lang="ts">
    import { formatTime } from "../../utils";
    import { prettyAircraftName } from "../data/format";
    import type { Mission } from "../data/types";
    import Hint from "./Hint.svelte";

    export let className: string = "";
    export let missions: Mission[];
    export let missionTimers: { [key: string]: number };
</script>

<div class={className}>
    {#each missions as mission}
        <div class="mono spaced">
            <strong class="friendly">{mission.type}</strong>
            <span class="dim">
                Time Left: {formatTime(missionTimers[mission.id])}
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
                <Hint
                    title="Aircraft: {prettyAircraftName(assigned.aircraft)}"
                    context={assigned.player}
                >
                    {assigned.player}
                </Hint>
            {/each}
            {#if mission.target}
                <br />
                Status: Active ({mission.target.status}% complete)
            {:else}
                Status: Active
            {/if}
        </div>
    {/each}
</div>
