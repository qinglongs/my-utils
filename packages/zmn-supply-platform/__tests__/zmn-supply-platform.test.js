import { platform } from '../lib/index';
const assert = require('assert').strict;

assert.strictEqual(platform(), '平台');
console.info('platform tests passed');
