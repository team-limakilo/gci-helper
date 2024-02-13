function getSteppedDate(seconds: number) {
  const milliseconds = seconds * 1000;
  const date = Math.floor(Date.now() / milliseconds) * milliseconds;
  return new Date(date);
}

const getSampleData = () => ({
  "abstime": 22560,
  "coalitions": {
    "0": {
      "assets": {
        "Aleppo": {
          "Aleppo": {
            "codename": "KURSK",
            "cost": 10,
            "dead": false,
            "location": {
              "lat": 36.182211524331,
              "lon": 37.210383232385,
              "x": 125776.703125,
              "y": 382.19104003906,
              "z": 121870.953125
            },
            "missiontype": "OCA",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "AIRBASE"
          },
          "Minakh": {
            "codename": "ATLANTA",
            "cost": 10,
            "dead": false,
            "location": {
              "lat": 36.522812218953,
              "lon": 37.033622455645,
              "x": 163870.921875,
              "y": 492.00051879883,
              "z": 106743.0390625
            },
            "missiontype": "OCA",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "AIRBASE"
          },
        },
        "Coast": [],
        "Cyprus": [],
        "Damascus": {
          "Damascus_0_airspace": {
            "codename": "KURSK",
            "cost": 0,
            "dead": false,
            "location": {
              "lat": 33.482713511778,
              "lon": 36.235064059083,
              "x": -171641.84375,
              "y": 718.09167480469,
              "z": 25888.533203125
            },
            "missiontype": "CAP",
            "spawned": true,
            "status": 0,
            "strategic": false,
            "type": "AIRSPACE"
          }
        },
        "Hama": [],
        "Hatay": {
          "Hatay_0_airspace": {
            "codename": "NAPLES",
            "cost": 0,
            "dead": false,
            "location": {
              "lat": 36.315018392407,
              "lon": 36.288227774465,
              "x": 142436.99887681,
              "y": 65.089782714844,
              "z": 39343.759904055
            },
            "missiontype": "CAP",
            "spawned": true,
            "status": 0,
            "strategic": false,
            "type": "AIRSPACE"
          }
        },
        "Homs Refinery": [],
        "Israel": [],
        "Lebanon": [],
        "Palmyra": [],
        "Turkey": []
      },
      "commander": {
        "availablemissions": []
      },
      "missions": [],
      "tickets": {
        "current": 0,
        "start": 0,
        "text": "Excellent"
      }
    },
    "1": {
      "assets": {
        "Aleppo": {
          "Aleppo_0_airspace": {
            "codename": "SHENZEN",
            "cost": 0,
            "dead": false,
            "location": {
              "lat": 36.254798709653,
              "lon": 37.021353495884,
              "x": 134159.59606479,
              "y": 441.89865112305,
              "z": 105035.00075944
            },
            "missiontype": "CAP",
            "spawned": true,
            "status": 0,
            "strategic": false,
            "type": "AIRSPACE"
          },
          "Aleppo_1_Reg1Bai11": {
            "codename": "CAIRO",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 36.053552531468,
              "lon": 36.701598903507,
              "x": 112466.85838785,
              "y": 301.42330932617,
              "z": 75774.511667336
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Aleppo_1_Reg1Bai12": {
            "codename": "TOKYO",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 36.232444690835,
              "lon": 36.686052959382,
              "x": 132347.24231138,
              "y": 346.89334106445,
              "z": 74846.997984803
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Aleppo_1_Reg1EWR-1": {
            "codename": "WROCLAW",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 36.355888878204,
              "lon": 37.415312339792,
              "x": 144722.68591365,
              "y": 530.86236572266,
              "z": 140615.9007294
            },
            "missiontype": "SEAD",
            "sitetype": "EWR",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "EWR"
          },
          "Aleppo_1_Reg1EWR-1-SHORAD": {
            "codename": "MUNICH",
            "cost": 0,
            "dead": false,
            "location": {
              "lat": 36.355888878204,
              "lon": 37.415312339792,
              "x": 144722.68591365,
              "y": 530.86236572266,
              "z": 140615.9007294
            },
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "SHORAD"
          },
          "Aleppo_1_Reg1Factory-1": {
            "codename": "KIEV",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.511624857099,
              "lon": 37.035608854944,
              "x": 162626.125,
              "y": 485.60174560547,
              "z": 106895.578125
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "AMMODUMP"
          },
          "Aleppo_1_Reg1Factory-10": {
            "codename": "SYDNEY",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.175338014682,
              "lon": 37.284315926391,
              "x": 124894.09375,
              "y": 374.79327392578,
              "z": 128506.4375
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FACTORY"
          },
          "Aleppo_1_Reg1Factory-11": {
            "codename": "MESA",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.05451197434,
              "lon": 37.336021222669,
              "x": 111409.7421875,
              "y": 373.30029296875,
              "z": 132927.296875
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FACTORY"
          },
          "Aleppo_1_Reg1Factory-12": {
            "codename": "OSAKA",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.071552661009,
              "lon": 37.908396518536,
              "x": 112570.10595703,
              "y": 350.41299438477,
              "z": 184504.48095703
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FUELDUMP"
          },
          "Aleppo_1_Reg1Factory-2": {
            "codename": "LISBON",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.229296242287,
              "lon": 36.689849847955,
              "x": 131989.796875,
              "y": 346.89331054688,
              "z": 75179.953125
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 25,
            "strategic": true,
            "type": "AMMODUMP"
          },
          "Aleppo_1_Reg1Factory-3": {
            "codename": "LAGOS",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.921229441924,
              "lon": 36.641073435637,
              "x": 97916.947265625,
              "y": 419.29055786133,
              "z": 69966.426757813
            },
            "missiontype": "STRIKE",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "FUELDUMP"
          },
          "Aleppo_1_Reg1Factory-4": {
            "codename": "WARSAW",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.932435046738,
              "lon": 36.645429892911,
              "x": 99150.633361816,
              "y": 407.81253051758,
              "z": 70389.555175781
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FACTORY"
          },
          "Aleppo_1_Reg1Factory-5": {
            "codename": "SEOUL",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.219507799235,
              "lon": 37.148451890613,
              "x": 130018.71875,
              "y": 381.39804077148,
              "z": 116380.234375
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FACTORY"
          },
          "Aleppo_1_Reg1Factory-6": {
            "codename": "SHENZEN",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.207622539264,
              "lon": 37.169910518393,
              "x": 128663.5859375,
              "y": 414.26284790039,
              "z": 118284.2890625
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FACTORY"
          },
          "Aleppo_1_Reg1Factory-7": {
            "codename": "JAKARTA",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.222492888733,
              "lon": 37.265212435271,
              "x": 130155.7109375,
              "y": 454.20443725586,
              "z": 126881.8359375
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FACTORY"
          },
          "Aleppo_1_Reg1Factory-8": {
            "codename": "ROME",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.164082837021,
              "lon": 37.111828658126,
              "x": 123933.5703125,
              "y": 398.50991821289,
              "z": 112968.4140625
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FACTORY"
          },
          "Aleppo_1_Reg1Factory-9": {
            "codename": "DELHI",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.149625189437,
              "lon": 37.155499079258,
              "x": 122254.171875,
              "y": 376.36578369141,
              "z": 116866.3203125
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FACTORY"
          },
          "Aleppo_1_Reg1Sa2-1": {
            "codename": "NOBLE",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.071081728459,
              "lon": 37.340933709348,
              "x": 113240.27303365,
              "y": 505.09634399414,
              "z": 133401.14214643
            },
            "missiontype": "SEAD",
            "sitetype": "SA-2",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          },
          "Aleppo_1_reg1BAI1": {
            "codename": "TAIPEI",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 36.239664893082,
              "lon": 36.650932444378,
              "x": 133224.2802085,
              "y": 275.70526123047,
              "z": 71709.619304297
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Aleppo_1_reg1BAI2": {
            "codename": "ZURICH",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 36.419988367424,
              "lon": 36.627402056543,
              "x": 153282.58989201,
              "y": 506.17666625977,
              "z": 70085.863832507
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Aleppo_1_reg1BAI3": {
            "codename": "SHANGHAI",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 36.597693335352,
              "lon": 37.052191658179,
              "x": 172144.70235495,
              "y": 568.01715087891,
              "z": 108574.10285182
            },
            "missiontype": "BAI",
            "spawned": true,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Aleppo_1_reg1BAI4": {
            "codename": "SYDNEY",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 35.815229314284,
              "lon": 36.323209274144,
              "x": 86896.214917397,
              "y": 179.82595825195,
              "z": 40958.742198296
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Aleppo_1_reg1CAS1": {
            "codename": "OSLO",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 36.481451895165,
              "lon": 37.040894258794,
              "x": 159268.99305332,
              "y": 469.10278320313,
              "z": 107300.823401
            },
            "missiontype": "CAS",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "FRONTLINE"
          },
          "Aleppo_1_reg1CAS10": {
            "codename": "ISTANBUL",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 36.574356318161,
              "lon": 37.218243667625,
              "x": 169267.32981516,
              "y": 451.11111450195,
              "z": 123380.52403924
            },
            "missiontype": "CAS",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "FRONTLINE"
          },
          "Aleppo_1_reg1CAS11": {
            "codename": "TULSA",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 36.531422366725,
              "lon": 37.05686137762,
              "x": 164783.89073711,
              "y": 479.07452392578,
              "z": 108843.23942801
            },
            "missiontype": "CAS",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "FRONTLINE"
          },
          "Aleppo_1_reg1CAS12": {
            "codename": "CAIRO",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 36.50112103744,
              "lon": 37.073859885074,
              "x": 161391.57204766,
              "y": 478.47161865234,
              "z": 110297.91215334
            },
            "missiontype": "CAS",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "FRONTLINE"
          },
          "Aleppo_1_reg1CAS13": {
            "codename": "MADRID",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 36.594109658096,
              "lon": 37.942904847096,
              "x": 170501.19857073,
              "y": 419.73480224609,
              "z": 188245.6911882
            },
            "missiontype": "CAS",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "FRONTLINE"
          },
          "Aleppo_1_reg1CAS2": {
            "codename": "ATHENS",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 36.585588751752,
              "lon": 37.037148324742,
              "x": 170829.15647553,
              "y": 547.37750244141,
              "z": 107200.92297814
            },
            "missiontype": "CAS",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "FRONTLINE"
          },
          "Aleppo_1_reg1CAS3": {
            "codename": "CHICAGO",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 36.628390282308,
              "lon": 37.051704596254,
              "x": 175551.24685577,
              "y": 617.07751464844,
              "z": 108599.62117106
            },
            "missiontype": "CAS",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "FRONTLINE"
          },
          "Aleppo_1_reg1CAS4": {
            "codename": "ZURICH",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 36.538166381376,
              "lon": 37.020268043355,
              "x": 165598.89473267,
              "y": 495.53399658203,
              "z": 105582.27629358
            },
            "missiontype": "CAS",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "FRONTLINE"
          },
          "Aleppo_1_reg1CAS5": {
            "codename": "MILAN",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 36.266888047773,
              "lon": 36.569562259346,
              "x": 136425.10293657,
              "y": 135.65264892578,
              "z": 64472.050717719
            },
            "missiontype": "CAS",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "FRONTLINE"
          },
          "Aleppo_1_reg1CAS6": {
            "codename": "MEMPHIS",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 36.29752087897,
              "lon": 37.068402847451,
              "x": 138813.79568494,
              "y": 383.14453125,
              "z": 109357.08659072
            },
            "missiontype": "CAS",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "FRONTLINE"
          },
          "Aleppo_1_reg1CAS7": {
            "codename": "HOUSTON",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 36.871941578486,
              "lon": 38.022725113399,
              "x": 201246.32732097,
              "y": 334.65676879883,
              "z": 195700.12703814
            },
            "missiontype": "CAS",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "FRONTLINE"
          },
          "Aleppo_1_reg1CAS8": {
            "codename": "BERLIN",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 36.637602692531,
              "lon": 37.935944398188,
              "x": 175332.82237662,
              "y": 376.93255615234,
              "z": 187676.50827028
            },
            "missiontype": "CAS",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "FRONTLINE"
          },
          "Aleppo_1_reg1CAS9": {
            "codename": "DETROIT",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 36.627115125233,
              "lon": 37.234310570318,
              "x": 175093.92492,
              "y": 475.44845581055,
              "z": 124925.80531706
            },
            "missiontype": "CAS",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "FRONTLINE"
          },
          "Aleppo_1_reg1aaa1": {
            "codename": "DELHI",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 36.221337887031,
              "lon": 37.138269906011,
              "x": 130239.26999758,
              "y": 416.56411743164,
              "z": 115468.86065861
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Aleppo_1_reg1aaa2-1": {
            "codename": "DENVER",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 36.181095269327,
              "lon": 37.222559409432,
              "x": 125632.74093283,
              "y": 382.19104003906,
              "z": 122963.72749425
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Aleppo_1_reg1aaa3": {
            "codename": "SEOUL",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 35.923571769809,
              "lon": 36.646770934311,
              "x": 98164.399091193,
              "y": 407.15563964844,
              "z": 70486.844459134
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Aleppo_1_reg1aaa4": {
            "codename": "XIAN",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 36.185382884155,
              "lon": 37.587616629571,
              "x": 125568.71866243,
              "y": 366.00036621094,
              "z": 155800.90237903
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Aleppo_1_reg1bai13": {
            "codename": "TULSA",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 36.234490168277,
              "lon": 36.678423910477,
              "x": 132590.58668472,
              "y": 320.54580688477,
              "z": 74166.703579343
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Aleppo_1_reg1bai14": {
            "codename": "KIEV",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 36.00292342722,
              "lon": 36.488024533919,
              "x": 107325.30526084,
              "y": 224.59233093262,
              "z": 56388.378280411
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Aleppo_1_reg1bai5": {
            "codename": "GIZA",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 35.81522802506,
              "lon": 36.323195658131,
              "x": 86896.112233677,
              "y": 179.7702331543,
              "z": 40957.506250746
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Aleppo_1_reg1bai6": {
            "codename": "ISTANBUL",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 36.160971786925,
              "lon": 37.043813271741,
              "x": 123709.61258475,
              "y": 345.99822998047,
              "z": 106843.05922696
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Aleppo_1_reg1bai7": {
            "codename": "MADRID",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 36.090687318799,
              "lon": 36.264923138888,
              "x": 117604.87589704,
              "y": 367.18408203125,
              "z": 36548.6979766
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Aleppo_1_reg1bai8": {
            "codename": "RIO",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 36.072897104073,
              "lon": 35.951245852303,
              "x": 116471.43463329,
              "y": 6.5010757446289,
              "z": 8237.085256343
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Aleppo_1_reg1bai9": {
            "codename": "HAMBURG",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 35.838606142016,
              "lon": 35.809498181788,
              "x": 90882.52504332,
              "y": 34.721252441406,
              "z": -5383.3123051878
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Aleppo_1_reg1sa3-1": {
            "codename": "NISSAN",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.22669431345,
              "lon": 37.073673560781,
              "x": 130946.9688045,
              "y": 437.54083251953,
              "z": 109674.09851439
            },
            "missiontype": "SEAD",
            "sitetype": "SA-3",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          },
          "Aleppo_1_reg1sa3-2": {
            "codename": "LOTUS",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.160502567611,
              "lon": 37.273897220955,
              "x": 123264.96583025,
              "y": 368.84680175781,
              "z": 127540.11115461
            },
            "missiontype": "SEAD",
            "sitetype": "SA-3",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          },
          "Aleppo_1_reg1sa3-3": {
            "codename": "BENTLEY",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.186915177142,
              "lon": 37.564774962456,
              "x": 125768.83670473,
              "y": 365.92758178711,
              "z": 153749.39673919
            },
            "missiontype": "SEAD",
            "sitetype": "SA-3",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          },
          "Kuweires": {
            "codename": "DRESDEN",
            "cost": 30,
            "dead": false,
            "location": {
              "lat": 36.18937442608,
              "lon": 37.570439309206,
              "x": 126034.1171875,
              "y": 366.00036621094,
              "z": 154262.765625
            },
            "missiontype": "OCA",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "AIRBASE"
          },
          "Taftanaz": {
            "codename": "TAMPA",
            "cost": 10,
            "dead": false,
            "location": {
              "lat": 35.973223381816,
              "lon": 36.785894108748,
              "x": 103379,
              "y": 311.00030517578,
              "z": 83165.9296875
            },
            "missiontype": "OCA",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "AIRBASE"
          }
        },
        "Coast": {
          "Bassel Al-Assad": {
            "codename": "MOSCOW",
            "cost": 20,
            "dead": false,
            "location": {
              "lat": 35.411589930353,
              "lon": 35.95003283514,
              "x": 43096.125,
              "y": 28.363424301147,
              "z": 5843.9418945313
            },
            "missiontype": "OCA",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "AIRBASE"
          },
          "Coast_0_airspace": {
            "codename": "MEMPHIS",
            "cost": 0,
            "dead": false,
            "location": {
              "lat": 35.1834336817,
              "lon": 36.433251796053,
              "x": 16537.148030378,
              "y": 194.21420288086,
              "z": 49078.389965941
            },
            "missiontype": "CAP",
            "spawned": true,
            "status": 0,
            "strategic": false,
            "type": "AIRSPACE"
          },
          "Coast_1_Reg2EWR-1": {
            "codename": "WROCLAW",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 35.553107738982,
              "lon": 35.82694024848,
              "x": 59151.273443608,
              "y": 86.610084533691,
              "z": -4832.0792309659
            },
            "missiontype": "SEAD",
            "sitetype": "EWR",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "EWR"
          },
          "Coast_1_Reg2EWR-1-SHORAD": {
            "codename": "SHANGHAI",
            "cost": 0,
            "dead": false,
            "location": {
              "lat": 35.553107738982,
              "lon": 35.82694024848,
              "x": 59151.273443608,
              "y": 86.610084533691,
              "z": -4832.0792309659
            },
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "SHORAD"
          },
          "Coast_1_Reg2EWR-2": {
            "codename": "KIEV",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 35.17610716912,
              "lon": 35.929061900322,
              "x": 17027.163340625,
              "y": 8.467529296875,
              "z": 3129.1466512494
            },
            "missiontype": "SEAD",
            "sitetype": "EWR",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "EWR"
          },
          "Coast_1_Reg2EWR-2-SHORAD": {
            "codename": "MADRID",
            "cost": 0,
            "dead": false,
            "location": {
              "lat": 35.17610716912,
              "lon": 35.929061900322,
              "x": 17027.163340625,
              "y": 8.467529296875,
              "z": 3129.1466512494
            },
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "SHORAD"
          },
          "Coast_1_Reg2Factory-1": {
            "codename": "TOKYO",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.213520704873,
              "lon": 35.966588338812,
              "x": 21073.268554688,
              "y": 22.865516662598,
              "z": 6674.5737304688
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FACILITY"
          },
          "Coast_1_Reg2Factory-2": {
            "codename": "DRESDEN",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.368794684795,
              "lon": 35.95006065459,
              "x": 38347.678710938,
              "y": 23.079864501953,
              "z": 5699.9438476563
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FUELDUMP"
          },
          "Coast_1_Reg2Factory-3": {
            "codename": "TAMPA",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.52209710046,
              "lon": 35.830917420892,
              "x": 55698.666503906,
              "y": 6.941249370575,
              "z": -4582.171875
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FUELDUMP"
          },
          "Coast_1_Reg2Sa2-1": {
            "codename": "TRIUMPH",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.41291036923,
              "lon": 35.922097750449,
              "x": 43321.339042537,
              "y": 20.001842498779,
              "z": 3311.0138628819
            },
            "missiontype": "SEAD",
            "sitetype": "SA-2",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          },
          "Coast_1_Reg2Sa2-2": {
            "codename": "PONTIAC",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.617588184817,
              "lon": 35.784511217915,
              "x": 66431.11971376,
              "y": 12.056257247925,
              "z": -8445.6026378981
            },
            "missiontype": "SEAD",
            "sitetype": "SA-2",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          },
          "Coast_1_Reg2Sa2-5": {
            "codename": "SAAB",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 34.95475318098,
              "lon": 35.932941962962,
              "x": -7543.3807620826,
              "y": 87.347457885742,
              "z": 2726.5911898609
            },
            "missiontype": "SEAD",
            "sitetype": "SA-2",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          },
          "Coast_1_Reg2Sa2-6": {
            "codename": "NISSAN",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 34.659354660567,
              "lon": 35.986330798329,
              "x": -40465.22563745,
              "y": 7.8301362991333,
              "z": 6618.5626797794
            },
            "missiontype": "SEAD",
            "sitetype": "SA-2",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          },
          "Coast_1_reg1ship1": {
            "codename": "TAIPEI",
            "cost": 15,
            "dead": false,
            "location": {
              "lat": 33.89290094737,
              "lon": 33.113976245873,
              "x": -113952.41855185,
              "y": 0,
              "z": -261806.0144652
            },
            "missiontype": "ANTISHIP",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SEA"
          },
          "Coast_1_reg1ship2": {
            "codename": "ATLANTA",
            "cost": 15,
            "dead": false,
            "location": {
              "lat": 34.375413605338,
              "lon": 35.632417939101,
              "x": -70941.69162147,
              "y": 0,
              "z": -26878.259058638
            },
            "missiontype": "ANTISHIP",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SEA"
          },
          "Coast_1_reg1ship3": {
            "codename": "ZURICH",
            "cost": 15,
            "dead": false,
            "location": {
              "lat": 35.53890037591,
              "lon": 35.752488279183,
              "x": 57794.946843472,
              "y": 0,
              "z": -11635.372398446
            },
            "missiontype": "ANTISHIP",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SEA"
          },
          "Coast_1_reg1ship4": {
            "codename": "DENVER",
            "cost": 15,
            "dead": false,
            "location": {
              "lat": 33.916732991169,
              "lon": 35.581047027714,
              "x": -121676.02533149,
              "y": 0,
              "z": -33310.950325095
            },
            "missiontype": "ANTISHIP",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SEA"
          },
          "Coast_1_reg1trigger3": {
            "codename": "BERLIN",
            "cost": 0,
            "dead": false,
            "location": {
              "lat": 32.54634873483,
              "lon": 38.188401654984,
              "x": -278578.70218464,
              "y": 688.00067138672,
              "z": 206598.1768283
            },
            "spawned": true,
            "status": 0,
            "strategic": false,
            "type": "SHORAD"
          },
          "Coast_1_reg1trigger4": {
            "codename": "DUBLIN",
            "cost": 0,
            "dead": false,
            "location": {
              "lat": 32.544084170899,
              "lon": 38.185596137456,
              "x": -278827.71730591,
              "y": 688.00067138672,
              "z": 206332.82811697
            },
            "spawned": true,
            "status": 0,
            "strategic": false,
            "type": "SHORAD"
          },
          "Coast_1_reg1trigger5": {
            "codename": "KYOTO",
            "cost": 0,
            "dead": false,
            "location": {
              "lat": 32.544432059139,
              "lon": 38.189308505578,
              "x": -278791.80201782,
              "y": 688.00067138672,
              "z": 206681.70483615
            },
            "spawned": true,
            "status": 0,
            "strategic": false,
            "type": "SHORAD"
          },
          "Coast_1_reg2aaa1": {
            "codename": "PARIS",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 35.517809024788,
              "lon": 35.803168232691,
              "x": 55304.188998164,
              "y": 15.979866027832,
              "z": -7114.8535068998
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Coast_1_reg2aaa2": {
            "codename": "MILAN",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 35.403490166639,
              "lon": 35.949067555331,
              "x": 42200.117966913,
              "y": 28.600542068481,
              "z": 5728.5072350574
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Coast_1_reg2aaa3": {
            "codename": "XIAN",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 35.225136894814,
              "lon": 35.952193174241,
              "x": 22402.27086529,
              "y": 8.7021436691284,
              "z": 5403.3662699937
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Coast_1_reg2aaa4": {
            "codename": "OSAKA",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 34.909427720616,
              "lon": 35.8714508281,
              "x": -12398.175981323,
              "y": 3.0000033378601,
              "z": -3047.8986660386
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Coast_1_reg2cas1": {
            "codename": "RIO",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 36.217356044898,
              "lon": 37.157768486044,
              "x": 129764.05435062,
              "y": 380.17239379883,
              "z": 117213.17860894
            },
            "missiontype": "CAS",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "FRONTLINE"
          },
          "Coast_1_reg2cas10": {
            "codename": "KARACHI",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 36.178903393377,
              "lon": 37.436211486748,
              "x": 125058.76608811,
              "y": 345.00033569336,
              "z": 142174.14509473
            },
            "missiontype": "CAS",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "FRONTLINE"
          },
          "Coast_1_reg2cas11": {
            "codename": "STOCKHOLM",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 36.188112307876,
              "lon": 37.428085865056,
              "x": 126092.12794603,
              "y": 355.49319458008,
              "z": 141459.92339643
            },
            "missiontype": "CAS",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "FRONTLINE"
          },
          "Coast_1_reg2cas2": {
            "codename": "DALLAS",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 36.242203885784,
              "lon": 37.105409440326,
              "x": 132611.33196801,
              "y": 410.52603149414,
              "z": 112560.29695495
            },
            "missiontype": "CAS",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "FRONTLINE"
          },
          "Coast_1_reg2cas3": {
            "codename": "DETROIT",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 36.199050349708,
              "lon": 37.130971105643,
              "x": 127779.40039625,
              "y": 398.88980102539,
              "z": 114765.10779577
            },
            "missiontype": "CAS",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "FRONTLINE"
          },
          "Coast_1_reg2cas4": {
            "codename": "VIENNA",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 36.170617682183,
              "lon": 37.122477236858,
              "x": 124639.93781804,
              "y": 376.16937255859,
              "z": 113940.33821451
            },
            "missiontype": "CAS",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "FRONTLINE"
          },
          "Coast_1_reg2cas5": {
            "codename": "LAGOS",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 36.196454627242,
              "lon": 37.161848863532,
              "x": 127438.37121451,
              "y": 391.1110534668,
              "z": 117536.02003562
            },
            "missiontype": "CAS",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "FRONTLINE"
          },
          "Coast_1_reg2cas6": {
            "codename": "PHOENIX",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 36.267599079237,
              "lon": 37.18957945242,
              "x": 135283.93929718,
              "y": 391.85009765625,
              "z": 120176.93919532
            },
            "missiontype": "CAS",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "FRONTLINE"
          },
          "Coast_1_reg2cas7": {
            "codename": "HOUSTON",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 36.244614578991,
              "lon": 37.164694492413,
              "x": 132776.20123073,
              "y": 376.9938659668,
              "z": 117893.05745575
            },
            "missiontype": "CAS",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "FRONTLINE"
          },
          "Coast_1_reg2cas8": {
            "codename": "BOSTON",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 36.224609161555,
              "lon": 37.15956196001,
              "x": 130565.62127422,
              "y": 375.63525390625,
              "z": 117389.67721953
            },
            "missiontype": "CAS",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "FRONTLINE"
          },
          "Coast_1_reg2cas9": {
            "codename": "WARSAW",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 36.25365334659,
              "lon": 37.130937043624,
              "x": 133836.93958513,
              "y": 434.1875,
              "z": 114878.86644805
            },
            "missiontype": "CAS",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "FRONTLINE"
          },
          "Coast_1_reg2sa3-1": {
            "codename": "LOTUS",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.544804435042,
              "lon": 35.778736338248,
              "x": 58371.883115397,
              "y": 7.5730867385864,
              "z": -9233.330556488
            },
            "missiontype": "SEAD",
            "sitetype": "SA-3",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          },
          "Coast_1_reg2sa3-2": {
            "codename": "SUBARU",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.463774993382,
              "lon": 35.930581525304,
              "x": 48941.134977291,
              "y": 54.953117370605,
              "z": 4257.1072263719
            },
            "missiontype": "SEAD",
            "sitetype": "SA-3",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          },
          "Coast_1_reg2sa3-3": {
            "codename": "MAZDA",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.222975244115,
              "lon": 35.953781958021,
              "x": 22157.987877825,
              "y": 11.20223903656,
              "z": 5540.6545150556
            },
            "missiontype": "SEAD",
            "sitetype": "SA-3",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          },
          "Coast_1_reg2sa5-1": {
            "codename": "OPEL",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.432985316351,
              "lon": 36.199173624074,
              "x": 44799.797274456,
              "y": 1379.6651611328,
              "z": 28541.101571277
            },
            "missiontype": "SEAD",
            "sitetype": "SA-5",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          },
          "Coast_1_reg2sa5-1-SHORAD": {
            "codename": "ATHENS",
            "cost": 0,
            "dead": false,
            "location": {
              "lat": 35.43300494813,
              "lon": 36.198674059427,
              "x": 44803.260781251,
              "y": 1368.0145263672,
              "z": 28495.800785932
            },
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "SHORAD"
          },
          "Coast_1_reg2static1": {
            "codename": "CHENGDU",
            "cost": 0,
            "dead": false,
            "location": {
              "lat": 34.915095371833,
              "lon": 35.865238887669,
              "x": -11751.559963962,
              "y": 0,
              "z": -3595.9565093462
            },
            "spawned": true,
            "status": 0,
            "strategic": false,
            "type": "SHORAD"
          },
          "Coast_1_reg2static2": {
            "codename": "OSLO",
            "cost": 0,
            "dead": false,
            "location": {
              "lat": 32.545895280644,
              "lon": 38.186151731796,
              "x": -278627.32888534,
              "y": 688.00067138672,
              "z": 206386.53706058
            },
            "spawned": true,
            "status": 0,
            "strategic": false,
            "type": "SHORAD"
          }
        },
        "Cyprus": [],
        "Damascus": {
          "Mezzeh": {
            "codename": "SEOUL",
            "cost": 20,
            "dead": false,
            "location": {
              "lat": 33.482713511778,
              "lon": 36.235064059083,
              "x": -171641.84375,
              "y": 718.09167480469,
              "z": 25888.533203125
            },
            "missiontype": "OCA",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "AIRBASE"
          }
        },
        "Hama": {
          "Hama": {
            "codename": "HOUSTON",
            "cost": 20,
            "dead": false,
            "location": {
              "lat": 35.116099484431,
              "lon": 36.72547347191,
              "x": 8419.59375,
              "y": 300.00030517578,
              "z": 75521.7109375
            },
            "missiontype": "OCA",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "AIRBASE"
          },
          "Hama_0_airspace": {
            "codename": "KIEV",
            "cost": 0,
            "dead": false,
            "location": {
              "lat": 34.957839466985,
              "lon": 36.725823348925,
              "x": -9136.4267255768,
              "y": 408.06478881836,
              "z": 75153.35105334
            },
            "missiontype": "CAP",
            "spawned": true,
            "status": 0,
            "strategic": false,
            "type": "AIRSPACE"
          },
          "Hama_1_Reg3EWR-1": {
            "codename": "MUNICH",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 35.222750465961,
              "lon": 36.899504930182,
              "x": 19901.27308515,
              "y": 522.35296630859,
              "z": 91633.777176644
            },
            "missiontype": "SEAD",
            "sitetype": "EWR",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "EWR"
          },
          "Hama_1_Reg3EWR-1-SHORAD": {
            "codename": "PHOENIX",
            "cost": 0,
            "dead": false,
            "location": {
              "lat": 35.222750465961,
              "lon": 36.899504930182,
              "x": 19901.27308515,
              "y": 522.35296630859,
              "z": 91633.777176644
            },
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "SHORAD"
          },
          "Hama_1_Reg3EWR-2": {
            "codename": "ISTANBUL",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 34.614221550721,
              "lon": 36.733559652271,
              "x": -47267.544558564,
              "y": 618.38500976563,
              "z": 74999.235154243
            },
            "missiontype": "SEAD",
            "sitetype": "EWR",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "EWR"
          },
          "Hama_1_Reg3EWR-2-SHORAD": {
            "codename": "GIZA",
            "cost": 0,
            "dead": false,
            "location": {
              "lat": 34.614221550721,
              "lon": 36.733559652271,
              "x": -47267.544558564,
              "y": 618.38500976563,
              "z": 74999.235154243
            },
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "SHORAD"
          },
          "Hama_1_Reg3Factory-1": {
            "codename": "SEOUL",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.263666992977,
              "lon": 36.584667371247,
              "x": 25092.026367188,
              "y": 271.67144775391,
              "z": 63085.357421875
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FACTORY"
          },
          "Hama_1_Reg3Factory-10": {
            "codename": "TULSA",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 34.758270020378,
              "lon": 36.717977542829,
              "x": -31257.205078125,
              "y": 481.91882324219,
              "z": 73932.6484375
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FACTORY"
          },
          "Hama_1_Reg3Factory-11": {
            "codename": "PRAGUE",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 34.753507102997,
              "lon": 36.674367190809,
              "x": -31693.95703125,
              "y": 489.89849853516,
              "z": 69928.09375
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FACTORY"
          },
          "Hama_1_Reg3Factory-12": {
            "codename": "HANOI",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 34.717059730293,
              "lon": 36.707739395028,
              "x": -35807.024902344,
              "y": 508.46719360352,
              "z": 72891.135253906
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FUELDUMP"
          },
          "Hama_1_Reg3Factory-14": {
            "codename": "ATHENS",
            "cost": 15,
            "dead": false,
            "location": {
              "lat": 34.658371314165,
              "lon": 36.619334657218,
              "x": -42128.84765625,
              "y": 498.69812011719,
              "z": 64639.97265625
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FACTORY"
          },
          "Hama_1_Reg3Factory-2": {
            "codename": "DETROIT",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.170012801031,
              "lon": 36.723374613441,
              "x": 14404.495117188,
              "y": 253.97911071777,
              "z": 75467.26171875
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FUELDUMP"
          },
          "Hama_1_Reg3Factory-3": {
            "codename": "OSLO",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.14531774734,
              "lon": 36.712010583515,
              "x": 11688.857421875,
              "y": 295.69012451172,
              "z": 74369.125
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FACTORY"
          },
          "Hama_1_Reg3Factory-4": {
            "codename": "PARIS",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.087911845812,
              "lon": 36.694034760711,
              "x": 5358.69921875,
              "y": 302.60485839844,
              "z": 72583.749511719
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FUELDUMP"
          },
          "Hama_1_Reg3Factory-5": {
            "codename": "VENICE",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.140074202314,
              "lon": 36.784697017287,
              "x": 10957.306640625,
              "y": 286.68591308594,
              "z": 80978.91796875
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FUELDUMP"
          },
          "Hama_1_Reg3Factory-6": {
            "codename": "TAMPA",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.140084850697,
              "lon": 36.785232600551,
              "x": 10957.401367188,
              "y": 288.09030151367,
              "z": 81027.74609375
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FUELDUMP"
          },
          "Hama_1_Reg3Factory-7": {
            "codename": "STOCKHOLM",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.090224724089,
              "lon": 36.77869648798,
              "x": 5439.857421875,
              "y": 318.59661865234,
              "z": 80308.784179688
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FUELDUMP"
          },
          "Hama_1_Reg3Factory-8": {
            "codename": "TOKYO",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.073154889958,
              "lon": 36.761128622064,
              "x": 3582.2153320313,
              "y": 350.4211730957,
              "z": 78664.484375
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FACTORY"
          },
          "Hama_1_Reg3Factory-9": {
            "codename": "HAMBURG",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 34.959805209996,
              "lon": 36.662323938726,
              "x": -8784.57421875,
              "y": 404.28985595703,
              "z": 69359.4296875
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FACTORY"
          },
          "Hama_1_Reg3Sa2-1": {
            "codename": "LEXUS",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.274933834021,
              "lon": 36.889846488215,
              "x": 25708.410687511,
              "y": 410.25729370117,
              "z": 90877.709118812
            },
            "missiontype": "SEAD",
            "sitetype": "SA-2",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "ignore": false,
            "type": "SAM"
          },
          "Hama_1_Reg3Sa2-2": {
            "codename": "SAAB",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.111469967058,
              "lon": 36.624263325451,
              "x": 8121.5057259639,
              "y": 274.00469970703,
              "z": 66284.334032143
            },
            "missiontype": "SEAD",
            "sitetype": "SA-2",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          },
          "Hama_1_Reg3Sa6-1": {
            "codename": "FORD",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.107198636392,
              "lon": 36.693571746347,
              "x": 7499.1348507487,
              "y": 330.43118286133,
              "z": 72591.079059033
            },
            "missiontype": "SEAD",
            "sitetype": "SA-6",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          },
          "Hama_1_Reg3Sa6-2": {
            "codename": "BUICK",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.039606453208,
              "lon": 36.77644720652,
              "x": -170.45002571172,
              "y": 673.41595458984,
              "z": 79978.45563149
            },
            "missiontype": "SEAD",
            "sitetype": "SA-6",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          },
          "Hama_1_Reg3Sa6-4": {
            "codename": "JAGUAR",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 34.629491245765,
              "lon": 36.675250329199,
              "x": -45452.036053049,
              "y": 542.53948974609,
              "z": 69691.096526066
            },
            "missiontype": "SEAD",
            "sitetype": "SA-6",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          },
          "Hama_1_Reg3Sa6-5": {
            "codename": "CADDY",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 34.611252279602,
              "lon": 36.782168823758,
              "x": -47696.030206358,
              "y": 650.96508789063,
              "z": 79449.59009056
            },
            "missiontype": "SEAD",
            "sitetype": "SA-6",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          },
          "Hama_1_reg3sa5-1": {
            "codename": "SUBARU",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 34.610292473971,
              "lon": 36.750195830779,
              "x": -47737.527583288,
              "y": 632.71752929688,
              "z": 76515.102536265
            },
            "missiontype": "SEAD",
            "sitetype": "SA-5",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          },
          "Hama_1_reg3sa5-1-SHORAD": {
            "codename": "LONDON",
            "cost": 0,
            "dead": false,
            "location": {
              "lat": 34.611019076834,
              "lon": 36.750923592767,
              "x": -47658.420455394,
              "y": 631.98840332031,
              "z": 76583.644067287
            },
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "SHORAD"
          },
          "Hama_1_reg4aaa1": {
            "codename": "KURSK",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 35.254765010373,
              "lon": 36.588969754038,
              "x": 24094.971176033,
              "y": 273.1760559082,
              "z": 63452.810353592
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Hama_1_reg4aaa2": {
            "codename": "XIAN",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 35.119770892437,
              "lon": 36.718799287122,
              "x": 8840.776167447,
              "y": 300.00030517578,
              "z": 74922.713488508
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Hama_1_reg4aaa3": {
            "codename": "MOSCOW",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 35.117001055003,
              "lon": 36.782278669185,
              "x": 8402.784602108,
              "y": 298.85766601563,
              "z": 80701.533493484
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Hama_1_reg4sa3-1": {
            "codename": "LOLA",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.158593489686,
              "lon": 36.761368496749,
              "x": 13059.187645503,
              "y": 305.68905639648,
              "z": 78899.476968975
            },
            "missiontype": "SEAD",
            "sitetype": "SA-3",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          },
          "Hama_1_reg4sa3-2": {
            "codename": "JEEP",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.008545882693,
              "lon": 36.833186323848,
              "x": -3729.731955538,
              "y": 670.50915527344,
              "z": 85079.982678406
            },
            "missiontype": "SEAD",
            "sitetype": "SA-3",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          },
          "Hama_1_reg4sa3-3": {
            "codename": "DODGE",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 34.953318889023,
              "lon": 36.670686425884,
              "x": -9521.9154080524,
              "y": 393.74108886719,
              "z": 70106.344045975
            },
            "missiontype": "SEAD",
            "sitetype": "SA-3",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          },
          "Hama_1_reg4sa3-4": {
            "codename": "MAZDA",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 34.752617549415,
              "lon": 36.759675556839,
              "x": -31970.11745284,
              "y": 513.61376953125,
              "z": 77735.882591621
            },
            "missiontype": "SEAD",
            "sitetype": "SA-3",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          },
          "Hama_1_reg4sa3-5": {
            "codename": "CHEVY",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 34.717414463426,
              "lon": 36.622675953196,
              "x": -35586.756879356,
              "y": 490.10198974609,
              "z": 65100.96877874
            },
            "missiontype": "SEAD",
            "sitetype": "SA-3",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          },
          "Hama_1_reg4sa3-6": {
            "codename": "PORSCHE",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 34.647890653664,
              "lon": 36.717880661051,
              "x": -43500.500999751,
              "y": 559.43634033203,
              "z": 73645.994870648
            },
            "missiontype": "SEAD",
            "sitetype": "SA-3",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          },
          "Hama_1_reg4sa3-7": {
            "codename": "ALFA",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 34.583182949587,
              "lon": 36.741345058249,
              "x": -50726.35851199,
              "y": 639.89178466797,
              "z": 75636.081172836
            },
            "missiontype": "SEAD",
            "sitetype": "SA-3",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          }
        },
        "Hatay": {
          "Hatay": {
            "codename": "HANOI",
            "cost": 10,
            "dead": false,
            "location": {
              "lat": 36.371269972814,
              "lon": 36.298090184913,
              "x": 148653.765625,
              "y": 77.175567626953,
              "z": 40403.9453125
            },
            "missiontype": "OCA",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "AIRBASE"
          },
          "Hatay_1_reg1AR1": {
            "codename": "OSAKA",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.302343855843,
              "lon": 36.231712675753,
              "x": 141174.48927729,
              "y": 86.58854675293,
              "z": 34228.511687189
            },
            "missiontype": "ARMEDRECON",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "SPECIALFORCES"
          },
          "Hatay_1_reg1AR10": {
            "codename": "TAIPEI",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.279701848299,
              "lon": 36.560307846926,
              "x": 137867.72432057,
              "y": 92.727607727051,
              "z": 63676.404089757
            },
            "missiontype": "ARMEDRECON",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "SPECIALFORCES"
          },
          "Hatay_1_reg1AR11": {
            "codename": "MELBOURNE",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.495149980519,
              "lon": 36.534438569979,
              "x": 161831.12240609,
              "y": 209.03721618652,
              "z": 61963.108628268
            },
            "missiontype": "ARMEDRECON",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "SPECIALFORCES"
          },
          "Hatay_1_reg1AR12": {
            "codename": "ROME",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.193927664464,
              "lon": 36.311946138162,
              "x": 128941.73529509,
              "y": 190.10432434082,
              "z": 41100.572301822
            },
            "missiontype": "ARMEDRECON",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "SPECIALFORCES"
          },
          "Hatay_1_reg1AR13": {
            "codename": "DELHI",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.08024532265,
              "lon": 35.99233155675,
              "x": 117171.52828709,
              "y": 9.1822948455811,
              "z": 11963.456406437
            },
            "missiontype": "ARMEDRECON",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "SPECIALFORCES"
          },
          "Hatay_1_reg1AR14": {
            "codename": "BERLIN",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.225059152622,
              "lon": 36.152371040616,
              "x": 132805.83046029,
              "y": 90.027702331543,
              "z": 26850.141409408
            },
            "missiontype": "ARMEDRECON",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "SPECIALFORCES"
          },
          "Hatay_1_reg1AR16": {
            "codename": "MEMPHIS",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.514351520227,
              "lon": 36.519067511294,
              "x": 163997,
              "y": 0,
              "z": 60641
            },
            "missiontype": "ARMEDRECON",
            "spawned": true,
            "status": 0,
            "strategic": false,
            "type": "SPECIALFORCES"
          },
          "Hatay_1_reg1AR2": {
            "codename": "CAIRO",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.180751796563,
              "lon": 36.147988883283,
              "x": 127901.06248514,
              "y": 86.747169494629,
              "z": 26311.500903153
            },
            "missiontype": "ARMEDRECON",
            "spawned": false,
            "status": 22,
            "strategic": false,
            "type": "SPECIALFORCES"
          },
          "Hatay_1_reg1AR3": {
            "codename": "CHICAGO",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.222834605391,
              "lon": 36.189546338264,
              "x": 132461.38655965,
              "y": 88.456977844238,
              "z": 30185.192921246
            },
            "missiontype": "ARMEDRECON",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "SPECIALFORCES"
          },
          "Hatay_1_reg1AR4": {
            "codename": "KYOTO",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.177651170009,
              "lon": 36.189998365492,
              "x": 127446.70071994,
              "y": 450.30117797852,
              "z": 30080.49557171
            },
            "missiontype": "ARMEDRECON",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "SPECIALFORCES"
          },
          "Hatay_1_reg1AR6": {
            "codename": "LIVERPOOL",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.364796455807,
              "lon": 36.457930031311,
              "x": 147545.99565958,
              "y": 85.231674194336,
              "z": 54727.689295043
            },
            "missiontype": "ARMEDRECON",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "SPECIALFORCES"
          },
          "Hatay_1_reg1AR7-3": {
            "codename": "LAGOS",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.501930786796,
              "lon": 36.415052921211,
              "x": 162864.04066404,
              "y": 70.944259643555,
              "z": 51287.967573119
            },
            "missiontype": "ARMEDRECON",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "SPECIALFORCES"
          },
          "Hatay_1_reg1AR8": {
            "codename": "MILAN",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.561274926421,
              "lon": 36.396922635497,
              "x": 169492.53243488,
              "y": 121.10816955566,
              "z": 49842.058499685
            },
            "missiontype": "ARMEDRECON",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "SPECIALFORCES"
          },
          "Hatay_1_reg1AR9": {
            "codename": "SHANGHAI",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.42790242128,
              "lon": 36.22521967505,
              "x": 155123.21155393,
              "y": 306.02172851563,
              "z": 34045.722551761
            },
            "missiontype": "ARMEDRECON",
            "spawned": true,
            "status": 0,
            "strategic": false,
            "type": "SPECIALFORCES"
          },
          "Hatay_1_reg1ar15": {
            "codename": "TEHRAN",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.123548270437,
              "lon": 35.919951631723,
              "x": 122180.85515718,
              "y": 6.7204561233521,
              "z": 5596.151217831
            },
            "missiontype": "ARMEDRECON",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "SPECIALFORCES"
          },
          "Hatay_1_reg1ar5": {
            "codename": "JAKARTA",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 36.33046814169,
              "lon": 36.36116360837,
              "x": 143970,
              "y": 73,
              "z": 45940
            },
            "missiontype": "ARMEDRECON",
            "spawned": true,
            "status": 0,
            "strategic": false,
            "type": "SPECIALFORCES"
          }
        },
        "Homs Refinery": {
          "Homs Refinery_0_airspace": {
            "codename": "LISBON",
            "cost": 0,
            "dead": false,
            "location": {
              "lat": 34.716939243493,
              "lon": 36.641304542385,
              "x": -35679.6546875,
              "y": 489.44641113281,
              "z": 66805.9609375
            },
            "missiontype": "CAP",
            "spawned": true,
            "status": 0,
            "strategic": false,
            "type": "AIRSPACE"
          },
          "Homs Refinery_1_Reg3Factory-13": {
            "codename": "TEHRAN",
            "cost": 10000,
            "dead": false,
            "location": {
              "lat": 34.716939243493,
              "lon": 36.641304542385,
              "x": -35679.6546875,
              "y": 489.44641113281,
              "z": 66805.9609375
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FACILITY"
          }
        },
        "Israel": [],
        "Lebanon": {
          "Beirut-Rafic Hariri": {
            "codename": "SHENZEN",
            "cost": 20,
            "dead": false,
            "location": {
              "lat": 33.836465479357,
              "lon": 35.487416760577,
              "x": -130289.4375,
              "y": 12.000012397766,
              "z": -42276.67578125
            },
            "missiontype": "OCA",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "AIRBASE"
          }
        },
        "Palmyra": {
          "Palmyra": {
            "codename": "WARSAW",
            "cost": 20,
            "dead": false,
            "location": {
              "lat": 34.558235536659,
              "lon": 38.331123062337,
              "x": -55607.97265625,
              "y": 386.22402954102,
              "z": 221438.15625
            },
            "missiontype": "OCA",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "AIRBASE"
          },
          "Palmyra_0_airspace": {
            "codename": "KYOTO",
            "cost": 0,
            "dead": false,
            "location": {
              "lat": 35.237095240222,
              "lon": 38.390294990457,
              "x": 19640.845959145,
              "y": 507.34069824219,
              "z": 227325.02293517
            },
            "missiontype": "CAP",
            "spawned": true,
            "status": 0,
            "strategic": false,
            "type": "AIRSPACE"
          },
          "Palmyra_1_Reg4Comms1": {
            "codename": "PHOENIX",
            "cost": 1,
            "dead": false,
            "location": {
              "lat": 36.129810745166,
              "lon": 38.942693665147,
              "x": 118482.03678365,
              "y": 278.3674621582,
              "z": 277644.59369054
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FACILITY"
          },
          "Palmyra_1_Reg4EWR-1": {
            "codename": "BEIJING",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 34.547009917091,
              "lon": 37.611971286504,
              "x": -56181.016733326,
              "y": 578.12042236328,
              "z": 155442.53996567
            },
            "missiontype": "SEAD",
            "sitetype": "EWR",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "EWR"
          },
          "Palmyra_1_Reg4EWR-1-SHORAD": {
            "codename": "MOSCOW",
            "cost": 0,
            "dead": false,
            "location": {
              "lat": 34.547009917091,
              "lon": 37.611971286504,
              "x": -56181.016733326,
              "y": 578.12042236328,
              "z": 155442.53996567
            },
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "SHORAD"
          },
          "Palmyra_1_Reg4EWR-2": {
            "codename": "DALLAS",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 34.590019334362,
              "lon": 38.341118347001,
              "x": -52089.461346824,
              "y": 393.18353271484,
              "z": 222378.13804218
            },
            "missiontype": "SEAD",
            "sitetype": "EWR",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "EWR"
          },
          "Palmyra_1_Reg4EWR-2-SHORAD": {
            "codename": "MUNICH",
            "cost": 0,
            "dead": false,
            "location": {
              "lat": 34.590019334362,
              "lon": 38.341118347001,
              "x": -52089.461346824,
              "y": 393.18353271484,
              "z": 222378.13804218
            },
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "SHORAD"
          },
          "Palmyra_1_Reg4EWR-3": {
            "codename": "KARACHI",
            "cost": 2,
            "dead": false,
            "location": {
              "lat": 35.77599241576,
              "lon": 38.567351380464,
              "x": 79323.515028119,
              "y": 335.00033569336,
              "z": 243697.30689676
            },
            "missiontype": "SEAD",
            "sitetype": "EWR",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "EWR"
          },
          "Palmyra_1_Reg4EWR-3-SHORAD": {
            "codename": "MEMPHIS",
            "cost": 0,
            "dead": false,
            "location": {
              "lat": 35.77599241576,
              "lon": 38.567351380464,
              "x": 79323.515028119,
              "y": 335.00033569336,
              "z": 243697.30689676
            },
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "SHORAD"
          },
          "Palmyra_1_Reg4Factory-1": {
            "codename": "VENICE",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.94041864831,
              "lon": 38.95412597178,
              "x": 97475.016601563,
              "y": 228.68086242676,
              "z": 278663.37683105
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "AMMODUMP"
          },
          "Palmyra_1_Reg4Factory-2": {
            "codename": "ATLANTA",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.9639595112,
              "lon": 38.983141653281,
              "x": 100085.17683919,
              "y": 239.04005432129,
              "z": 281280.90836589
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FUELDUMP"
          },
          "Palmyra_1_Reg4Factory-3": {
            "codename": "TEHRAN",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 35.974568655107,
              "lon": 39.040870226648,
              "x": 101262.52612305,
              "y": 253.37284851074,
              "z": 286485.70458984
            },
            "missiontype": "STRIKE",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "FUELDUMP"
          },
          "Palmyra_1_Reg4Sa2-1": {
            "codename": "PONTIAC",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 34.534951417181,
              "lon": 37.584972085544,
              "x": -57483.928309291,
              "y": 573.76892089844,
              "z": 152946.32391753
            },
            "missiontype": "SEAD",
            "sitetype": "SA-2",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          },
          "Palmyra_1_Reg4Sa2-2": {
            "codename": "TESLA",
            "cost": 3,
            "dead": false,
            "location": {
              "lat": 34.490716139616,
              "lon": 37.62671229495,
              "x": -62442.422105788,
              "y": 535.11138916016,
              "z": 156710.38951084
            },
            "missiontype": "SEAD",
            "sitetype": "SA-2",
            "spawned": false,
            "status": 0,
            "strategic": true,
            "type": "SAM"
          },
          "Palmyra_1_reg3aaa1": {
            "codename": "HELSINKI",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 35.960604095746,
              "lon": 39.044963854005,
              "x": 99713.820464006,
              "y": 241.0283203125,
              "z": 286855.49035551
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Palmyra_1_reg3aaa2": {
            "codename": "LAGOS",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 35.750358028254,
              "lon": 38.56580377826,
              "x": 76480.99121859,
              "y": 335.00033569336,
              "z": 243544.84058659
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Palmyra_1_reg3aaa3": {
            "codename": "HANOI",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 34.559067089988,
              "lon": 38.299720547411,
              "x": -55496.232453293,
              "y": 403.90124511719,
              "z": 218557.88114598
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          },
          "Palmyra_1_reg3aaa4": {
            "codename": "KURSK",
            "cost": 5,
            "dead": false,
            "location": {
              "lat": 34.525830472751,
              "lon": 37.628252793326,
              "x": -58550.206025362,
              "y": 548.00054931641,
              "z": 156904.67094396
            },
            "missiontype": "BAI",
            "spawned": false,
            "status": 0,
            "strategic": false,
            "type": "LOGISTICS"
          }
        },
        "Turkey": []
      },
      "commander": {
        "availablemissions": []
      },
      "missions": [],
      "tickets": {
        "current": 460,
        "start": 500,
        "text": "Nominal"
      }
    },
    "2": {
      "assets": {
        "Aleppo": [],
        "Coast": [],
        "Cyprus": {
          "Akrotiri": {
            "codename": "HAMBURG",
            "cost": 20,
            "dead": false,
            "location": {
              "lat": 34.594065664734,
              "lon": 32.974818319372,
              "x": -35297.09375,
              "y": 18.946063995361,
              "z": -270072.28125
            },
            "missiontype": "OCA",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "AIRBASE"
          },
          "Gazipasa": {
            "codename": "MUMBAI",
            "cost": 20,
            "dead": false,
            "location": {
              "lat": 36.297823085147,
              "lon": 32.286068490305,
              "x": 158094.9375,
              "y": 11.104940414429,
              "z": -320441.0625
            },
            "missiontype": "OCA",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "AIRBASE"
          }
        },
        "Damascus": [],
        "Hama": [],
        "Hatay": [],
        "Homs Refinery": [],
        "Israel": {
          "Naqoura": {
            "codename": "WARSAW",
            "cost": 20,
            "dead": false,
            "location": {
              "lat": 33.10790532693,
              "lon": 35.127285739707,
              "x": -209938.1875,
              "y": 115.27894592285,
              "z": -78642.609375
            },
            "missiontype": "OCA",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "AIRBASE"
          }
        },
        "Lebanon": [],
        "Palmyra": [],
        "Turkey": {
          "Adana Sakirpasa": {
            "codename": "DUBLIN",
            "cost": 20,
            "dead": false,
            "location": {
              "lat": 36.988281127829,
              "lon": 35.291372307265,
              "x": 220139.03125,
              "y": 17.000017166138,
              "z": -47292.88671875
            },
            "missiontype": "OCA",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "AIRBASE"
          },
          "CV-59 Forrestal": {
            "codename": "MILAN",
            "cost": 20,
            "dead": false,
            "location": {
              "lat": 35.889634821938,
              "lon": 32.585576744914,
              "x": 110897.56751321,
              "y": 0.01700533440885,
              "z": -296500.41602397
            },
            "missiontype": "OCA",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "AIRBASE"
          },
          "CVN-73 George Washington": {
            "codename": "DRESDEN",
            "cost": 20,
            "dead": false,
            "location": {
              "lat": 35.774343630604,
              "lon": 32.773154462428,
              "x": 96985.180340391,
              "y": 0.016020807899622,
              "z": -280356.95139599
            },
            "missiontype": "OCA",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "AIRBASE"
          },
          "FARP Helena": {
            "codename": "JAKARTA",
            "cost": 20,
            "dead": false,
            "location": {
              "lat": 36.7029143769,
              "lon": 37.11037775465,
              "x": 183714.40625,
              "y": 626.578125,
              "z": 114009.171875
            },
            "missiontype": "OCA",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "AIRBASE"
          },
          "FARP Lancelot": {
            "codename": "LISBON",
            "cost": 20,
            "dead": false,
            "location": {
              "lat": 36.566351429441,
              "lon": 36.121748969547,
              "x": 170758.25,
              "y": 4.969174861908,
              "z": 25226.857421875
            },
            "missiontype": "OCA",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "AIRBASE"
          },
          "Gaziantep": {
            "codename": "DENVER",
            "cost": 20,
            "dead": false,
            "location": {
              "lat": 36.951397233614,
              "lon": 37.464512889798,
              "x": 210716.109375,
              "y": 697.21142578125,
              "z": 146087.90625
            },
            "missiontype": "OCA",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "AIRBASE"
          },
          "Gecitkale": {
            "codename": "OSLO",
            "cost": 20,
            "dead": false,
            "location": {
              "lat": 35.236403909864,
              "lon": 33.707277702803,
              "x": 32254.640625,
              "y": 45.000045776367,
              "z": -199005.984375
            },
            "missiontype": "OCA",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "AIRBASE"
          },
          "Incirlik": {
            "codename": "STOCKHOLM",
            "cost": 20,
            "dead": false,
            "location": {
              "lat": 36.994254281542,
              "lon": 35.412713065757,
              "x": 220387.578125,
              "y": 47.783618927002,
              "z": -36463.7109375
            },
            "missiontype": "OCA",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "AIRBASE"
          },
          "LHA-4 Nassau": {
            "codename": "MESA",
            "cost": 20,
            "dead": false,
            "location": {
              "lat": 35.355236950629,
              "lon": 34.614188474426,
              "x": 41410.573978452,
              "y": -0.017787820870581,
              "z": -115803.74341795
            },
            "missiontype": "OCA",
            "spawned": true,
            "status": 0,
            "strategic": true,
            "type": "AIRBASE"
          }
        }
      },
      "commander": {
        "availablemissions": {
          "ANTISHIP": 4,
          "ARMEDRECON": 16,
          "BAI": 28,
          "CAP": 5,
          "CAS": 24,
          "SEAD": 36,
          "STRIKE": 32
        }
      },
      "missions": {
        "5730": {
          "assigned": [{
            "type": "A-10C",
            "group": "104th fs Maryland 1-1",
            "iffmode3": "5730",
            "player": "kukiric"
          }],
          "iffmode1": "50",
          "state": "Active",
          "target": {
            "coalition": "1",
            "intel": 3,
            "location_degraded": {
              "lat": 35.920999980814,
              "lon": 36.64099999986,
              "x": 97891.6484375,
              "y": 0,
              "z": 69959.1875
            },
            "name": "Aleppo_1_Reg1Factory-3",
            "region": "Aleppo",
            "status": 0
          },
          "timeout": 33331.5,
          "type": "STRIKE"
        },
        "5740": {
          "assigned": [{
            "type": "M-2000C",
            "group": "2/5 chasse 1-1",
            "iffmode3": "5740",
            "player": "RebelSapph",
          }, {
            "type": "M-2000C",
            "group": "2/5 chasse 1-2",
            "iffmode3": "5741",
            "player": "Arctic Fox"
          }],
          "iffmode1": "50",
          "state": "Active",
          "target": {
            "coalition": "1",
            "intel": 3,
            "location_degraded": {
              "lat": 33.920999980814,
              "lon": 35.64099999986,
              "x": 77891.6484375,
              "y": 0,
              "z": 59959.1875
            },
            "name": "Aleppo_1_Reg1Factory-2",
            "region": "Aleppo",
            "status": 25
          },
          "timeout": 30360,
          "type": "STRIKE"
        }
      },
      "tickets": {
        "current": 112.5,
        "start": 200,
        "text": "Marginal"
      }
    }
  },
  "period": 7200,
  "dcs_version": "2.8.1.34667",
  "date": getSteppedDate(30),
  "modeldate": "1998-8-17",
  "modeltime": process.uptime(),
  "players": {
    "current": 4,
    "max": 15,
    "list": [{
      "id": 1,
      "name": "LK Admin",
      "side": 0,
      "slot": "",
    }, {
      "id": "2",
      "name": "kukiric",
      "side": 2,
      "slot": 100,
    }, {
      "name": "RebelSapph",
      "side": 2,
      "slot": 101,
    }, {
      "name": "Arctic Fox",
      "side": 2,
      "slot": 102,
    }]
  },
  "ended": false,
  "sortie": "Flashpoint Levant",
  "startdate": "2022-03-18 13:38:25Z",
  "theater": "Syria",
  "version": "47df0ac810b7bacb06cae77355625ff7017aaf09"
});

export type ExportData = ReturnType<typeof getSampleData>;
export default getSampleData;
