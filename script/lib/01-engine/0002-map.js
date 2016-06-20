'use strict'; {

let exports = xxm.map = {};

exports.load = ($parent, id) => {
    $parent.empty();

    let m = xxm.db.maps[id];

    if(!m) {
        throw new Error(`Map [${id}] does not exist.`);
    }

    let $mapLayer = xxm.layers.create($parent, 0);

    xxm.viewports.set($mapLayer);

    let $zoomLayer = xxm.layers.create($mapLayer, 0)
        .addClass('xxmZoom xxmPixelated');

    m.layers.forEach((l, i) => {
        let $l = xxm.layers.create($zoomLayer, l.z || 0);

        let $tm = xxm.tilemaps.create($l, l.tilesetId);

        if(i === 0 && m.bg) {
            $tm.css('background-image', `url("${m.bg}")`);
        }

        if(l.hero) {
            let h = l.hero;

            let $h = xxm.sprites.create(
                $tm, h.spritesetId, h.initialPos[0], h.initialPos[1]
            );

            $h.addClass('xxmHero');
        }

        xxm.cssVar.set($tm[0], { w: m.w, h: m.h });

        l.tilemap.forEach(t => {
            xxm.tilemaps.createTile($tm, t[0], t[1], t[2], t[3]);
        });

        Object.keys(l.events).forEach(i => {
            let evSpec = l.events[i];

            xxm.events.create({
                id: evSpec.name,

                $initialParent: $tm,
                initialPos: evSpec.initialPos,

                pages: evSpec.pages.map(p => {
                    let ret = {};

                    ret.name = p.name;

                    ret.spritesetId = p.spritesetId || 0;

                    if(!p.spritesetId && p.tsCoords) {
                        ret.tsCoords = p.tsCoords;
                    }

                    return ret;
                }),
            });
        });
    });

    if(m.init) {
        m.init($mapLayer);
    }

    return $mapLayer;
};

}
