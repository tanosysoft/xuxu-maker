'use strict'; {

xxm.db.maps[1] = {
    "name": "test",

    "w": 30,
    "h": 20,

    "bg": "data/test.png",

    "preloadAudio": [
        "data/se/Attack2.ogg",
        "data/se/Absorb1.ogg",
        "data/se/Key.ogg"
    ],

    "layers": [
        {
            "hero": {
                "spritesetId": 2,
                "initialPos": [1, 5]
            },

            "tilesetId": 1,

            "tilemap": [
                [8, 2, 2, 1],
                [9, 2, 3, 1],
                [8, 3, 2, 2],
                [9, 3, 3, 2],

                [8, 2, 5, 1],
                [9, 2, 6, 1],
                [8, 3, 5, 2],
                [9, 3, 6, 2],

                [0, 1, 2, 6],

                [10, 4, 5, 3],
                [10, 5, 5, 4],

                [10, 4, 5, 5],
                [10, 5, 5, 6],

                [10, 4, 6, 4],
                [10, 5, 6, 5],

                [15, 5, 7, 1]
            ],

            "events": [
                {
                    "name": "EvilSister",

                    "initialPos": [4, 3],

                    "pages": [
                        {
                            "name": "default",
                            "spritesetId": 1
                        },

                        {
                            "name": "allOver",
                            "spritesetId": 2
                        }
                    ]
                },

                {
                    "name": "Bones",

                    "initialPos": [1, 4],

                    "pages": [
                        {
                            "name": "default",
                            "tsCoords": [4, 3]
                        }
                    ]
                }
            ]
        }
    ]
};

}
