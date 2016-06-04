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
    $body = $('body');

    let keyDirections = {
        37: 'L', 38: 'U',
        39: 'R', 40: 'D',
    };

    $body.keyup(ev => {
        if(keyDirection === keyDirections[ev.which]) {
            direction = keyDirection = 'none';
        }
    });

    $body.keydown(ev => {
        let newDirection = keyDirections[ev.which];

        if(!newDirection || newDirection === keyDirection) {
            return;
        }

        direction = keyDirection = newDirection;

        if(direction !== 'none') {
            $currentEl.addClass('xxmAnimate');
        }
    });
});

let raf = requestAnimationFrame;

function readGamepad() {
    raf(readGamepad);

    let pad = navigator.getGamepads()[0];

    if(!pad) {
        return;
    }

    let newDirection = 'none';

    let deadzone = 0.2;

    if(pad.axes[0] < -deadzone) {
        newDirection = 'L';
    }
    else
    if(pad.axes[0] > deadzone) {
        newDirection = 'R';
    }

    if(pad.axes[1] < -deadzone) {
        newDirection = 'U';
    }
    else
    if(pad.axes[1] > deadzone) {
        newDirection = 'D';
    }

    if(newDirection === keyDirection) {
        return;
    }

    direction = keyDirection = newDirection;

    if(direction !== 'none') {
        $currentEl.addClass('xxmAnimate');
    }
}

readGamepad();

function getCssVar(n, type) {
    return xxm.cssVar.get($currentEl[0], n, type);
}

function setCssVar(n, val) {
    xxm.cssVar.set($currentEl[0], n, val);
}

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
