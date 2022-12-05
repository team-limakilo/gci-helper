<script lang="ts">
    export let text: string;
    export let time: number;
    let node: HTMLElement;

    let duration = 3500;
    if (text.length > 35) {
        if (text.length < 85) {
            duration = 3500 + (text.length - 35) * 30;
        } else {
            duration = 5000;
        }
    }

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
    }, duration);
</script>

<div bind:this={node} transition:show class="">{text}</div>

<style>
    div {
        pointer-events: none;
        background: rgba(28, 35, 55, 0.86);
        color: white;
        padding: 0.75em 1em;
        border: 1px solid rgb(71, 71, 71);
        border-radius: 12px;
        white-space: pre;
        position: fixed;
        transform: translateX(-50%);
        backdrop-filter: blur(2px);
        bottom: 1.25em;
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
