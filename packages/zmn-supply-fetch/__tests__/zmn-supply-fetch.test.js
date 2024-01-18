'use strict';

const zmnSupplyFetch = require('..');
const assert = require('assert').strict;

assert.strictEqual(zmnSupplyFetch(), 'Hello from zmnSupplyFetch');
console.info('zmnSupplyFetch tests passed');
