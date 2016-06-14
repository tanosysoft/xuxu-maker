'use strict'; {

let exports = xxm.window = {};

exports.create = $parent => {
    let $el = $('<div>')
        .addClass('xxmWindow');

    $parent.append($el);

    return $el;
};

}
