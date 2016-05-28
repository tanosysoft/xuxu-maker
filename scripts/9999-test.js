'use strict'; $(() => {

let $layers = $('.xxmLayers');

$layers
    .css('animation-iteration-count', 'infinite')
    .addClass('animated flip');

let $layer1 = xxm.layers.create(0);
let $layer2 = xxm.layers.create(0);

let $tilemap1 = xxm.tilemaps.create($layer1, 'test-tileset.png');
let $tilemap2 = xxm.tilemaps.create($layer2, 'test-tileset.png');

$layer1.css('animation-iteration-count', 'infinite');
$layer1.addClass('animated shake');

for(let i = 0; i < 3; ++i) {
    let j = i * 3;

    let $tilemap = i % 2 === 0? $tilemap2 : $tilemap1;

    xxm.tilemaps.createTile($tilemap, 8, 2, j + 1, 1);
    xxm.tilemaps.createTile($tilemap, 9, 2, j + 2, 1);
    xxm.tilemaps.createTile($tilemap, 8, 3, j + 1, 2);
    xxm.tilemaps.createTile($tilemap, 9, 3, j + 2, 2);
}

$('body').click(() => {
    $layers.toggleClass('animated');
    $layer1.toggleClass('animated');
});

});
