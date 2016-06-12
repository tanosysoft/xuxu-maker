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

xxm.tilemaps.createTile($tilemap, 15, 5, 7, 1);

let seFlip = new Audio('se/Attack2.ogg');

xxm.events.create({
    id: 1,
    name: 'chara1',

    $initialParent: $tilemap,
    initialPos: [4, 3],

    pages: [
        {
            spritesetId: 1,
            trigger: 'action',
            exec: ev => {
                xxm.cssAnimations.add(ev.$spr, 'flip');
                seFlip.play();

                let deferred = Q.defer();

                (function thisFn() {
                    if(seFlip.ended) {
                        seFlip.currentTime = 0;
                    }

                    if(ev.$spr.is('.animated') || seFlip.currentTime !== 0) {
                        requestAnimationFrame(thisFn);
                        return;
                    }

                    deferred.resolve();
                })();

                return deferred.promise;
            },
        },
    ],
});

let seBone = new Audio('se/Key.ogg');

let evBones = xxm.events.create({
    id: 2,
    name: 'bones',

    $initialParent: $tilemap,
    initialPos: [1, 4],

    pages: [
        {
            spritesetId: 0,
            trigger: 'step',
            exec: ev => {
                if(seBone.currentTime > 0 && !seBone.ended) {
                    return;
                }

                seBone.play();
            },
        }
    ],
});

xxm.tilemaps.setTile(evBones.$spr, 4, 3);

let $hero = xxm.sprites.create($tilemap, 2, 1, 5)
    .addClass('xxmViewportTarget');

xxm.pc.select($hero);

let $uiLayer = xxm.layers.create($xxm, 0);

let $mapNameWnd = $('<div>')
    .addClass('xxmWindow xxmBottomRightWindow');

$mapNameWnd.text('謎の地下城');

$uiLayer.append($mapNameWnd);

let $demoWnd = $('<div>')
    .addClass('xxmWindow xxmTopRightWindow');

$demoWnd.text('ＤＥＭＯ');

$uiLayer.append($demoWnd);

let bgm = new Audio('bgm/Dungeon5.ogg');

bgm.loop = true;

bgm.play();

$hero.click(() => {
    bgm.paused? bgm.play() : bgm.pause();
});

});
