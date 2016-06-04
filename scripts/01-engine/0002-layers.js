'use strict'; {

let exports = xxm.layers = {};

exports.create = ($parent, z) => {
    let $l = $('<div>')
        .addClass('xxmLayer')
        .css('z-index', z);

    let $container = $(
        $parent.find('.xxmLayers')[0]

        || $('<div>')
            .addClass('xxmLayers')
            .appendTo($parent)[0]
    );

    $container.append($l);

    return $l;
};

}
