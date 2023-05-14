<!-- Adapted from https://loading.io/css -->

<div class="lds-dual-ring" />

<style scoped>
    .lds-dual-ring {
        display: inline-block;
        width: 1em;
        height: 1em;
    }
    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 0.8em;
        height: 0.8em;
        margin: 0.1em;
        border-radius: 50%;
        border: 2px solid #fff;
        border-color: #fff #fff #fff transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }
    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
