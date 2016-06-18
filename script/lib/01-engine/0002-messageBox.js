'use strict'; {

let exports = xxm.messageBox = {};

exports.show = ($parent, list) => {
    let $el = xxm.window.create($parent);

    let promise = xxm.typewriter.write($el, list).then(() => {
        $el.remove();
    });

    return [$el, promise];
};

}
