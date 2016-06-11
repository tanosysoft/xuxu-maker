'use strict'; $(() => {

let $xxm = xxm.container.create('body')
    .width('640px')
    .height('480px');

let $mainLayer = xxm.layers.create($xxm, 0);

xxm.viewports.set($mainLayer);

let $tilemap = xxm.tilemaps.create($mainLayer, 1)
    .addClass('xxmPixelated xxmZoom')
    .css('background-image', 'url("test.png")');

xxm.cssVar.set($tilemap[0], { w: 30, h: 20 });

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
    initialPos: [4, 3],

    pages: [
        {
            spritesetId: 1,
            trigger: 'action',
            exec: ev => xxm.cssAnimations.add(ev.$spr, 'flip'),
        },
    ],
});

let $hero = xxm.sprites.create($tilemap, 2, 1, 5)
    .addClass('xxmViewportTarget');

xxm.pc.select($hero);

let $uiLayer = xxm.layers.create($xxm, 0);

let $wnd = $('<div>')
    .addClass('xxmWindow xxmBottomRightWindow');

$wnd.text('これはテストメセージです');

$uiLayer.append($wnd);

});
