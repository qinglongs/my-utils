/** query 转 string */
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

export const isArray = (value: any) => {
  return Object.prototype.toString.call(value) === "[object Array]";
};

export const isObject = (value: any) => {
  return Object.prototype.toString.call(value) === "[object Object]";
};

export const isString = (value: any) => {
  return Object.prototype.toString.call(value) === "[object String]";
};

export const isNumber = (value: any) => {
  return Object.prototype.toString.call(value) === "[object Number]";
};

export const isFunction = (value: any) => {
  return Object.prototype.toString.call(value) === "[object Function]";
};

export const isSymbol = (value: any) => {
  return Object.prototype.toString.call(value) === "[object Symbol]";
};

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
