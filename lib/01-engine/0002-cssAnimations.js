'use strict'; {

let exports = xxm.cssAnimations = {};

exports.add = (el, classes, duration, repeat) => {
    classes = `animated ${classes}`;

    $(el)
        .css('animation-duration', duration || '1s')
        .css('animation-iteration-count', repeat || 1)
        .addClass(classes)
        .one('animationend', ev => {
            $(ev.target).removeClass(classes);
        });
};

}
