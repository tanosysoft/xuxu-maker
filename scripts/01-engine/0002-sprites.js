'use strict'; {

let exports = xxm.sprites = {};

exports.create = ($parent, spec, x, y) => {
    let $el = $('<div>').addClass('xxmSprite');

    xxm.setCssVar(
        $el[0], 'sprite-url', `url("${window.location}${spec.url}")`
    );

    xxm.setCssVar($el[0], 'anim-duration', spec.animDuration || '0.7s');
    xxm.setCssVar($el[0], 'walk-duration', spec.walkDuration || '0.5s');

    xxm.setCssVar($el[0], 'ssfc', spec.ssfc || 4);
    xxm.setCssVar($el[0], 'ssfw', spec.ssfw || 32);
    xxm.setCssVar($el[0], 'ssfh', spec.ssfh || 48);

    xxm.setCssVar($el[0], 'ssx', spec.ssx || 0);
    xxm.setCssVar($el[0], 'ssy', spec.ssy || 0);

    xxm.setCssVar($el[0], 'ox', spec.ox || 0);
    xxm.setCssVar($el[0], 'oy', spec.oy || 16);

    xxm.setCssVar($el[0], 'x', x);
    xxm.setCssVar($el[0], 'y', y);

    $parent.append($el);

    return $el;
};

}
