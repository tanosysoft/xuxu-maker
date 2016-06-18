'use strict';

let glob = require('glob');

let path = require('path');
let relPath = path.relative;

let h = require('hyperscript');

let rootDir = __dirname;

module.exports = glob.sync(rootDir + '/script/lib/**/*.js').map(
    path => h('script', {
        src: relPath(rootDir, path),
    })
);
