'use strict'; $(() => {

let $layer1 = xxm.layers.create(0);
let $layer2 = xxm.layers.create(0);

let $tilemap = xxm.tilemaps.create($layer1, 'test-tileset.png');

for(let i = 0; i < 2; ++i) {
    let j = i * 3;

    xxm.tilemaps.createTile($tilemap, 8, 2, j + 1, 1);
    xxm.tilemaps.createTile($tilemap, 9, 2, j + 2, 1);
    xxm.tilemaps.createTile($tilemap, 8, 3, j + 1, 2);
    xxm.tilemaps.createTile($tilemap, 9, 3, j + 2, 2);
}

let $spr = xxm.sprites.create($layer2, {
    url: 'DemonFighter.png',
    ssfw: '111px',
    ssfh: '62px',
    ox: '39px',
    oy: '24px',
}, 3, 4);

});
