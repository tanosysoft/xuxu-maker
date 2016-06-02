'use strict'; {

let exports = xxm.sprites = {};

xxm.domWatcher.watch({
    added: true,
    attr: 'spriteset-id',
    is: '.xxmSprite',

    fn: (el, ev) => {
        let $el = $(el);

        let ssId = $el.attr('spriteset-id');
        let ss = xxm.db.spritesets[ssId];

        xxm.cssVar.set(el, {
            spritesetUrl: `url("${window.location}spritesets/${ss.name}.png")`,

            ssfw: (ss.frameWidth || 32) + 'px',
            ssfh: (ss.frameHeight || 38) + 'px',

            ox: (ss.originX || 0) + 'px',
            oy: (ss.originY || 0) + 'px',

            ssfc: ss.frameCount || 4,
        });

        if(ev === 'added') {
            xxm.cssVar.setIfUnset(el, {
                ssx: 0,
                ssy: 0,

                animDuration: ss.defaultAnimDuration || '0.7s',
                walkDuration: ss.defaultWalkDuration || '0.5s',
            });
        }
    }
});

exports.create = ($parent, ssId, x, y) => {
    let $el = $('<div>')
        .addClass('xxmSprite')
        .attr('spriteset-id', ssId);

    xxm.cssVar.set($el[0], { x, y });

    $el.css('z-index', y);

    $parent.append($el);

    return $el;
};

}
