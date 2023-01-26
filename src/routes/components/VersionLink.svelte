<script lang="ts">
    export let version: string;
    export let base: string = "";
    export let trim = Infinity;
    export let trailingSlash = false;
</script>

{#if base}
    <a
        href="{base}/{version}{trailingSlash ? '/' : ''}"
        target="_blank"
        rel="noreferrer"
    >
        {version.substring(0, trim)}
    </a>
{:else}
    <span>{version.substring(0, trim)}</span>
{/if}
