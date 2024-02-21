'use strict';

import { querystring, isUndefined } from '../lib/index';
const assert = require('assert').strict;

assert.strictEqual(querystring({ a: 2, b: 1, c: 'helloWord' }), 'a=2&b=1&c=helloWord');
console.info('querystring tests passed');
