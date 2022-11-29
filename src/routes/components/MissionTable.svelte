<script lang="ts">
    import { formatTime } from "../../utils";
    import { prettyAircraftName } from "../data/format";
    import type { Mission } from "../data/types";

    export let className: string = "";
    export let missions: Mission[];
    export let missionTimers: { [key: string]: number };
</script>

<table class={"mono " + className}>
    <thead>
        <tr>
            <th>Type</th>
            <th>Region</th>
            <th>Target</th>
            <th>BDA</th>
            <th>Time Left</th>
            <th>Pilot</th>
            <th>Aircraft</th>
        </tr>
    </thead>
    <tbody>
        {#each missions as mission}
            {#each mission.assigned as assigned, index}
                {#if index == 0}
                    <tr class="first">
                        <td class="friendly bold nobreak">{mission.type}</td>
                        <td class="nobreak">{mission.region}</td>
                        <td>
                            {#if mission.target}
                                {mission.target.codename}
                                <span class="min-small">({mission.target.type})</span>
                                {#if mission.target.sitetype}
                                    [{mission.target.sitetype}]
                                {/if}
                            {/if}
                        </td>
                        <td class="numbers">
                            {#if mission.target}
                                {mission.target.status}%
                            {:else}
                                Active
                            {/if}
                        </td>
                        <td class="numbers">
                            {formatTime(missionTimers[mission.id])}
                        </td>
                        <td class="name">
                            {assigned.player || assigned.group}
                        </td>
                        <td>{prettyAircraftName(assigned.aircraft)}</td>
                    </tr>
                {:else}
                    <tr>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td class="name">
                            {assigned.player || assigned.group}
                        </td>
                        <td>{prettyAircraftName(assigned.aircraft)}</td>
                    </tr>
                {/if}
            {/each}
        {:else}
            <tr class="first message">
                <td colspan="999">No active missions</td>
            </tr>
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
        padding: 4px 6px;
        word-break: break-word;
        vertical-align: text-top;
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
    tr:last-child {
        border-bottom: 1px solid #444;
    }
    tr:last-child.message {
        border-bottom: 1px solid #999;
    }
    tr:not(.first) td {
        padding-top: 0;
    }
    .name {
        width: 25%;
    }
    .numbers {
        text-align: right;
        word-break: keep-all;
    }
    .nobreak {
        overflow: hidden;
        word-break: keep-all;
    }
    .message td {
        text-align: center;
        font-size: 1.3em;
        padding: 8px 0;
    }
</style>
