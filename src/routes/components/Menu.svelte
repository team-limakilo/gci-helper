<script lang="ts">
    //export let version: string;
    import logo from "../images/LOGO.png"
    import { onMount } from 'svelte';

    let lastsegment = ``;
    let beforelast = ``;

    onMount(() => {
        const segments = window.location.pathname.split("/");
        lastsegment = segments.pop();
        beforelast = segments.pop();
    });

</script>

<aside>
    <a class="logo">
        <div>
            <img src={logo} alt="">
        </div>
        <span>
                Kestrel's nest
            </span>
    </a>
    <div class="nav">
        <nav>
            <a href="/">Hello</a>
            <a href="/status" class:active={lastsegment == 'status'}>Campaign overview</a>
            <a href="https://drive.google.com/drive/folders/1--hm1m8S_gOkwbgNIW5FoEDAaLV13ey5" target="_blank">Tacview</a>
            <a href="/gci" class:active={lastsegment == 'gci'}>Sneaker GCI</a>
            <a href="/statistics" class:active={[lastsegment, beforelast].includes('statistics')}>Statistics</a>
        </nav>
        <div class="discord">
            <a href="/discord" target="_blank">&#10140; Join our Discord</a>
        </div>
    </div>
</aside>

<style>

    aside   {
        width: 320px;
        min-width: 320px;
        background: #272A31;
        padding: 40px 18px;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
    }
    aside .logo {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
    }
    aside .logo div {
        margin-right: 8px;
    }
    aside .logo img {
        max-width: 100%;
    }
    aside span {
        text-transform: uppercase;
        font-weight: 700;
        font-size: 16px;
    }
    aside .nav {
        height: calc(100% - 46px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    aside .nav a {
        display: block;
        padding: 16px;
        margin-bottom: 16px;
        color: #fff;
        font-size: 16px;
        text-decoration: none;
    }
    aside .nav a:hover,
    aside .nav a.active {
        background: #222429;
        font-weight: 700;
        border-radius: 4px;
    }
    aside .discord a {
        margin-bottom: 0;
        font-weight: 700;
    }
</style>