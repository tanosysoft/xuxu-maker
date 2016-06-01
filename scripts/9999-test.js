'use strict'; $(() => {

let $layer = xxm.layers.create(0).css('animation-iteration-count', 'infinite');

let $tilemap = xxm.tilemaps.create($layer, 1);

for(let i = 0; i < 2; ++i) {
    let j = i * 3;

    xxm.tilemaps.createTile($tilemap, 8, 2, j + 1, 1);
    xxm.tilemaps.createTile($tilemap, 9, 2, j + 2, 1);
    xxm.tilemaps.createTile($tilemap, 8, 3, j + 1, 2);
    xxm.tilemaps.createTile($tilemap, 9, 3, j + 2, 2);
}

let $spr1 = xxm.sprites.create($tilemap, 1, 3, 3);
let $spr2 = xxm.sprites.create($tilemap, 1, 3, 1);

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

    $layer.toggleClass('animated shake');
});

});
