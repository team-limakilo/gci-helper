<script context="module" lang="ts">
    import type { LoadInput, LoadOutput } from "@sveltejs/kit";
    import type { ClientData } from "./data";
    import Main from "./main.svelte";

    export async function load({ fetch }: LoadInput): Promise<LoadOutput> {
        try {
            return {
                props: {
                    data: await fetch("data").then((data) => data.json()),
                },
            };
        } catch (error) {
            return {
                error,
            };
        }
    }
</script>

<script lang="ts">
    export let data: ClientData;
</script>

{#if data != null}
    <Main {data} />
{:else}
    <h1>Loading...</h1>
{/if}

<style global>
    body {
        font-family: Arial, Helvetica, sans-serif;
        color: #f0f0f0;
        background: #0f0f0f;
        line-height: 1.25;
        max-width: 1024px;
        padding: 0 1em 0 1em;
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
    .left {
        float: left;
    }
    .right {
        float: right;
    }
    .dim {
        color: #777;
    }
    footer {
        font-size: 10pt;
        margin: 4em 0 1em 0;
    }
</style>
