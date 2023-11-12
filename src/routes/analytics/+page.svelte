<script lang="ts">
    import { onMount } from "svelte";
    import Menu from "../components/Menu.svelte";
    import ApexCharts from 'apexcharts'
    import groupBy from "core-js/actual/array/group-by";
    import { page } from '$app/stores';

    const groupedByTime = groupBy($page.data.traffic, ({time}) => time);
    const keys = Object.keys(groupedByTime);
    const categories = keys.map(time => +time);
    const users = keys.map(time => {
        return groupedByTime[time].length
    });

    const groupedByIp = groupBy($page.data.traffic, ({ip}) => ip);
    const IPs = Object.keys(groupedByIp);
    const uniqueUsers = IPs.map(ip => groupedByIp[ip][0]);
    const groupedUniqueCountries = groupBy(uniqueUsers, ({country}) => country);
    const countrySeries = Object.keys(groupedUniqueCountries).map(c => {
        return {
            x: getCountryName(c),
            y: groupedUniqueCountries[c].length
        }
    });

    const options = {
        grid: {
            show: false,
        },
        theme: {
            palette: 'palette1',
            mode: 'dark'
        },
        series: [
            {
                name: 'Users',
                data: users
            }
        ],
        title: {
            text: 'Players over time',
            align: 'left'
        },
        chart: {
            id: 'chart2',
            type: 'line',
            height: 230,
            toolbar: {
                autoSelected: 'zoom',
                show: true
            }
        },
        stroke: {
            width: 3,
            curve: "straight"
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            opacity: 1
        },
        markers: {
            size: 0
        },
        xaxis: {
            categories,
            type: "datetime",
            labels: {
                datetimeUTC: false,
            }
        }
    };

    const optionsLine = {
        grid: {
            show: false,
        },
        theme: {
            palette: 'palette10',
            mode: 'dark'
        },
        series: [
            {
                name: 'Users',
                data: users
            }
        ],
        chart: {
            id: 'chart1',
            height: 130,
            type: 'area',
            brush: {
                target: 'chart2',
                enabled: true
            },
            selection: {
                enabled: true,
                xaxis: {
                    min: new Date(Date.now() - 12*3600000).getTime(),
                    max: categories[categories.length - 1]
                },
                fill: {
                    color: '#fff',
                    opacity: 0.1
                },
            },
        },
        stroke: {
            curve: "smooth"
        },
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0.91,
                opacityTo: 0.1,
            }
        },
        xaxis: {
            categories,
            labels: {
                datetimeUTC: false,
            },
            type: "datetime",
            tooltip: {
                enabled: false
            }
        },
        yaxis: {
            tickAmount: 3
        }
    };

    const optionsTreemap = {
        series: [
            {
                data: countrySeries
            }
        ],
        theme: {
            palette: 'palette2',
            mode: 'dark'
        },
        legend: {
            show: false
        },
        chart: {
            height: 350,
            type: 'treemap'
        },
        title: {
            text: 'Players by country'
        },
        plotOptions: {
            treemap: {
                distributed: true,
                enableShades: false,
                useFillColorAsStroke: true
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function(text, op) {
                return [text, op.value]
            },
            offsetY: -4
        },
        colors: [
            '#1e43f6',
            '#F7B844',
            '#ADD8C7',
            '#EC3C65',
            '#CDD7B6',
            '#C1F666',
            '#D43F97',
            '#1E5D8C',
            '#421243',
            '#7F94B0',
            '#EF6537',
            '#C0ADDB'
        ],
    };

    function getCountryName(code) {
        const list = {
            "AF" : "Afghanistan",
            "AX" : "Åland Islands",
            "AL" : "Albania",
            "DZ" : "Algeria",
            "AS" : "American Samoa",
            "AD" : "AndorrA",
            "AO" : "Angola",
            "AI" : "Anguilla",
            "AQ" : "Antarctica",
            "AG" : "Antigua and Barbuda",
            "AR" : "Argentina",
            "AM" : "Armenia",
            "AW" : "Aruba",
            "AU" : "Australia",
            "AT" : "Austria",
            "AZ" : "Azerbaijan",
            "BS" : "Bahamas",
            "BH" : "Bahrain",
            "BD" : "Bangladesh",
            "BE" : "Belgium",
            "BZ" : "Belize",
            "BJ" : "Benin",
            "BY" : "Belarus",
            "BM" : "Bermuda",
            "BT" : "Bhutan",
            "BO" : "Bolivia",
            "BA" : "Bosnia and Herzegovina",
            "BW" : "Botswana",
            "BV" : "Bouvet Island",
            "BR" : "Brazil",
            "IO" : "British Indian Ocean Territory",
            "BN" : "Brunei Darussalam",
            "BG" : "Bulgaria",
            "BF" : "Burkina Faso",
            "BI" : "Burundi",
            "KH" : "Cambodia",
            "CM" : "Cameroon",
            "CA" : "Canada",
            "CV" : "Cape Verde",
            "KY" : "Cayman Islands",
            "CF" : "Central African Republic",
            "TD" : "Chad",
            "CL" : "Chile",
            "CN" : "China",
            "CX" : "Christmas Island",
            "CC" : "Cocos (Keeling) Islands",
            "CO" : "Colombia",
            "KM" : "Comoros",
            "CG" : "Congo",
            "CD" : "Congo, The Democratic Republic of the",
            "CK" : "Cook Islands",
            "CR" : "Costa Rica",
            "CI" : "Cote D Ivoire",
            "HR" : "Croatia",
            "CU" : "Cuba",
            "CY" : "Cyprus",
            "CZ" : "Czech Republic",
            "DK" : "Denmark",
            "DJ" : "Djibouti",
            "DM" : "Dominica",
            "DO" : "Dominican Republic",
            "EC" : "Ecuador",
            "EG" : "Egypt",
            "SV" : "El Salvador",
            "GQ" : "Equatorial Guinea",
            "ER" : "Eritrea",
            "EE" : "Estonia",
            "ET" : "Ethiopia",
            "FK" : "Falkland Islands (Malvinas)",
            "FO" : "Faroe Islands",
            "FJ" : "Fiji",
            "FI" : "Finland",
            "FR" : "France",
            "GF" : "French Guiana",
            "PF" : "French Polynesia",
            "TF" : "French Southern Territories",
            "GA" : "Gabon",
            "GM" : "Gambia",
            "GE" : "Georgia",
            "DE" : "Germany",
            "GH" : "Ghana",
            "GI" : "Gibraltar",
            "GR" : "Greece",
            "GL" : "Greenland",
            "GD" : "Grenada",
            "GP" : "Guadeloupe",
            "GU" : "Guam",
            "GT" : "Guatemala",
            "GG" : "Guernsey",
            "GN" : "Guinea",
            "GW" : "Guinea-Bissau",
            "GY" : "Guyana",
            "HT" : "Haiti",
            "HM" : "Heard Island and Mcdonald Islands",
            "VA" : "Holy See (Vatican City State)",
            "HN" : "Honduras",
            "HK" : "Hong Kong",
            "HU" : "Hungary",
            "IS" : "Iceland",
            "IN" : "India",
            "ID" : "Indonesia",
            "IR" : "Iran, Islamic Republic Of",
            "IQ" : "Iraq",
            "IE" : "Ireland",
            "IM" : "Isle of Man",
            "IL" : "Israel",
            "IT" : "Italy",
            "JM" : "Jamaica",
            "JP" : "Japan",
            "JE" : "Jersey",
            "JO" : "Jordan",
            "KZ" : "Kazakhstan",
            "KE" : "Kenya",
            "KI" : "Kiribati",
            "KP" : "Korea, Democratic People Republic of",
            "KR" : "Korea, Republic of",
            "KW" : "Kuwait",
            "KG" : "Kyrgyzstan",
            "LA" : "Lao People Democratic Republic",
            "LV" : "Latvia",
            "LB" : "Lebanon",
            "LS" : "Lesotho",
            "LR" : "Liberia",
            "LY" : "Libyan Arab Jamahiriya",
            "LI" : "Liechtenstein",
            "LT" : "Lithuania",
            "LU" : "Luxembourg",
            "MO" : "Macao",
            "MK" : "Macedonia, The Former Yugoslav Republic of",
            "MG" : "Madagascar",
            "MW" : "Malawi",
            "MY" : "Malaysia",
            "MV" : "Maldives",
            "ML" : "Mali",
            "MT" : "Malta",
            "MH" : "Marshall Islands",
            "MQ" : "Martinique",
            "MR" : "Mauritania",
            "MU" : "Mauritius",
            "YT" : "Mayotte",
            "MX" : "Mexico",
            "FM" : "Micronesia, Federated States of",
            "MD" : "Moldova, Republic of",
            "MC" : "Monaco",
            "MN" : "Mongolia",
            "MS" : "Montserrat",
            "MA" : "Morocco",
            "MZ" : "Mozambique",
            "MM" : "Myanmar",
            "NA" : "Namibia",
            "NR" : "Nauru",
            "NP" : "Nepal",
            "NL" : "Netherlands",
            "AN" : "Netherlands Antilles",
            "NC" : "New Caledonia",
            "NZ" : "New Zealand",
            "NI" : "Nicaragua",
            "NE" : "Niger",
            "NG" : "Nigeria",
            "NU" : "Niue",
            "NF" : "Norfolk Island",
            "MP" : "Northern Mariana Islands",
            "NO" : "Norway",
            "OM" : "Oman",
            "PK" : "Pakistan",
            "PW" : "Palau",
            "PS" : "Palestinian Territory, Occupied",
            "PA" : "Panama",
            "PG" : "Papua New Guinea",
            "PY" : "Paraguay",
            "PE" : "Peru",
            "PH" : "Philippines",
            "PN" : "Pitcairn",
            "PL" : "Poland",
            "PT" : "Portugal",
            "PR" : "Puerto Rico",
            "QA" : "Qatar",
            "RE" : "Reunion",
            "RO" : "Romania",
            "RU" : "Katsapstan",
            "RW" : "RWANDA",
            "SH" : "Saint Helena",
            "KN" : "Saint Kitts and Nevis",
            "LC" : "Saint Lucia",
            "PM" : "Saint Pierre and Miquelon",
            "VC" : "Saint Vincent and the Grenadines",
            "WS" : "Samoa",
            "SM" : "San Marino",
            "ST" : "Sao Tome and Principe",
            "SA" : "Saudi Arabia",
            "SN" : "Senegal",
            "CS" : "Serbia and Montenegro",
            "SC" : "Seychelles",
            "SL" : "Sierra Leone",
            "SG" : "Singapore",
            "SK" : "Slovakia",
            "SI" : "Slovenia",
            "SB" : "Solomon Islands",
            "SO" : "Somalia",
            "ZA" : "South Africa",
            "GS" : "South Georgia and the South Sandwich Islands",
            "ES" : "Spain",
            "LK" : "Sri Lanka",
            "SD" : "Sudan",
            "SR" : "Suriname",
            "SJ" : "Svalbard and Jan Mayen",
            "SZ" : "Swaziland",
            "SE" : "Sweden",
            "CH" : "Switzerland",
            "SY" : "Syrian Arab Republic",
            "TW" : "Taiwan, Province of China",
            "TJ" : "Tajikistan",
            "TZ" : "Tanzania, United Republic of",
            "TH" : "Thailand",
            "TL" : "Timor-Leste",
            "TG" : "Togo",
            "TK" : "Tokelau",
            "TO" : "Tonga",
            "TT" : "Trinidad and Tobago",
            "TN" : "Tunisia",
            "TR" : "Turkey",
            "TM" : "Turkmenistan",
            "TC" : "Turks and Caicos Islands",
            "TV" : "Tuvalu",
            "UG" : "Uganda",
            "UA" : "Ukraine",
            "AE" : "United Arab Emirates",
            "GB" : "United Kingdom",
            "US" : "United States",
            "UM" : "United States Minor Outlying Islands",
            "UY" : "Uruguay",
            "UZ" : "Uzbekistan",
            "VU" : "Vanuatu",
            "VE" : "Venezuela",
            "VN" : "Viet Nam",
            "VG" : "Virgin Islands, British",
            "VI" : "Virgin Islands, U.S.",
            "WF" : "Wallis and Futuna",
            "EH" : "Western Sahara",
            "YE" : "Yemen",
            "ZM" : "Zambia",
            "ZW" : "Zimbabwe",
        };
        return list[code] || '404';
    }

    onMount(() => {

        window.ApexCharts = ApexCharts;

        const chart = new ApexCharts(document.querySelector("#chart-line2"), options);
        chart.render();

        const chartLine = new ApexCharts(document.querySelector("#chart-line"), optionsLine);
        chartLine.render();

        const chartPie = new ApexCharts(document.querySelector("#chart-pie"), optionsTreemap);
        chartPie.render();

    });
</script>

<svelte:head>
    <title>Server Analytics - Kestrel's Nest Українська Спільнота DCS World</title>
</svelte:head>

<main>
    <Menu></Menu>
    <div class="content">
        <header>
            <h1>Server Analytics</h1>
        </header>
        <br>
        <br>
        <div style="max-width: 1000px;" >
            <div id="chart-line2"></div>
            <div id="chart-line"></div>
            <br>
            <br>
            <div id="chart-pie"></div>
        </div>
    </div>
</main>


<style global>

    *,
    *::before,
    *::after {
        box-sizing: border-box;
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

    .apexcharts-svg {
        background: #222429 !important;
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

        .metar .raw {
            display: none;
        }
    }

    @media ( max-width: 575px ) {
        .card {
            flex: 1 0 100%
        }

        .missions .card {
            flex: 1 0 41%
        }

        .weather {
            flex-direction: column;
            align-items: flex-start;
        }

        .weather b {
            display: inline;
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

    @media ( max-width: 1250px ) {
        .header {
            flex-direction: column;
            gap: 40px;
        }

        .weather {
            gap: 10px;
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

        .weather b {
            display: inline;
        }
    }
</style>