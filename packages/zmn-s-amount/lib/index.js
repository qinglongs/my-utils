var numFixed = function (num1, decimalPlaces) {
    return (+num1).toFixed(decimalPlaces);
};
var numSlice = function (num, decimalPlaces) {
    var regex = new RegExp("\\.\\d{".concat(decimalPlaces, ",}$"));
    var tmp = num.toString().replace(regex, function (match) {
        return match.replace(/0+$/, "").replace(/\.$/, "");
    });
    return (+tmp).toFixed(decimalPlaces);
};
var splitThousand = function (num) {
    var tmp = (num || 0).toString();
    var parts = tmp.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
};
var amountSliceToYuan = function (amount, decimalPlaces) {
    if (decimalPlaces === void 0) { decimalPlaces = 2; }
    return numSlice(+amount / 100, decimalPlaces);
};
var amountSliceToFen = function (amount, decimalPlaces) {
    if (decimalPlaces === void 0) { decimalPlaces = 0; }
    return numSlice(+amount * 100, decimalPlaces);
};
var amountFixedToYuan = function (amount, decimalPlaces) {
    if (decimalPlaces === void 0) { decimalPlaces = 2; }
    return numFixed(+amount / 100, decimalPlaces);
};
var amountFixedToFen = function (amount, decimalPlaces) {
    if (decimalPlaces === void 0) { decimalPlaces = 0; }
    return numFixed(+amount * 100, decimalPlaces);
};
var amountSplitToArray = function (amount, decimalPlaces, type) {
    if (decimalPlaces === void 0) { decimalPlaces = 2; }
    if (type === void 0) { type = "F"; }
    var tmpAmount = type === "F"
        ? amountSliceToYuan(amount, decimalPlaces)
        : numSlice(amount, decimalPlaces);
    return tmpAmount.toString().split(".");
};

export { amountFixedToFen, amountFixedToYuan, amountSliceToFen, amountSliceToYuan, amountSplitToArray, numFixed, numSlice, splitThousand };
