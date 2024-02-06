import { isUndefined, querystring } from "zmn-supply-utils";

const URL_ENUM = {
  mapp: "https://api-mapp.xiujiadian.com/ratel",
  userApp: "https://d.xiujiadian.com/userapp",
  gateway: "https://gateway-api.xiujiadian.com",
  ratel: "https://api-ratel.xiujiadian.com",
};

type FetchOptions = Partial<{
  method: "POST" | "GET" | "PUT" | "DELETE";
  data: Record<string, any> | FormData;
  type: "ratel" | "gateway" | "mapp" | "upload" | "userApp";
  headers: HeadersInit;
  query: Record<string, any>;
  responseType: "blob" | "json";
}>;

type Options = {
  config: {
    /** 接口认证类型 如果是 api-key 参数需要使用rsa算法加密 */
    authType: "api-key" | "app-key";
    appKey: string;
    secretKey: string;
    reqPublicKey?: string;
    resPublicKey?: string;
  };
  /** 接口请求的地址 */
  baseUrl: string;
  type: keyof typeof URL_ENUM;
  headers: HeadersInit;
};

export class Fetch {
  method: "POST" | "GET" | "PUT" | "DELETE";
  headers: HeadersInit;

  /** 配置参数 */
  config: Options["config"];

  private type: keyof typeof URL_ENUM = "mapp";

  constructor(options: Options) {
    const { config, headers } = options;

    if (!config) {
      throw Error("请指定 config 参数");
    }

    this.headers = headers;

    this.method = "POST";

    this.config = options.config;

    if (!options.config) {
      console.error("请传入 config ");
      return;
    }

    this.setConfig(options.config);
  }

  public setConfig(config: Options["config"]) {
    this.config = { ...this.config, ...config };
  }

  private getUri(config: any) {}

  private _getRequestData(data?: Record<string, any> | FormData) {
    if (isUndefined(data)) return undefined;

    return data instanceof FormData ? data : JSON.stringify(data);
  }

  private setHeaders(headers: HeadersInit) {
    const { authType } = this.config;

    return headers;
  }

  /** 请求方法 */
  private async _fetch(url: string, options: FetchOptions) {
    const { method, query, data, responseType = "json" } = options;

    if (query) {
      url += `?${querystring(query)}`;
    }

    const requestData = this._getRequestData(data);

    const res = await fetch(url, {
      method,
      headers: this.headers,
      body: requestData,
    });

    if (responseType === "json") {
      return await res.json();
    }

    if (responseType === "blob") {
      return await res.blob();
    }
  }


}
