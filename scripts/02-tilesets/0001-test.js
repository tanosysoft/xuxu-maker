'use strict'; {

let exports = xxm.db.tilesets[1] = {};

exports.name = 'test';

exports.highTiles = [
    '10,0', '11,0', '12,0',
    '1,2', '3,2', '8,2', '9,2', '10,2', '11,2', '12,2',
];

let O = 'O';
let X = 'X';
let LR = 'LR';
let LRD = 'LRD';

exports.walkBlockages = [
    [O, LR, LR, LR, LR, X, O, O, X, X, O, O, O, O, O, O, O],
    [LRD, LR, LR, LR, LR, X, O, O, X, X, X, X, X, X, O, O, O],
    [O, O, X, O, X, O, O, X, O, O, O, O, O, O, O, O, O],
    [X, X, X, X, O, X, X, X, X, X, X, X, X, X, O, O, O],
];

}
