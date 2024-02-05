/**
 * @method 四舍五入
 * @param num 传入数值
 * @param decimalPlaces 保留小数位数
 */
export const numFixed = (num1: string | number, decimalPlaces = 2) => {
  const i = decimalPlaces - 1;
  const result = Math.round(+(+num1 * +`10e${i}`).toPrecision(15)) / +`10e${i}`;
  return result.toFixed(decimalPlaces);
};

/**
 * @method 小数截取
 * @param num 传入数值
 * @param decimalPlaces 保留小数位数
 */
export const numSlice = (num: string | number, decimalPlaces = 2) => {
  const i = decimalPlaces - 1;
  const result = Math.floor(+(+num * +`10e${i}`).toPrecision(15)) / +`10e${i}`;
  return decimalPlaces !== undefined ? result.toFixed(decimalPlaces) : result;
};

/**
 * @method 数字千分位分割
 * @param num 传入数值
 */
export const splitThousand = (num: string | number) => {
  const tmp = (num || 0).toString();
  const parts = tmp.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

/**
 * @method 金额转换分转元截取
 * @param amount 传入金额
 * @param decimalPlaces 保留小数位数
 */
export const amountSliceToYuan = (
  amount: number | string,
  decimalPlaces = 2
) => {
  return numSlice(+amount / 100, decimalPlaces);
};

/**
 * @method 金额转换元转分截取1
 * @param amount 传入金额
 * @param decimalPlaces 保留小数位数
 */
export const amountSliceToFen = (
  amount: number | string,
  decimalPlaces = 0
) => {
  return numSlice(+amount * 100, decimalPlaces);
};

/**
 * @method  金额转换分转元四舍五入
 * @param amount 传入金额
 * @param decimalPlaces 保留小数位数
 */
export const amountFixedToYuan = (
  amount: number | string,
  decimalPlaces = 2
) => {
  return numFixed(+amount / 100, decimalPlaces);
};

/**
 * @method 金额转换元转分四舍五入
 * @param amount 传入金额
 * @param decimalPlaces 保留小数位数
 */
export const amountFixedToFen = (
  amount: number | string,
  decimalPlaces = 0
) => {
  return numFixed(+amount * 100, decimalPlaces);
};

/**
 * @method 将金额分割成数组，不进行四舍五入,默认传入单位为分
 * @param amount 传入金额
 * @param decimalPlaces 保留小数位数
 * @param type 表示传入金额是分还是元
 *  */
export const amountSplitToArray = (
  amount: string | number,
  decimalPlaces = 2,
  type: "F" | "Y" = "F"
) => {
  const tmpAmount =
    type === "F"
      ? amountSliceToYuan(amount, decimalPlaces)
      : numSlice(amount, decimalPlaces);

  return tmpAmount.toString().split(".");
};
