<script lang="ts">
    import { formatTime } from "../../utils";
    import type { Mission } from "../data/types";
    export let className: string = "";
    export let missions: Mission[];
    export let missionTimers: { [key: string]: number };
</script>

<div class={className}>
    {#each missions as mission}
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
                <span class="hint" title="Aircraft: {assigned.aircraft}">
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
</div>
