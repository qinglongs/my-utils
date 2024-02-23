/** query 转 string，用于路由参数拼接 */
function querystring(obj, encode = false) {
    const str = [];
    for (const i in obj) {
        if (Reflect.has(obj, i) && !encode) {
            str.push(`${i}=${obj[i]}`);
        }
        else {
            str.push(`${encodeURIComponent(i)}=${encodeURIComponent(obj[i])}`);
        }
    }
    return str.join("&");
}
/** 是否数组 */
const isArray = (value) => {
    return Object.prototype.toString.call(value) === "[object Array]";
};
/** 是否对象 */
const isObject = (value) => {
    return Object.prototype.toString.call(value) === "[object Object]";
};
/** 是否字符串 */
const isString = (value) => {
    return Object.prototype.toString.call(value) === "[object String]";
};
/** 是否数字 */
const isNumber = (value) => {
    return Object.prototype.toString.call(value) === "[object Number]";
};
/** 是否函数 */
const isFunction = (value) => {
    return Object.prototype.toString.call(value) === "[object Function]";
};
/** 是否symbol */
const isSymbol = (value) => {
    return Object.prototype.toString.call(value) === "[object Symbol]";
};
/** 是否布尔值 */
const isBoolean = (value) => {
    return Object.prototype.toString.call(value) === "[object Boolean]";
};
/** 是否是空对象、空数组、空字符串或者是 null undefined */
const isEmpty = (value) => {
    if (isArray(value)) {
        return value.length === 0;
    }
    if (isObject(value)) {
        return Object.keys(value).length === 0;
    }
    return [undefined, null, ""].includes(value);
};
/** 值是否是formData */
const isFormData = (val) => {
    return val instanceof FormData;
};

export { isArray, isBoolean, isEmpty, isFormData, isFunction, isNumber, isObject, isString, isSymbol, querystring };
