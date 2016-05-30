'use strict'; $(() => {

let $layer = xxm.layers.create(0).css('animation-iteration-count', 'infinite');

let $tilemap = xxm.tilemaps.create($layer, 1);

for(let i = 0; i < 2; ++i) {
    let j = i * 2;

    xxm.tilemaps.createTile($tilemap, 1, 2, j + 2, 1);
    xxm.tilemaps.createTile($tilemap, 1, 3, j + 2, 2);
}

xxm.tilemaps.createTile($tilemap, 1, 0, 3, 4);
xxm.tilemaps.createTile($tilemap, 1, 1, 3, 5);

let $spr1 = xxm.sprites.create($tilemap, {
    url: 'DemonFighter.png',
    ssfw: '111px',
    ssfh: '62px',
    ox: '39px',
    oy: '24px',
}, 1, 4).addClass('xxmWalk');

let $spr2 = xxm.sprites.create($tilemap, {
    url: 'DemonFighter.png',
    ssfw: '111px',
    ssfh: '62px',
    ox: '39px',
    oy: '24px',
}, 5, 4).addClass('xxmWalk');

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
