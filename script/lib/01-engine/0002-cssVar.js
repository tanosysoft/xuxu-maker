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

exports.set = function() {
    let args = xxm.overloaded(arguments, {
        2: ['el', 'hash'],
        3: ['el', 'name', 'val'],
    });

    let el = args.el;

    if(args.hash) {
        Object.keys(args.hash).forEach(
            k => exports.set(el, k, args.hash[k])
        );

        return;
    }

    let { name, val } = args;

    let originalStyle = el.style.cssText.trim();

    if(originalStyle && !originalStyle.endsWith(';')) {
        originalStyle += ';';
    }

    let re = new RegExp(`((^| *;| )--${name} *): *([^;$]+)`, 'g');
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

exports.setIfUnset = function() {
    let args = xxm.overloaded(arguments, {
        2: ['el', 'hash'],
        3: ['el', 'name', 'val'],
    });

    let el = args.el;

    if(args.hash) {
        Object.keys(args.hash).forEach(
            k => exports.setIfUnset(el, k, args.hash[k])
        );

        return;
    }

    let name = args.name;

    if(exports.get(el, name) !== '') {
        return;
    }

    exports.set(el, name, args.val);
};

exports.unset = (el, name) => {
    if(Array.isArray(name)) {
        name.forEach(name => {
            exports.unset(el, name);
        });

        return;
    }

    let originalStyle = el.style.cssText.trim();

    if(originalStyle && !originalStyle.endsWith(';')) {
        originalStyle += ';';
    }

    let re = new RegExp(`((^| *;| )--${name} *): *([^;$]+)`, 'g');
    let reRes = re.exec(originalStyle);

    if(reRes) {
        el.style = originalStyle.replace(re, '');
    }
};
