'use strict'; {

let exports = xxm.pads = {};

let evListeners = {
    btnDown: new Set(),
    btnUp: new Set(),
};

exports.on = (ev, fn) => {
    evListeners[ev].add(fn);
};

let pad = exports[0] = {};

pad.btnsDown = {};

let btnDown = btn => {
    if(pad.btnsDown[btn]) {
        return;
    }

    pad.btnsDown[btn] = true;

    Array.from(evListeners.btnDown.values()).forEach(
        fn => fn(btn, 0)
    );
};

let btnUp = btn => {
    if(!pad.btnsDown[btn]) {
        return;
    }

    pad.btnsDown[btn] = false;

    Array.from(evListeners.btnUp.values()).forEach(
        fn => fn(btn, 0)
    );
};

$(() => {
    let kbMappings = {
        37: 'L', 38: 'U',
        39: 'R', 40: 'D',

        81: 'Q', 87: 'W',
        65: 'A', 83: 'S',
        90: 'Z', 88: 'X',

        32: 'ST', 13: 'SL',
    };

    $('body').on('keydown keyup', ev => {
        if(pad.gpad) {
            return;
        }

        let btn = kbMappings[ev.which];

        if(!btn) {
            return;
        }

        if(ev.type === 'keydown') {
            btnDown(btn);
        }
        else {
            btnUp(btn);
        }
    });
});

{
    pad.deadzone = 0.2;

    let raf = requestAnimationFrame;

    let btnMappings = {
        4: 'Q', 6: 'W',
        3: 'A', 0: 'S',
        2: 'Z', 1: 'X',

        9: 'ST', 8: 'SL',
    };

    let readGamepad = function fn() {
        raf(fn);

        let gpad = navigator.getGamepads()[0];

        if(!gpad) {
            pad.gpad = false;
            return;
        }

        pad.gpad = true;

        if(gpad.axes[0] < -pad.deadzone) {
            btnUp('R'); btnDown('L');
        }
        else
        if(gpad.axes[0] > pad.deadzone) {
            btnUp('L'); btnDown('R');
        }
        else {
            btnUp('L'); btnUp('R');
        }

        if(gpad.axes[1] < -pad.deadzone) {
            btnUp('D'); btnDown('U');
        }
        else
        if(gpad.axes[1] > pad.deadzone) {
            btnUp('U'); btnDown('D');
        }
        else {
            btnUp('U'); btnUp('D');
        }

        gpad.buttons.forEach((st, i) => {
            let btn = btnMappings[i];

            if(!btn) {
                return;
            }

            st.pressed? btnDown(btn) : btnUp(btn);
        });
    };

    readGamepad();
}

}
