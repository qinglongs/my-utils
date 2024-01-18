'use strict';

const zmnSAmount = require('..');
const assert = require('assert').strict;

assert.strictEqual(zmnSAmount.numFixed(2.555), 2.56);

console.info('numFixed tests passed');
