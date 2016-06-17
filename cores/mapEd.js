'use strict'; $(() => {

let $xxm = xxm.container.create('body', 640, 480)
    .addClass('xxmEditMode');

let $mainLayer = xxm.layers.create($xxm, 0)
    .css('pointer-events', 'auto')
    .css('overflow', 'auto');

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
let seTransform = new Audio('se/Absorb1.ogg');

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
                $('.xxm').toggleClass('xxmBoard');
            },
        }
    ],
});

xxm.tilemaps.setTile(evBones.$spr, 4, 3);

let $hero = xxm.sprites.create($tilemap, 2, 1, 5);

});
