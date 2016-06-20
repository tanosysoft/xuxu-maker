'use strict'; {

let exports = xxm.tilemaps = {};

xxm.domWatcher.watch({
    added: true,
    attr: 'tileset-id',
    is: '.xxmTilemap',

    fn: (el, ev) => {
        let $el = $(el);

        let tsId = parseInt($el.attr('tileset-id'));
        let ts = xxm.db.tilesets[tsId];

        xxm.cssVar.set(
            el, 'tilesetUrl', 'url("' +
                xxm.fullUrl(`data/tileset/${ts.name}.png`) +
            '")'
        );
    }
});

xxm.domWatcher.watch({
    added: true,
    attr: 'style',
    is: '.xxmTile',

    fn: (el, ev) => {
        let tsx = xxm.cssVar.get(el, 'tsx', 'int');
        let tsy = xxm.cssVar.get(el, 'tsy', 'int');

        if(
            el.oldTsx === tsx
            && el.oldTsy === tsy
        ) {
            return;
        }

        el.oldTsx = tsx;
        el.oldTsy = tsy;

        let $el = $(el);

        let tsId = parseInt($el.closest('.xxmTilemap').attr('tileset-id'));
        let ts = xxm.db.tilesets[tsId];

        if(ts.highTiles.includes(`${tsx},${tsy}`)) {
            $el.css('z-index', 'calc(var(--y) + 1)');
        }
        else
        if(ts.highTiles.includes(`${tsx},${tsy - 1}`)) {
            $el.css('z-index', 'var(--y)');
        }
        else {
            $el.css('z-index', '');
        }
    }
});

exports.create = ($parent, tilesetId) => {
    let $el = $('<div>')
        .addClass('xxmTilemap')
        .attr('tileset-id', tilesetId);

    $parent.append($el);

    return $el;
};

exports.createTile = ($parent, tsx, tsy, x, y) => {
    let $el = $('<div>').addClass('xxmTile');

    xxm.cssVar.set($el[0], { tsx, tsy, x, y });

    $parent.append($el);

    return $el;
};

exports.setTile = ($el, tsx, tsy) => {
    $el = $($el);

    $el.addClass('xxmTile');

    xxm.cssVar.set($el[0], { tsx, tsy });

    return $el;
};

exports.unsetTile = $el => {
    $el.removeClass('xxmTile');

    xxm.cssVar.unset($el[0], ['tsx', 'tsy']);
};

exports.filterTilesByPos = ($tiles, x, y) => {
    return $tiles.filter((i, t) => {
        return x === xxm.cssVar.get(t, 'x', 'int')
        && y === xxm.cssVar.get(t, 'y', 'int')
    });
};

exports.tileWalkBlockages = $tile => {
    let tsId = parseInt($tile.closest('.xxmTilemap').attr('tileset-id'));

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
    let [nx, ny] = exports.walkCoordinates(x, y, d);

    if(nx < 0 || ny < 0) {
        return false;
    }

    let $xyTiles = exports.filterTilesByPos($tiles, x, y);

    let xydBlocked = $xyTiles.toArray().some(t => {
        let b = exports.tileWalkBlockages($(t));
        return b === 'X' || b.includes(d);
    });

    if(xydBlocked) {
        return false;
    }

    let $nxnyTiles = exports.filterTilesByPos($tiles, nx, ny);

    let dFlipped = exports.flipDirection(d);

    let nxnydBlocked = $nxnyTiles.toArray().some(t => {
        let b = exports.tileWalkBlockages($(t));
        return b === 'X' || b.includes(dFlipped);
    });

    return !nxnydBlocked;
};

}
