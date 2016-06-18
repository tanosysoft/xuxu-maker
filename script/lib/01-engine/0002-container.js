'use strict'; {

let exports = xxm.container = {};

exports.create = ($parent, w, h) => {
    $parent = $($parent);

    let $el = $('<div>')
        .addClass('xxm');

    let cssVars = {
        xxmw: w,
        xxmh: h,
        tw: '32px',
        th: '32px',
    };

    ['xxmw', 'xxmh'].forEach(k => {
        if(typeof cssVars[k] === 'number') {
            cssVars[k] += 'px';
        }
    });

    xxm.cssVar.set($el[0], cssVars);

    $parent.append($el);

    return $el;
};

}
