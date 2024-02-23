import { isEmpty, querystring, isFormData } from "zmn-supply-utils";

import { HttpMethod, SignUtil, RsaUtil } from "zmn-ratel-sdk";

const URI = {
  mapp: "https://api-mapp.xiujiadian.com/ratel",
  userApp: "https://d.xiujiadian.com/userapp",
  gateway: "https://gateway-api.xiujiadian.com",
  ratel: "https://api-ratel.xiujiadian.com",
  upload: "",
};

type FetchOptions = Partial<{
  method: "POST" | "GET" | "PUT" | "DELETE";
  body: Record<string, any> | FormData | string;
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
    resPrivateKey?: string;
  };
  /** 接口请求的地址 */
  baseUrl: string;
  type: keyof typeof URI;
  headers: HeadersInit;
  data: Record<string, any>;
  query: Record<string, any>;
  method: FetchOptions["method"];
  reqType: "json" | "formData";
  resType: "json" | "blob";
};

/** 判断是否是 api 认证 */
const isApiKeyAuth = (type: Options["config"]["authType"]) => {
  return type === "api-key";
};

export class Fetch {
  private _options: Options;

  private _config: Options["config"];

  private _baseUrl: string;

  private _URI = URI;

  setURI(URI: typeof this._URI) {
    this._URI = URI;
  }

  get config() {
    return this._config;
  }

  constructor(options: Options) {
    this._options = options;
    this._config = options.config;
    this._baseUrl = URI[options.type];
  }

  /** 设置 config */
  setConfig(config: Options["config"]) {
    this._config = { ...this._config, ...config };
  }

  /** 统一请求方法 */
  private _request(url: string, options: Omit<FetchOptions, "type"> = {}) {
    const { body, responseType = "json", query } = options;

    const option = {
      "Content-Type": "application/json",
      ...options,
    };

    if (!isEmpty(body)) {
      if (isFormData(body)) {
        delete option["Content-Type"];
        option.body = body;
      } else {
        option.body = JSON.stringify(body);
      }
    }

    if (!isEmpty(query)) {
      url += `?${querystring(query)}`;
    }

    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          this._baseUrl + url,
          option as RequestInit
        );
        if (response.ok) {
          if (responseType === "json") {
            return resolve(response.json());
          }
          if (responseType === "blob") {
            return resolve(await response.blob());
          }
        } else {
          reject(response.json());
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /** 请求包裹器 */
  private async _requestWrapper<T = unknown>(
    url: string,
    option: FetchOptions
  ) {
    const { config, data } = this._options;

    const { type = "mapp", headers: h, method } = option;

    const BASE_URL = URI[type];

    const requestUrl = BASE_URL + url;

    const timestamp = +new Date();

    const sign = SignUtil.create({
      url: BASE_URL,
      httpMethod: method as HttpMethod,
      timestamp,
      bodyParams: data,
      secretKey: config.secretKey,
    });

    let requestData = data;

    // 如果是 api-key 认证
    if (isApiKeyAuth(config.authType)) {
      requestData = {
        ak: config.appKey,
        body: RsaUtil.encrypt(JSON.stringify(data), config.reqPublicKey),
      };
    }

    const headers = {
      Sign: sign,
      ...h,
    };

    const response = await this._request(requestUrl, {
      headers: headers,
      body: requestData,
    });

    const res = isApiKeyAuth(config.authType)
      ? RsaUtil.decrypt(JSON.stringify(response), config.resPrivateKey)
      : response;

    return res as T;
  }

  /** post 请求 */
  public post(url: string, option: FetchOptions) {
    return this._requestWrapper(url, { method: "POST", ...option });
  }

  /** get 请求 */
  public get(url: string, option: FetchOptions) {
    return this._requestWrapper(url, { method: "GET", ...option });
  }

  /** put 请求 */
  public put(url: string, option: FetchOptions) {
    return this._requestWrapper(url, { method: "PUT", ...option });
  }

  /** delete 请求 */
  public del(url: string, option: FetchOptions) {
    return this._requestWrapper(url, { method: "DELETE", ...option });
  }

  /** Fetch 实例 */
  private static instance: Fetch;

  /** 单例模式，仅维持一个 Fetch 实例 */
  static createService(option: Options) {
    if (!Fetch.instance) {
      Fetch.instance = new Fetch(option);
    }
    return Fetch.instance;
  }
}
