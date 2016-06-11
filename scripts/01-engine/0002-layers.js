'use strict'; {

let exports = xxm.layers = {};

exports.create = ($parent, z) => {
    let $el = $('<div>')
        .addClass('xxmLayer')
        .css('z-index', z);

    $parent.append($el);

    return $el;
};

}
