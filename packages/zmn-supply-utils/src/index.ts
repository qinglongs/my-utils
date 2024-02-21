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

/** 值是否属于未定义 */
export const isUndefined = (value1: any) => {
  return [undefined, null, ""].includes(value1);
};

/** 值是否是formData */
export const isFormData = (val: any) => {
  return val instanceof FormData;
};
