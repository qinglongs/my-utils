/**
 * @method 四舍五入
 * @param num 传入数值
 * @param decimalPlaces 保留小数位数
 */
export declare const numFixed: (num1: string | number, decimalPlaces?: number) => string;
/**
 * @method 小数截取
 * @param num 传入数值
 * @param decimalPlaces 保留小数位数
 */
export declare const numSlice: (num: string | number, decimalPlaces?: number) => string | number;
/**
 * @method 数字千分位分割
 * @param num 传入数值
 */
export declare const splitThousand: (num: string | number) => string;
/**
 * @method 金额转换分转元截取
 * @param amount 传入金额
 * @param decimalPlaces 保留小数位数
 */
export declare const amountSliceToYuan: (amount: number | string, decimalPlaces?: number) => string | number;
/**
 * @method 金额转换元转分截取1
 * @param amount 传入金额
 * @param decimalPlaces 保留小数位数
 */
export declare const amountSliceToFen: (amount: number | string, decimalPlaces?: number) => string | number;
/**
 * @method  金额转换分转元四舍五入
 * @param amount 传入金额
 * @param decimalPlaces 保留小数位数
 */
export declare const amountFixedToYuan: (amount: number | string, decimalPlaces?: number) => string;
/**
 * @method 金额转换元转分四舍五入
 * @param amount 传入金额
 * @param decimalPlaces 保留小数位数
 */
export declare const amountFixedToFen: (amount: number | string, decimalPlaces?: number) => string;
/**
 * @method 将金额分割成数组，不进行四舍五入,默认传入单位为分
 * @param amount 传入金额
 * @param decimalPlaces 保留小数位数
 * @param type 表示传入金额是分还是元
 *  */
export declare const amountSplitToArray: (amount: string | number, decimalPlaces?: number, type?: "F" | "Y") => string[];
