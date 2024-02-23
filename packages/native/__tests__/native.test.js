'use strict';

const native = require('..');
const assert = require('assert').strict;

assert.strictEqual(native(), 'Hello from native');
console.info('native tests passed');
