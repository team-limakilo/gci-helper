<script lang="ts">
import Menu from "../components/Menu.svelte";
</script>

<main>
    <Menu></Menu>
    <div class="content-gci">
        <iframe src="https://gci.kestrelsnest.co.ua/servers/NewHope" frameborder="0"></iframe>
    </div>
</main>

<style global>
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
    .neutral {
        color: #FBCD55;
    }
    .red {
        color: #FB556C;
    }
    .blue {
        color: #55ABFB;
    }
    .dim {
        color: #C8C8C8;
    }
    .uppercase {
        text-transform: uppercase;
    }
    body {
        font-family: "IBM Plex Mono", Arial, Helvetica, sans-serif;
        color: #fff;
        background: #222429;
        line-height: 1.5;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        margin: 0 !important;
    }
    iframe {
        width: 100%;
        height: 100vh;
    }
    h1,h2,h3,h4,p {
        margin: 0;
    }
    main {
        padding-left: 245px;
    }

    .content {
        max-width: 1120px;
        margin: 0 auto;
        padding: 40px;
    }
    .content-gci {

    }
    h1 {
        color: #FA253C;
        font-weight: 700;
        font-size: 24px;
        line-height: 31px;
        text-transform: uppercase;
    }
    h2 {
        font-weight: 700;
        font-size: 20px;
        margin-bottom: 16px;
    }
    h3 {
        font-weight: 400;
        font-size: 14px;
        color: #C8C8C8;
        margin-bottom: 4px;
    }
    .extra {
        font-size: 16px;
    }
    section {
        margin-bottom: 40px;
    }
    .row {
        gap: 16px;
        flex-wrap: wrap;
        display: flex;
        justify-content: space-between;
    }
    .row + .row {
        margin-top: 16px;
    }
    .card {
        background: #272A31;
        border-radius: 4px;
        padding: 16px;
        flex: 1 0 21%
    }
    footer, th, td {
        font-weight: 400;
        text-align: start;
    }

    @media ( max-width: 834px ) {
        .content {
            padding: 40px 16px;
        }
        .card {
            flex: 1 0 100%
        }

        .coalition .card {
            flex: 1 0 40%
        }

        .missions .card {
            flex: 1 0 21%
        }
    }

    @media ( max-width: 575px ) {
        .card {
            flex: 1 0 100%
        }

        .missions .card {
            flex: 1 0 41%
        }
    }

    @media (max-width: 1000px) {
        .hide-mobile {
            display: none;
        }
        main {
            padding-left: 0;
        }
    }

    @media (min-width: 1000px) {
        .hide-desktop {
            display: none;
        }
    }

    @media (min-width: 1600px) {
        .content {
            max-width: 1600px;
        }

        .missions .card {
            flex: 1 0 10%
        }
    }

</style>
