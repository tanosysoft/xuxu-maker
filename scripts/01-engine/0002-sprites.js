'use strict'; {

let exports = xxm.sprites = {};

exports.create = ($parent, spec, x, y) => {
    let $el = $('<div>').addClass('xxmSprite');

    xxm.cssVar.set(
        $el[0], 'spriteUrl', `url("${window.location}${spec.url}")`
    );

    xxm.cssVar.set($el[0], 'animDuration', spec.animDuration || '0.7s');
    xxm.cssVar.set($el[0], 'walkDuration', spec.walkDuration || '0.5s');

    xxm.cssVar.set($el[0], 'ssfc', spec.ssfc || 4);
    xxm.cssVar.set($el[0], 'ssfw', spec.ssfw || 32);
    xxm.cssVar.set($el[0], 'ssfh', spec.ssfh || 48);

    xxm.cssVar.set($el[0], 'ssx', spec.ssx || 0);
    xxm.cssVar.set($el[0], 'ssy', spec.ssy || 0);

    xxm.cssVar.set($el[0], 'ox', spec.ox || 0);
    xxm.cssVar.set($el[0], 'oy', spec.oy || 16);

    xxm.cssVar.set($el[0], 'x', x);
    xxm.cssVar.set($el[0], 'y', y);

    $el.css('z-index', y - 1);

    $parent.append($el);

    return $el;
};

}
