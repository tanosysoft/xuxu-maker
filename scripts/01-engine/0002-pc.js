'use strict'; {

let exports = xxm.pc = {};

let $currentEl;

let direction = 'none';

exports.select = $el => {
    $currentEl = $el;

    $currentEl.on('transitionend', () => {
        $currentEl.removeClass('xxmWalking');

        if(direction === 'none') {
            $currentEl.removeClass('xxmAnimate');
        }
    });
};

let $body;

$(() => {
    $body = $('body');

    let keyDirections = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    };

    $body.keyup(ev => {
        console.log(direction, keyDirections[ev.which]);
        if(direction === keyDirections[ev.which]) {
            direction = 'none';
        }
    });

    $body.keydown(ev => {
        direction = keyDirections[ev.which] || 'none';

        if(direction !== 'none') {
            $currentEl.addClass('xxmAnimate');
        }
    });
});

let raf = requestAnimationFrame;

function getCssVar(n) {
    return $currentEl[0].style.getPropertyValue(`--${n}`).trim();
}

function setCssVar(n, val) {
    xxm.setCssVar($currentEl[0], n, val);
}

function control() {
    raf(control);

    if(!$currentEl || $currentEl.is('.xxmWalking')) {
        return;
    }

    let x = parseInt(getCssVar('x'));
    let y = parseInt(getCssVar('y'));

    switch(direction) {
        case 'left':
            setCssVar('x', x - 1);
            setCssVar('ssy', 3);
            break;

        case 'up':
            setCssVar('y', y - 1);
            setCssVar('ssy', 1);
            break;

        case 'right':
            setCssVar('x', x + 1);
            setCssVar('ssy', 2);
            break;

        case 'down':
            setCssVar('y', y + 1);
            setCssVar('ssy', 0);
            break;
    }

    if(direction !== 'none') {
        $currentEl.addClass('xxmWalking');
    }
}

control();

}
