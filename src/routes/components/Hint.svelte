<script lang="ts">
    export let title: string;

    let touchId = 0;

    function onTouchStart(event: TouchEvent) {
        touchId = event.targetTouches[0].identifier;
    }

    function onTouchEnd(event: TouchEvent) {
        if (event.changedTouches[0].identifier == touchId) {
            window.toasts.set([{ text: title, time: event.timeStamp }]);
        }
    }
</script>

<span
    class="hint"
    {title}
    on:touchstart={onTouchStart}
    on:touchend={onTouchEnd}
>
    <slot />
</span>
