'use strict'; {

let exports = xxm.tilemaps = {};

$(() => {
    ['tw', 'th'].forEach(
        n => xxm.setCssVar(document.body, n, '32px')
    );
});

exports.create = ($parent, url) => {
    let $el = $('<div>').addClass('xxmTilemap');

    if(url) {
        if(!/^(http|https):\/\//.test(url)) {
            url = window.location + url;
        }

        xxm.setCssVar($el[0], 'tilemap-url', 'url("' + url + '")');
    }

    $parent.append($el);

    return $el;
};

exports.createTile = ($parent, tsx, tsy, x, y) => {
    let $el = $('<div>').addClass('xxmTile');

    let attrs = { tsx, tsy, x, y };

    for(let n in attrs) {
        xxm.setCssVar($el[0], n, attrs[n]);
    }

    $parent.append($el);

    return $el;
};

}
