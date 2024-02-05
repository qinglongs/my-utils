
import * as zmnSAmount from '../lib/index.js';
import assert from 'assert';
const strictAssert = assert.strict;


strictAssert.strictEqual(zmnSAmount.numFixed(2.555), '2.56');
strictAssert.strictEqual(zmnSAmount.numFixed(2.5, 2), '2.50');
strictAssert.strictEqual(zmnSAmount.numFixed(2.5555, 3), '2.556');
strictAssert.strictEqual(zmnSAmount.numFixed(2.44456, 4), '2.4446');
console.info('numFixed 测试通过');

strictAssert.strictEqual(zmnSAmount.amountFixedToFen(100), '10000')
strictAssert.strictEqual(zmnSAmount.amountFixedToFen(15.22, 3), '1522.000')
console.info('amountFixedToFen 测试通过');

strictAssert.strictEqual(zmnSAmount.amountFixedToYuan(10000), '100.00')
strictAssert.strictEqual(zmnSAmount.amountFixedToYuan(10000, 3), '100.000')
strictAssert.strictEqual(zmnSAmount.amountFixedToYuan(5645, 3), '56.450')
console.info('amountFixedToYuan 测试通过');

strictAssert.strictEqual(zmnSAmount.numSlice(10000), '10000.00')
strictAssert.strictEqual(zmnSAmount.numSlice(5.5555, 2), '5.55')
strictAssert.strictEqual(zmnSAmount.numSlice(4.6666, 3), '4.666')
strictAssert.strictEqual(zmnSAmount.numSlice(5.7777, 3), '5.777')
strictAssert.strictEqual(zmnSAmount.numSlice(5.3333, 3), '5.333')
console.info('numSlice 测试通过');


strictAssert.strictEqual(zmnSAmount.amountFixedToYuan(10000), '100.00')
strictAssert.strictEqual(zmnSAmount.amountFixedToYuan(5555, 2), '55.55')
strictAssert.strictEqual(zmnSAmount.amountFixedToYuan(2345, 3), '23.450')
strictAssert.strictEqual(zmnSAmount.amountFixedToYuan(10, 3), '0.100')
strictAssert.strictEqual(zmnSAmount.amountFixedToYuan(2, 5), '0.02000')
console.info('amountFixedToYuan 测试通过');

strictAssert.strictEqual(zmnSAmount.amountSliceToFen(10), '1000')
strictAssert.strictEqual(zmnSAmount.amountSliceToFen(5.55555, 2), '555.55')
strictAssert.strictEqual(zmnSAmount.amountSliceToFen(45.23456, 3), '4523.456')
strictAssert.strictEqual(zmnSAmount.amountSliceToFen(10, 3), '1000.000')
strictAssert.strictEqual(zmnSAmount.amountSliceToFen(2, 4), '200.0000')
console.info('amountSliceToFen 测试通过');


assert.equal(zmnSAmount.amountSplitToArray(10.12, 0, 'Y'), '10')
assert.equal(zmnSAmount.amountSplitToArray(10.12, 1, 'Y'), '10,1')
assert.equal(zmnSAmount.amountSplitToArray(10.12, 2, 'Y'), '10,12')
assert.equal(zmnSAmount.amountSplitToArray(10000), '100,00')
assert.equal(zmnSAmount.amountSplitToArray(45.678910), '0,45')
assert.equal(zmnSAmount.amountSplitToArray(4455.678910), '44,55')

console.info('amountSplitToArray 测试通过');


strictAssert.strictEqual(zmnSAmount.splitThousand(10), '10')
strictAssert.strictEqual(zmnSAmount.splitThousand(5555555), '5,555,555')
strictAssert.strictEqual(zmnSAmount.splitThousand(12345678), '12,345,678')
strictAssert.strictEqual(zmnSAmount.splitThousand(25654.23456), '25,654.23456')
strictAssert.strictEqual(zmnSAmount.splitThousand(1233356456), '1,233,356,456')
console.info('splitThousand 测试通过');