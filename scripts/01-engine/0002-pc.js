'use strict'; {

let exports = xxm.pc = {};

let $currentEl;

let keyDirection = 'none';
let direction = 'none';
let lastDirection = 'none';

exports.select = $el => {
    $currentEl = $el;

    $currentEl.on('transitionend', function() {
        let $this = $(this);

        $this.removeClass('xxmWalking');

        if(direction === 'none') {
            $this.removeClass('xxmAnimate');
        }

        if(lastDirection === 'D') {
            $this.css(
                'z-index', xxm.cssVar.get(this, 'y', 'int')
            );
        }
    });
};

let $body;

$(() => {
    xxm.pads.on('btnUp', btn => {
        if(keyDirection === btn) {
            direction = keyDirection = 'none';
        }
    });

    xxm.pads.on('btnDown', btn => {
        if(!'LURD'.includes(btn) || btn === keyDirection) {
            return;
        }

        direction = keyDirection = btn;

        if(direction !== 'none') {
            $currentEl.addClass('xxmAnimate');
        }
    });

    xxm.pads.on('btnDown', btn => {
        if(btn !== 'Z' || !$currentEl || $currentEl.is('.xxmWalking')) {
            return;
        }

        let [tx, ty] = xxm.tilemaps.walkCoordinates(
            xxm.cssVar.get($currentEl[0], 'x', 'int'),
            xxm.cssVar.get($currentEl[0], 'y', 'int'), {
                1: 'U', 0: 'D',
                3: 'L', 2: 'R',
            }[xxm.cssVar.get($currentEl[0], 'ssy', 'int')]
        );

        let $tSpr = $(xxm.sprites.filterByPos(
            $currentEl.siblings(), tx, ty
        ).toArray().find(spr => {
            let ev = $(spr).data('xxmParentEvent');
            return ev && ev.currentPage && ev.currentPage.trigger === 'action';
        }));

        if($tSpr.length === 0) {
            return;
        }

        let ev = $tSpr.data('xxmParentEvent');

        if(!ev.currentPage.exec) {
            return;
        }

        ev.currentPage.exec(ev);
    });
});

function getCssVar(n, type) {
    return xxm.cssVar.get($currentEl[0], n, type);
}

function setCssVar(n, val) {
    xxm.cssVar.set($currentEl[0], n, val);
}

let raf = requestAnimationFrame;

function control() {
    raf(control);

    if(!$currentEl || direction === 'none' || $currentEl.is('.xxmWalking')) {
        return;
    }

    lastDirection = direction;

    let x = getCssVar('x', 'int');
    let y = getCssVar('y', 'int');

    let $tiles = $currentEl.closest('.xxmTilemap').children('.xxmTile');

    let shouldMove = xxm.tilemaps.testWalk($tiles, x, y, direction);

    if(shouldMove && !$currentEl.is(':last-child')) {
        $currentEl.parent().append($currentEl);
        setTimeout(update, 0);
    }
    else {
        update();
    }

    function update() {
        switch(direction) {
            case 'L':
                setCssVar('ssy', 3);

                if(shouldMove) {
                    setCssVar('x', x - 1);
                }
                break;

            case 'U':
                setCssVar('ssy', 1);

                if(shouldMove) {
                    setCssVar('y', y - 1);
                    $currentEl.css('z-index', y - 1);
                }
                break;

            case 'R':
                setCssVar('ssy', 2);

                if(shouldMove) {
                    setCssVar('x', x + 1);
                }
                break;

            case 'D':
                setCssVar('ssy', 0);

                if(shouldMove) {
                    setCssVar('y', y + 1);
                }
                break;
        }

        if(shouldMove) {
            $currentEl.addClass('xxmWalking');
        }
        else {
            $currentEl.removeClass('xxmAnimate');
        }
    }
}

control();

}
