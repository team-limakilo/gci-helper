<script lang="ts">
    import { formatTime } from "../../utils";
    import type { Mission } from "../data/types";
    export let className: string = "";
    export let missions: Mission[];
    export let missionTimers: { [key: string]: number };
</script>

<table class={className}>
    <thead class="mono">
        <tr>
            <th>Type</th>
            <th>Region</th>
            <th>Target</th>
            <th>Status</th>
            <th>Time Left</th>
            <th>Pilot</th>
            <th>Aircraft</th>
        </tr>
    </thead>
    <tbody class="mono">
        {#each missions as mission}
            {#each mission.assigned as assigned, index}
                {#if index == 0}
                    <tr class="first">
                        <td class="friendly bold">{mission.type}</td>
                        <td>{mission.region}</td>
                        <td>
                            {#if mission.target}
                                {mission.target.codename} ({mission.target
                                    .type})
                                {#if mission.target.sitetype}
                                    [{mission.target.sitetype}]
                                {/if}
                            {/if}
                        </td>
                        <td>
                            {#if mission.target}
                                {mission.target.status}% complete
                            {:else}
                                Active
                            {/if}
                        </td>
                        <td>{formatTime(missionTimers[mission.id])}</td>
                        <td style="width: 25%">
                            {assigned.player || assigned.group}
                        </td>
                        <td>{assigned.aircraft}</td>
                    </tr>
                {:else}
                    <tr>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td style="width: 25%">
                            {assigned.player || assigned.group}
                        </td>
                        <td>{assigned.aircraft}</td>
                    </tr>
                {/if}
            {/each}
        {/each}
    </tbody>
</table>

<style>
    table {
        border-collapse: collapse;
        table-layout: auto;
        width: 100%;
    }
    th,
    td {
        text-align: left;
        padding: 2px 4px;
    }
    th {
        border-bottom: 1px solid #999;
    }
    th:not(:last-child),
    td:not(:last-child) {
        border-right: 1px solid #999;
    }
    tr.first {
        border-top: 1px solid #444;
    }
</style>
