'use strict'; {

let exports = xxm.typewriter = {};

exports.textSpd = 30;

let updateText = ($el, item, st) => {
    if(!item.lastTime) {
        item.i = 0;
        item.lastTime = Date.now();
    }

    let elapsed = Math.floor((Date.now() - item.lastTime) / 1000 * st.textSpd);

    if(elapsed < 1) {
        return;
    }

    item.lastTime = Date.now();

    let iLast = item.i;

    item.i += elapsed;

    $el.text($el.text() + item.text.slice(iLast, item.i));

    if(item.i >= item.text.length) {
        return true;
    }
};

exports.write = ($el, list) => {
    let deferred = Q.defer();

    let st = {
        textSpd: exports.textSpd,
    };

    $el.text('');

    (function thisFn() {
        let item = list[0];

        if(!item) {
            if(!$el.is('.xxmWaitCursor')) {
                deferred.resolve();
                return;
            }

            $el.addClass('xxmWaiting');

            xxm.pads.on('btnDown', function thisFn(btn) {
                if(btn !== 'Z') {
                    return;
                }

                xxm.pads.off('btnDown', thisFn);

                $el.removeClass('xxmWaiting');

                deferred.resolve();
            });

            return;
        }

        requestAnimationFrame(thisFn);

        if(typeof item !== 'object') {
            list[0] = item = {
                text: item.toString(),
                fn: updateText,
            };
        }

        if(item.fn($el, item, st)) {
            list.shift();
        }
    })();

    return deferred.promise;
};

}
