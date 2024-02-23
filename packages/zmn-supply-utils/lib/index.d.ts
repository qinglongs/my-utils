/** query 转 string */
export declare function querystring(obj: Record<string, any>, encode?: boolean): string;
export declare const isArray: (value: any) => boolean;
export declare const isObject: (value: any) => boolean;
export declare const isString: (value: any) => boolean;
export declare const isNumber: (value: any) => boolean;
export declare const isFunction: (value: any) => boolean;
export declare const isSymbol: (value: any) => boolean;
export declare const isBoolean: (value: any) => boolean;
/** 是否是空对象、空数组、空字符串或者是 null undefined */
export declare const isEmpty: (value: any) => boolean;
/** 值是否是formData */
export declare const isFormData: (val: any) => boolean;
