'use strict';

let glob = require('glob');

let path = require('path');
let relPath = path.relative;

let h = require('hyperscript');

let rootDir = __dirname;

module.exports = glob.sync(rootDir + '/style/**/*.css').map(
    path => h('link', {
        rel: 'stylesheet',
        href: relPath(rootDir, path),
    })
);
