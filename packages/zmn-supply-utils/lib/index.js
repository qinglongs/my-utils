/** query 转 string */
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
/** 值是否属于未定义 */
const isUndefined = (value1) => {
    return [undefined, null, ""].includes(value1);
};
/** 值是否是formData */
const isFormData = (val) => {
    return val instanceof FormData;
};

export { isFormData, isUndefined, querystring };
