'use strict'; $(() => {

let $xxm = xxm.container.create('body', 640, 480);

let $mapLayer = xxm.map.load($xxm, 1);

let bgm = new Audio('data/bgm/Dungeon5.ogg');

bgm.loop = true;

let $uiLayer = xxm.layers.create($xxm, 0)
    .addClass('demoUiLayer');;

let $mapNameWnd = $('<div>')
    .addClass('xxmWindow xxmTopLeftWindow');

$mapNameWnd.text('謎の地下城');

$uiLayer.append($mapNameWnd);

let $demoWnd = $('<div>')
    .addClass('xxmWindow xxmTopRightWindow');

$demoWnd.text('ＤＥＭＯ');

$uiLayer.append($demoWnd);

new Image().src = 'data/system/waitCursor.png';

let $hero = $('.xxmHero');

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
