<script lang="ts">
    //export let version: string;
    import logo from "../images/LOGO.png"
    import close from "../images/close.png"
    import menu from "../images/menu.png"
    import { onMount } from 'svelte';

    let lastsegment = ``;
    let beforelast = ``;
    let menuOpen = false;

    onMount(() => {
        const segments = window.location.pathname.split("/");
        lastsegment = segments.pop();
        beforelast = segments.pop();
    });

    function toggle() {
        menuOpen = !menuOpen;
    }

</script>

<div class="menu">
    <div on:click={toggle}>
        <img src={menu} alt="">
    </div>
</div>
<aside class:open={menuOpen}>
    <div class="close" on:click={toggle}>
        <img src={close} alt="">
    </div>
    <div class="nav">
        <nav>
            <a href="/status" on:click(toggle) class:active={lastsegment == 'status'}>Campaign overview</a>
            <a href="/statistics" on:click(toggle) class:active={[lastsegment, beforelast].includes('statistics')}>Statistics</a>
            <a href="/map" on:click(toggle) class:active={lastsegment == 'map'}>Mission Map</a>
            <a href="https://drive.google.com/drive/folders/1--hm1m8S_gOkwbgNIW5FoEDAaLV13ey5" on:click(toggle) target="_blank">Tacview</a>
            <a href="/analytics" on:click(toggle) class:active={lastsegment == 'analytics'}>Server Analytics</a>
        </nav>
        <div class="discord">
            <a href="/discord" target="_blank">&#10140; Join our Discord</a>
        </div>
    </div>
</aside>

<style>

    aside   {
        background: #272A31;
        padding: 60px 18px 40px;
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
    .menu, .close {
        display: none;
    }
    @media (max-width: 1000px) {
        aside {
            display: none;
            width: 100%;
            z-index: 10;
        }

        .menu {
            display: block;
        }

        aside.open {
            display: block;
        }

        .menu,
        aside.open .close {
            display: block;
            position: absolute;
            right: 21px;
            top: 24px;
            cursor: pointer;
        }
    }
</style>