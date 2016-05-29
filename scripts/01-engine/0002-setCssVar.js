'use strict';

xxm.setCssVar = (el, name, val) => {
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
