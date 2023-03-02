<script lang="ts">
    import { formatTime } from "../../utils";
    import { prettyAircraftName } from "../data/format";
    import type { Mission } from "../data/types";
    import Hint from "./Hint.svelte";

    export let className: string = "";
    export let missions: Mission[];
    export let missionTimers: { [key: string]: number };
</script>

<div class="hide-desktop">
    {#each missions as mission}
    <ul>
        <li>
            <p class="dim">Type</p>
            <p><b>{mission.type}</b></p>
        </li>
        <li>
            <p class="dim">Region</p>
            <p>{mission.region}</p>
        </li>
        <li>
            <p class="dim">Target</p>
            {#if mission.target}
                <p>{mission.target.codename}</p>
            {/if}
        </li>
        <li>
            <p class="dim">BDA</p>
            {#if mission.target}
                <p>{mission.target.status}%</p>
            {:else}
                <p>Active</p>
            {/if}
        </li>
        <li>
            <p class="dim">Time Left</p>
            <p>{formatTime(missionTimers[mission.id])}</p>
        </li>
        <li>
            <p class="dim">Pilot{#if mission.assigned.length > 1}s{/if}</p>
            <div class="flex-column">
            {#each mission.assigned as assigned, index (assigned.group)}
                <div>
                    <p>{assigned.player}</p>
                    <small class="dim">{prettyAircraftName(assigned.aircraft)}</small>
                </div>
            {/each}
            </div>
        </li>
    </ul>
    {/each}
    {#if !missions.length}
        <ul>
            <li>
                <p class="dim">No active missions</p>
            </li>
        </ul>
    {/if}
</div>

<style>
    ul {
        list-style: none;
        padding: 16px;
        margin: 0;
        margin-bottom: 16px;
        background: #272A31;
    }

    li {
        display: flex;
        border-radius: 4px;
        margin-bottom: 4px;
    }

    li p:first-child {
        min-width: 120px;
    }
    
    .flex-column {
        display: flex;
        flex-direction: column;
    }

    .flex-column div + div {
        margin-top: 6px;
    }
</style>