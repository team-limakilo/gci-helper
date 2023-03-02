<script lang="ts">
    import { formatTime } from "../../utils";
    import { prettyAircraftName } from "../data/format";
    import type { Mission } from "../data/types";

    export let className: string = "";
    export let missions: Mission[];
    export let missionTimers: { [key: string]: number };
</script>

<table class="hide-mobile">
    <thead>
        <tr>
            <th class="dim">Type</th>
            <th class="dim">Region</th>
            <th class="dim">Target</th>
            <th class="dim">BDA</th>
            <th class="dim">Time Left</th>
            <th class="dim">Pilot</th>
            <th class="dim">Aircraft</th>
        </tr>
    </thead>
    <tbody>
        {#each missions as mission}
                <tr>
                    <td><b>{mission.type}</b></td>
                    <td>{mission.region}</td>
                    <td>
                        {#if mission.target}
                            {mission.target.codename}
                        {/if}
                    </td>
                    <td>
                        {#if mission.target}
                            {mission.target.status}%
                        {:else}
                            Active
                        {/if}
                    </td>
                    <td>
                        {formatTime(missionTimers[mission.id])}
                    </td>
                    <td>
                        {#each mission.assigned as assigned, index}
                            <div>{assigned.player || assigned.group}</div>
                        {/each}
                    </td>
                    <td>
                        {#each mission.assigned as assigned, index}
                            <div>{prettyAircraftName(assigned.aircraft)}</div>
                        {/each}
                    </td>
                </tr>
        {:else}
            <tr>
                <td colspan="999">No active missions</td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }

    tr {
        border-bottom: 12px solid #222429;
    }

    tbody tr {
        background: #272A31;
        border-radius: 4px;
    }

    td, th {
        padding: 16px;
        vertical-align: top;
    }

    td div + div {
        margin-top: 16px;
    }
</style>
