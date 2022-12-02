<script lang="ts">
    export let text: string;
    export let time: number;
    let node: HTMLElement;

    function show(target: Element) {
        const transform = getComputedStyle(target).transform ?? "";
        return {
            delay: 0,
            duration: 250,
            css: (value: number) => {
                const offsetY = `${1 - value}em`;
                return `opacity: ${value}; transform: ${transform} translateY(${offsetY})`;
            },
        };
    }

    setTimeout(() => {
        window.toasts.update((toasts: ToastData[]) => {
            if (!toasts.find((toast) => toast.time === time)) {
                return toasts;
            }
            return [];
        });
    }, 3500);
</script>

<div bind:this={node} transition:show class="mono">{text}</div>

<style>
    div {
        pointer-events: none;
        background: rgba(22, 29, 49, 0.86);
        color: white;
        padding: 0.5em 1em;
        border-radius: 12px;
        white-space: pre;
        position: fixed;
        transform: translateX(-50%);
        bottom: 1.5em;
        left: 50%;
    }
    @media (min-height: 1000px) {
        div {
            bottom: 2em;
        }
    }
    @media (min-width: 600px) {
        div {
            font-size: 1.05em;
        }
    }
    @media (max-height: 699px) {
        div {
            font-size: 0.9em;
        }
    }
</style>
