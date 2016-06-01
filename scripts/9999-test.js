'use strict'; $(() => {

let $layer = xxm.layers.create(0)
    .css('animation-iteration-count', 'infinite');

let $tilemap = xxm.tilemaps.create($layer, 1)
    .css('background-image', 'url("test.png")');

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

let $spr1 = xxm.sprites.create($tilemap, 1, 4, 5);
let $spr2 = xxm.sprites.create($tilemap, 1, 3, 1);

xxm.cssVar.set($spr1[0], 'ssy', 1);

let $curSpr = $spr1;

xxm.pc.select($curSpr);

$('body').keyup(ev => {
    if(ev.which !== 83) {
        return;
    }

    if($curSpr.is('.xxmWalking')) {
        return;
    }

    if($curSpr === $spr1) {
        $curSpr = $spr2;
    }
    else {
        $curSpr = $spr1;
    }

    xxm.pc.select($curSpr);
});

$('body').keyup(ev => {
    if(ev.which !== 69) {
        return;
    }

    $layer.toggleClass('animated margin-shake');
});

$('body').keyup(ev => {
    if(ev.which !== 90) {
        return;
    }

    $('.xxmLayers').toggleClass('zoom');
});

});
