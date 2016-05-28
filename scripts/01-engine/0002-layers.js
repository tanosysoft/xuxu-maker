'use strict'; {

let exports = xxm.layers = {};

let $container;

$(() => {
    $container = $('.xxmLayers');
});

exports.create = z => {
    let $l = $('<div>')
        .addClass('xxmLayer')
        .css('z-index', z);

    $container.append($l);

    return $l;
};

}
