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

let $spr1 = xxm.sprites.create($tilemap, 2, 4, 5);
let $spr2 = xxm.sprites.create($tilemap, 1, 4, 4);

xxm.cssVar.set($spr1[0], 'ssy', 2);
xxm.cssVar.set($spr2[0], 'ssy', 2);

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

    $('.xxmLayers').toggleClass('xxmZoom');
});

$('body').keyup(ev => {
    if(ev.which !== 77) {
        return;
    }

    $curSpr.attr('spriteset-id', {
        1: 2,
        2: 1,
    }[$curSpr.attr('spriteset-id')]);
});

$([$spr1[0], $spr2[0]])
    .addClass('animated')
    .css('animation-iteration-count', 'infinite');

$('body').keyup(ev => {
    if(ev.which !== 65) {
        return;
    }

    if($curSpr[0].anim === undefined) {
        $curSpr[0].anim = 0;
    }

    let anims = [
        'none', 'flash', 'pulse', 'wobble',
        'jello', 'shake', 'flip', 'rotateIn',
    ];

    let oldAnim = anims[$curSpr[0].anim];

    $curSpr[0].anim = ($curSpr[0].anim + 1) % anims.length;

    let newAnim = anims[$curSpr[0].anim];

    $curSpr
        .removeClass(oldAnim)
        .addClass(newAnim);
});

});
