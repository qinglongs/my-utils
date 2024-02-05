/**
 * @method 四舍五入
 * @param num 传入数值
 * @param decimalPlaces 保留小数位数
 */
var numFixed = function (num1, decimalPlaces) {
    if (decimalPlaces === void 0) { decimalPlaces = 2; }
    var i = decimalPlaces - 1;
    var result = Math.round(+(+num1 * +"10e".concat(i)).toPrecision(15)) / +"10e".concat(i);
    return result.toFixed(decimalPlaces);
};
/**
 * @method 小数截取
 * @param num 传入数值
 * @param decimalPlaces 保留小数位数
 */
var numSlice = function (num, decimalPlaces) {
    if (decimalPlaces === void 0) { decimalPlaces = 2; }
    var i = decimalPlaces - 1;
    var result = Math.floor(+(+num * +"10e".concat(i)).toPrecision(15)) / +"10e".concat(i);
    return decimalPlaces !== undefined ? result.toFixed(decimalPlaces) : result;
};
/**
 * @method 数字千分位分割
 * @param num 传入数值
 */
var splitThousand = function (num) {
    var tmp = (num || 0).toString();
    var parts = tmp.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
};
/**
 * @method 金额转换分转元截取
 * @param amount 传入金额
 * @param decimalPlaces 保留小数位数
 */
var amountSliceToYuan = function (amount, decimalPlaces) {
    if (decimalPlaces === void 0) { decimalPlaces = 2; }
    return numSlice(+amount / 100, decimalPlaces);
};
/**
 * @method 金额转换元转分截取1
 * @param amount 传入金额
 * @param decimalPlaces 保留小数位数
 */
var amountSliceToFen = function (amount, decimalPlaces) {
    if (decimalPlaces === void 0) { decimalPlaces = 0; }
    return numSlice(+amount * 100, decimalPlaces);
};
/**
 * @method  金额转换分转元四舍五入
 * @param amount 传入金额
 * @param decimalPlaces 保留小数位数
 */
var amountFixedToYuan = function (amount, decimalPlaces) {
    if (decimalPlaces === void 0) { decimalPlaces = 2; }
    return numFixed(+amount / 100, decimalPlaces);
};
/**
 * @method 金额转换元转分四舍五入
 * @param amount 传入金额
 * @param decimalPlaces 保留小数位数
 */
var amountFixedToFen = function (amount, decimalPlaces) {
    if (decimalPlaces === void 0) { decimalPlaces = 0; }
    return numFixed(+amount * 100, decimalPlaces);
};
/**
 * @method 将金额分割成数组，不进行四舍五入,默认传入单位为分
 * @param amount 传入金额
 * @param decimalPlaces 保留小数位数
 * @param type 表示传入金额是分还是元
 *  */
var amountSplitToArray = function (amount, decimalPlaces, type) {
    if (decimalPlaces === void 0) { decimalPlaces = 2; }
    if (type === void 0) { type = "F"; }
    var tmpAmount = type === "F"
        ? amountSliceToYuan(amount, decimalPlaces)
        : numSlice(amount, decimalPlaces);
    return tmpAmount.toString().split(".");
};

export { amountFixedToFen, amountFixedToYuan, amountSliceToFen, amountSliceToYuan, amountSplitToArray, numFixed, numSlice, splitThousand };
