<script>
import Menu from "./components/Menu.svelte";
import Main from "./components/Main.svelte";
</script>



<main>
    <Menu></Menu>
    <div class="content">
        <header>
            <h1>Hello There 👋🏻</h1>
            <p>Вітаємо у Kestrel's Nest — Першій Українській DCS спільноті!<br><br>Раді що ти приєднався/приєдналась до нас!<br>Наша спільнота об‘єднує поціновувачів авіації та симуляторів з України та Світу!</p>
        </header>
        <article>
            <div class="btn-container">
                <a href="/discord" target="_blank" class="btn">Наш Дискорд / Join Our Discord</a>
            </div>
        </article>
    </div>
</main>

<style global>
    .btn {
        display: inline-block;
        padding: 1rem 2rem;
        margin-top: 1rem;
        font-size: 1rem;
        font-weight: bold;
        text-align: center;
        text-decoration: none;
        color: #fff;
        background-color: #272A31;
        border-radius: 4px;
        transition: background-color 0.3s ease;
    }
    .btn:hover {
        background-color: #222429;
    }

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
        margin: 0;
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