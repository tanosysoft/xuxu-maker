'use strict';

xxm.setCssVar = (el, name, val) => {
    let originalStyle = el.style.cssText.trim();

    if(originalStyle && !originalStyle.endsWith(';')) {
        originalStyle += ';';
    }

    el.style = originalStyle + ' --' + name + ': ' + val + ';';
};
