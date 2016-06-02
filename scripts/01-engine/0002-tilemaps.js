'use strict'; {

let exports = xxm.tilemaps = {};

$(() => {
    ['tw', 'th'].forEach(
        n => xxm.cssVar.set(document.body, n, '32px')
    );
});

exports.create = ($parent, tilesetId) => {
    let $el = $('<div>').addClass('xxmTilemap');

    let tileset = xxm.db.tilesets[tilesetId];

    xxm.cssVar.set($el[0], {
        tilesetId,
        tilesetUrl: `url("${window.location}tilesets/${tileset.name}.png")`,
    });

    $parent.append($el);

    return $el;
};

exports.createTile = ($parent, tsx, tsy, x, y) => {
    let $el = $('<div>').addClass('xxmTile');

    let attrs = { tsx, tsy, x, y };

    for(let n in attrs) {
        xxm.cssVar.set($el[0], n, attrs[n]);
    }

    let $tm = $parent.closest('.xxmTilemap').addBack('.xxmTilemap');

    let tsId = xxm.cssVar.get($tm[0], 'tilesetId', 'int');
    let ts = xxm.db.tilesets[tsId];

    if(ts.highTiles.includes(`${tsx},${tsy}`)) {
        $el.css('z-index', 'calc(var(--y) + 1)');
    }
    else
    if(ts.highTiles.includes(`${tsx},${tsy - 1}`)) {
        $el.css('z-index', 'var(--y)');
    }

    $parent.append($el);

    return $el;
};

exports.filterTilesByPos = ($tiles, x, y) => {
    return $tiles.filter((i, t) => {
        return x === xxm.cssVar.get(t, 'x', 'int')
        && y === xxm.cssVar.get(t, 'y', 'int')
    });
};

exports.tileWalkBlockages = $tile => {
    let tsId = xxm.cssVar.get(
        $tile.closest('.xxmTilemap')[0], 'tilesetId', 'int'
    );

    let ts = xxm.db.tilesets[tsId];

    let tsx = parseInt($tile[0].style.getPropertyValue('--tsx'));
    let tsy = parseInt($tile[0].style.getPropertyValue('--tsy'));

    let r = ts.walkBlockages[tsy];

    if(!r) {
        return 'O';
    }

    return r[tsx] || 'O';
};

exports.walkCoordinates = (x, y, direction) => {
    let nx = x;
    let ny = y;

    switch(direction) {
        case 'L': --nx; break;
        case 'U': --ny; break;
        case 'R': ++nx; break;
        case 'D': ++ny; break;
    }

    return [nx, ny];
};

exports.flipDirection = d => {
    return {
        L: 'R', U: 'D',
        R: 'L', D: 'U',
    }[d];
};

exports.testWalk = ($tiles, x, y, d) => {
    let $xyTiles = exports.filterTilesByPos($tiles, x, y);

    let xydBlocked = $xyTiles.toArray().some(t => {
        let b = exports.tileWalkBlockages($(t));
        return b === 'X' || b.includes(d);
    });

    if(xydBlocked) {
        return false;
    }

    let [nx, ny] = exports.walkCoordinates(x, y, d);

    let $nxnyTiles = exports.filterTilesByPos($tiles, nx, ny);

    let dFlipped = exports.flipDirection(d);

    let nxnydBlocked = $nxnyTiles.toArray().some(t => {
        let b = exports.tileWalkBlockages($(t));
        return b === 'X' || b.includes(dFlipped);
    });

    return !nxnydBlocked;
};

}
