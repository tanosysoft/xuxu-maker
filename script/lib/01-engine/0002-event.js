'use strict'; {

let exports = xxm.events = {};

exports.active = {};

exports.clear = () => {
    exports.active = {};
};

let updateEvent = ev => {
    let currentPage = ev.pages.find(
        page => !page.checkConditions || page.checkConditions(ev)
    );

    if(currentPage === ev.currentPage) {
        return;
    }

    ev.currentPage = currentPage;

    if(!currentPage) {
        if(ev.$spr) {
            ev.$spr.remove();
            delete ev.$spr;
        }

        return;
    }

    if(ev.$spr) {
        ev.$spr.attr('spriteset-id', currentPage.spritesetId);
    }
    else {
        ev.$spr = xxm.sprites.create(
            ev.$initialParent,
            currentPage.spritesetId,
            ev.initialPos[0],
            ev.initialPos[1]
        );

        ev.$spr.addClass(`xxmEv${ev.id}`);
    }

    if(!currentPage.spritesetId && currentPage.tsCoords) {
        xxm.tilemaps.setTile(
            ev.$spr, currentPage.tsCoords[0], currentPage.tsCoords[1]
        );
    }
    else {
        xxm.tilemaps.unsetTile(ev.$spr);
    }

    ev.$spr.data('xxmParentEvent', ev);
};

(function thisFn() {
    requestAnimationFrame(thisFn);

    Object.keys(exports.active).forEach(
        k => updateEvent(exports.active[k])
    );
})();

exports.create = ev => {
    exports.active[ev.id] = ev;

    updateEvent(ev);

    return ev;
};

exports.pageByName = (ev, pageName) => {
    return ev.pages.find(page => {
        return (page.name === pageName);
    });
};

}
