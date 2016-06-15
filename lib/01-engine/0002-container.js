'use strict'; {

let exports = xxm.container = {};

exports.create = $parent => {
    $parent = $($parent);

    let $el = $('<div>')
        .addClass('xxm');

    $parent.append($el);

    return $el;
};

}
