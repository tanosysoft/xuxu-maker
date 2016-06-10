'use strict'; {

let exports = xxm.cssAnimations = {};

exports.add = (el, classes) => {
    classes = `animated ${classes}`;

    $(el)
        .addClass(classes)
        .one('animationend', ev => {
            $(ev.target).removeClass(classes);
        });
};

}
