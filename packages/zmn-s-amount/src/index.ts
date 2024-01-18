/**
 * @method 四舍五入
 * @param num 传入数值
 * @param decimalPlaces 保留小数位数
 */
export const numFixed = (num: string | number, decimalPlaces: number) => {
    return (+num).toFixed(decimalPlaces);
  };
  
  /**
   * @method 小数截取1
   * @param num 传入数值
   * @param decimalPlaces 保留小数位数
   */
  export const numSlice = (num: string | number, decimalPlaces: number) => {
    const regex = new RegExp(`\\.\\d{${decimalPlaces},}$`);
    const tmp = num.toString().replace(regex, function (match) {
      return match.replace(/0+$/, "").replace(/\.$/, "");
    });
    return (+tmp).toFixed(decimalPlaces);
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
   * @method 金额小数分割成数组默认是分
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
  