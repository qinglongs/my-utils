/** query 转 string，用于路由参数拼接 */
export function querystring(obj: Record<string, any>, encode = false) {
  const str = [];
  for (const i in obj) {
    if (Reflect.has(obj, i) && !encode) {
      str.push(`${i}=${obj[i]}`);
    } else {
      str.push(`${encodeURIComponent(i)}=${encodeURIComponent(obj[i])}`);
    }
  }
  return str.join("&");
}

/** 是否数组 */
export const isArray = (value: any) => {
  return Object.prototype.toString.call(value) === "[object Array]";
};

/** 是否对象 */
export const isObject = (value: any) => {
  return Object.prototype.toString.call(value) === "[object Object]";
};

/** 是否字符串 */
export const isString = (value: any) => {
  return Object.prototype.toString.call(value) === "[object String]";
};

/** 是否数字 */
export const isNumber = (value: any) => {
  return Object.prototype.toString.call(value) === "[object Number]";
};

/** 是否函数 */
export const isFunction = (value: any) => {
  return Object.prototype.toString.call(value) === "[object Function]";
};

/** 是否symbol */
export const isSymbol = (value: any) => {
  return Object.prototype.toString.call(value) === "[object Symbol]";
};

/** 是否布尔值 */
export const isBoolean = (value: any) => {
  return Object.prototype.toString.call(value) === "[object Boolean]";
};

/** 是否是空对象、空数组、空字符串或者是 null undefined */
export const isEmpty = (value: any) => {
  if (isArray(value)) {
    return value.length === 0;
  }

  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }

  return [undefined, null, ""].includes(value);
};

/** 值是否是formData */
export const isFormData = (val: any) => {
  return val instanceof FormData;
};
