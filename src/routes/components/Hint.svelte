<script lang="ts">
    export let title: string;

    let touchId = null;
    let touchX = 0;
    let touchY = 0;

    function distance(x1: number, y1: number, x2: number, y2: number) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function onTouchStart(event: TouchEvent) {
        const touch = event.targetTouches[0];
        touchId = touch?.identifier;
        touchX = touch?.clientX;
        touchY = touch?.clientY;
    }

    function onTouchEnd(event: TouchEvent) {
        const touch = event.changedTouches[0];
        if (
            touch?.identifier === touchId &&
            distance(touchX, touchY, touch?.clientX, touch?.clientY) < 10
        ) {
            const target = document.elementFromPoint(
                touch.clientX,
                touch.clientY
            );
            if (target == event.target) {
                window.toasts.set([{ text: title, time: event.timeStamp }]);
            }
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
