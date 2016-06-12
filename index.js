'use strict';

let h = require('hyperscript');

let scriptTags = require('./scriptTags');
let stylesheetLinkTags = require('./stylesheetLinkTags');

console.log('<!doctype html>');
console.log('<meta charset="utf-8">');

console.log(h('script', {
    src: 'https://code.jquery.com/jquery-2.2.4.js'
}).outerHTML);

console.log(h('script', {
    src: 'https://cdnjs.cloudflare.com/ajax/libs/q.js/1.4.1/q.min.js'
}).outerHTML);

[...scriptTags, ...stylesheetLinkTags].forEach(
    el => console.log(el.outerHTML)
);
