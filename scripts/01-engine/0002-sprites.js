'use strict'; {

let exports = xxm.sprites = {};

exports.create = ($parent, ssId, x, y) => {
    let $el = $('<div>').addClass('xxmSprite');

    let ss = xxm.db.spritesets[ssId];

    xxm.cssVar.set($el[0], {
        spritesetUrl: `url("${window.location}spritesets/${ss.name}.png")`,

        ssfw: (ss.frameWidth || 32) + 'px',
        ssfh: (ss.frameHeight || 38) + 'px',

        ox: (ss.originX || 0) + 'px',
        oy: (ss.originY || 0) + 'px',

        ssx: 0,
        ssy: 0,

        ssfc: ss.frameCount || 4,

        animDuration: ss.defaultAnimDuration || '0.7s',
        walkDuration: ss.defaultWalkDuration || '0.5s',

        x, y,
    });

    $el.css('z-index', y - 1);

    $parent.append($el);

    return $el;
};

}
