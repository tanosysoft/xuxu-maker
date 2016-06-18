'use strict'; $(() => {

let $xxm = xxm.container.create('body', 640, 480);

let $mainLayer = xxm.layers.create($xxm, 0);

xxm.viewports.set($mainLayer);

let $tilemap = xxm.tilemaps.create($mainLayer, 1)
    .addClass('xxmPixelated xxmZoom')
    .css('background-image', 'url("data/test.png")');

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

let seFlip = new Audio('data/se/Attack2.ogg');
let seTransform = new Audio('data/se/Absorb1.ogg');

xxm.events.create({
    id: 1,
    name: 'chara1',

    $initialParent: $tilemap,
    initialPos: [4, 3],

    pages: [
        {
            spritesetId: 1,

            trigger: 'action',

            checkConditions: ev => {
                return !ev.isItAllOverYet;
            },

            exec: ev => {
                xxm.cssAnimations.add(ev.$spr, 'flip', '0.8s');
                seFlip.play();

                let deferred = Q.defer();

                (function thisFn() {
                    if(ev.$spr.is('.animated')) {
                        requestAnimationFrame(thisFn);
                        return;
                    }

                    setTimeout(() => {
                        seTransform.play();

                        xxm.cssAnimations.add(ev.$spr, 'flash', '0.2s', 4);

                        ev.isItAllOverYet = true;

                        let [$msgBox, msgPromise] = xxm.messageBox.show(
                            $uiLayer, ["You've completed the quest, congratulations!"]
                        );

                        $msgBox.addClass('xxmFatMessageBox xxmBottomWindow xxmWaitCursor');

                        deferred.resolve(msgPromise);
                    }, 150);
                })();

                return deferred.promise;
            },
        },

        {
            spritesetId: 2,

            trigger: 'action',

            exec: ev => {
                let [$msgBox, msgPromise] = xxm.messageBox.show($uiLayer, [
                    "Actually, I was your evil twin all along! ",
                    "It's all over for you now!",
                ]);

                $msgBox.addClass('xxmFatMessageBox xxmBottomWindow xxmWaitCursor');

                return msgPromise;
            },
        },
    ],
});

let seBone = new Audio('data/se/Key.ogg');

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
                $('.xxm').toggleClass('xxmBoard');
            },
        }
    ],
});

xxm.tilemaps.setTile(evBones.$spr, 4, 3);

let bgm = new Audio('data/bgm/Dungeon5.ogg');

bgm.loop = true;

let $uiLayer = xxm.layers.create($xxm, 0);

let $mapNameWnd = $('<div>')
    .addClass('xxmWindow xxmTopLeftWindow');

$mapNameWnd.text('謎の地下城');

$uiLayer.append($mapNameWnd);

let $demoWnd = $('<div>')
    .addClass('xxmWindow xxmTopRightWindow');

$demoWnd.text('ＤＥＭＯ');

$uiLayer.append($demoWnd);

new Image().src = 'system/waitCursor.png';

let $hero = xxm.sprites.create($tilemap, 2, 1, 5)
    .addClass('xxmViewportTarget');

$hero.click(() => {
    bgm.paused? bgm.play() : bgm.pause();
});

let $transLayer = xxm.layers.create($xxm, 0)
    .addClass('xxmTransitionLayer')
    .css('animation-play-state', 'paused');

xxm.cssAnimations.add($transLayer, 'xxmSquareFadeIn');

$(window).on('load', () => {
    bgm.play();

    $transLayer.css('animation-play-state', 'running');

    $transLayer.one('animationend', () => {
        xxm.pc.select($hero);
    });
});

});
