'use strict'; {

let exports = xxm.container = {};

exports.create = ($parent, w, h) => {
    $parent = $($parent);

    let $el = $('<div>')
        .addClass('xxm');

    let whProps = { xxmw: w, xxmh: h };

    ['xxmw', 'xxmh'].forEach(k => {
        if(typeof whProps[k] === 'number') {
            whProps[k] += 'px';
        }
    });

    xxm.cssVar.set($el[0], whProps);

    $parent.append($el);

    return $el;
};

}
