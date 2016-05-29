'use strict';

let exports = xxm.cssVar = {};

exports.get = (el, name, type) => {
    let val = el.style.getPropertyValue(`--${name}`);

    switch(type) {
        case 'int': val = parseInt(val); break;
        case 'float': val = parseFloat(val); break;
        case undefined: break;

        default: throw new Error(`Invalid type: ${type}`);
    }

    return val;
};

exports.set = (el, name, val) => {
    let originalStyle = el.style.cssText.trim();

    if(originalStyle && !originalStyle.endsWith(';')) {
        originalStyle += ';';
    }

    let re = new RegExp(`((^| *;| )--${name} *): *([^(;|$)]+)`, 'g');
    let reRes = re.exec(originalStyle);

    if(!reRes) {
        el.style = originalStyle + ' --' + name + ': ' + val + ';';
    }
    else {
        el.style = originalStyle.replace(
            re, `$1: ${val}`
        );
    }
};
