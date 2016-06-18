'use strict'; {

let exports = xxm.sprites = {};

xxm.domWatcher.watch({
    added: true,
    attr: 'spriteset-id',
    is: '.xxmSprite',

    fn: (el, ev) => {
        let $el = $(el);

        let ssId = parseInt($el.attr('spriteset-id'));
        let ss = xxm.db.spritesets[ssId];

        if(!ss) {
            if(ssId !== 0) {
                console.error(`Invalid spriteset ID: ${ssId}`);
            }

            ss = {
                name: 'null',

                frameWidth: 32,
                frameHeight: 32,
                frameCount: 1,

                solid: false,
            };
        }

        if(ss.name !== 'null') {
            xxm.cssVar.set(
                el, 'spritesetUrl', 'url("' +
                    xxm.fullUrl(`data/spriteset/${ss.name}.png`) +
                '")'
            );
        }

        xxm.cssVar.set(el, {
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

        $el[ss.solid? 'addClass' : 'removeClass']('xxmSolid');
    }
});

exports.create = ($parent, ssId, x, y) => {
    let $el = $('<div>')
        .addClass('xxmSprite')
        .attr('spriteset-id', ssId);

    xxm.cssVar.set($el[0], { x, y });

    $el.css('z-index', y);

    $el.append($('<div>').addClass('xxmSpriteInternal'));

    $parent.append($el);

    return $el;
};

exports.filterByPos = ($sprs, x, y) => {
    return $sprs.filter((i, spr) =>
        x === xxm.cssVar.get(spr, 'x', 'int')
        && y === xxm.cssVar.get(spr, 'y', 'int')
    );
};

exports.testWalk = ($sprs, x, y, d) => {
    let [nx, ny] = xxm.tilemaps.walkCoordinates(x, y, d);

    return (exports.filterByPos($sprs, nx, ny).length === 0);
};

}
