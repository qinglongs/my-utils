/** query 转 string，用于路由参数拼接 */
export declare function querystring(obj: Record<string, any>, encode?: boolean): string;
/** 是否数组 */
export declare const isArray: (value: any) => boolean;
/** 是否对象 */
export declare const isObject: (value: any) => boolean;
/** 是否字符串 */
export declare const isString: (value: any) => boolean;
/** 是否数字 */
export declare const isNumber: (value: any) => boolean;
/** 是否函数 */
export declare const isFunction: (value: any) => boolean;
/** 是否symbol */
export declare const isSymbol: (value: any) => boolean;
/** 是否布尔值 */
export declare const isBoolean: (value: any) => boolean;
/** 是否是空对象、空数组、空字符串或者是 null undefined */
export declare const isEmpty: (value: any) => boolean;
/** 值是否是formData */
export declare const isFormData: (val: any) => boolean;
export declare const isFullLink: (url: string) => boolean;
