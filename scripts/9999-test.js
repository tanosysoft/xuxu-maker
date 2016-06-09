'use strict'; $(() => {

let $vp = xxm.viewports.create(640, 480)
    .appendTo($('body'));

let $layer = xxm.layers.create($vp, 0)
    .css('animation-iteration-count', 'infinite');

let $tilemap = xxm.tilemaps.create($layer, 1)
    .css('background-image', 'url("test.png")');

xxm.cssVar.set($tilemap[0], 'w', 30);
xxm.cssVar.set($tilemap[0], 'h', 20);

for(let i = 0; i < 2; ++i) {
    let j = i * 3;

    xxm.tilemaps.createTile($tilemap, 8, 2, j + 2, 1);
    xxm.tilemaps.createTile($tilemap, 9, 2, j + 3, 1);
    xxm.tilemaps.createTile($tilemap, 8, 3, j + 2, 2);
    xxm.tilemaps.createTile($tilemap, 9, 3, j + 3, 2);
}

xxm.tilemaps.createTile($tilemap, 0, 1, 2, 6);

xxm.tilemaps.createTile($tilemap, 10, 4, 5, 3);
xxm.tilemaps.createTile($tilemap, 10, 5, 5, 4);

xxm.tilemaps.createTile($tilemap, 10, 4, 5, 5);
xxm.tilemaps.createTile($tilemap, 10, 5, 5, 6);

xxm.tilemaps.createTile($tilemap, 10, 4, 6, 4);
xxm.tilemaps.createTile($tilemap, 10, 5, 6, 5);

xxm.tilemaps.createTile($tilemap, 4, 3, 1, 4);
xxm.tilemaps.createTile($tilemap, 15, 5, 7, 1);

xxm.events.create({
    id: 1,
    name: 'chara1',

    $initialParent: $tilemap,
    initialPos: [1, 1],

    pages: [
        {
            checkConditions: () => {
                return window.derp === 1;
            },

            spritesetId: 1,
        },

        {
            checkConditions: () => {
                return window.derp === 2;
            },

            spritesetId: 2,
        },
    ],
});

});
