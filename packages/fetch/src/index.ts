import { isEmpty, querystring, isFormData } from "@zmn/zmn-scm-utils";

import { HttpMethod, SignUtil, RsaUtil } from "zmn-ratel-sdk";

const URI = {
  mapp: "https://api-mapp.xiujiadian.com/ratel",
  userApp: "https://d.xiujiadian.com/userapp",
  gateway: "https://gateway-api.xiujiadian.com",
  ratel: "https://api-ratel.xiujiadian.com",
  upload: "123312",
};

type FetchOptions = {
  method: "POST" | "GET" | "PUT" | "DELETE";
  body?: Record<string, any> | FormData | string;
  type: "ratel" | "gateway" | "mapp" | "upload" | "userApp";
  headers?: HeadersInit;
  query?: Record<string, any>;
  reqType?: "json" | "formData";
  resType?: "json" | "blob";
};

type Options = {
  /** 接口认证类型 如果是 api-key 参数需要使用rsa算法加密 */
  authType: "api-key" | "app-key";
  appKey: string;
  secretKey: string;
  reqPublicKey?: string;
  resPrivateKey?: string;
};

/** 判断是否是 api 认证 */
const isApiKeyAuth = (type: Options["authType"]) => {
  return type === "api-key";
};

class Fetch {
  private _options: Options;

  private _baseUrl: string;

  private _URI = URI;

  setURI(URI: typeof this._URI) {
    this._URI = URI;
  }

  constructor(options: Options) {
    this.setOption(options);
  }

  /** 设置 config */
  setOption(option: Options) {
    this._options = option;
  }

  /** 统一请求方法 */
  private _request(url: string, options: FetchOptions) {
    const { body, query, resType, method, headers } = options;
    const option = {
      ...options,
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (!isEmpty(body)) {
      if (isFormData(body)) {
        delete option.headers['Content-Type'];
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
        const response = await fetch(url, option as RequestInit);
        if (response.ok) {
          if (resType === "json") {
            return resolve(response.json());
          }
          if (resType === "blob") {
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
    const { secretKey, authType, appKey, reqPublicKey, resPrivateKey } =
      this._options;

    const { type = "mapp", headers: h, method, body } = option;

    const BASE_URL = URI[type];

    const requestUrl = BASE_URL + url;

    const timestamp = +new Date();

    const sign = SignUtil.create({
      url: BASE_URL,
      httpMethod: method as HttpMethod,
      timestamp,
      bodyParams: body,
      secretKey: secretKey,
    });

    let requestData = body;

    // 如果是 api-key 认证
    if (isApiKeyAuth(authType)) {
      requestData = {
        ak: appKey,
        body: RsaUtil.encrypt(JSON.stringify(body), reqPublicKey),
      };
    }

    const headers = {
      Sign: sign,
      ...h,
    };

    const response = await this._request(requestUrl, {
      type,
      headers: headers,
      body: requestData,
      method,
    });

    const res = isApiKeyAuth(authType)
      ? RsaUtil.decrypt(JSON.stringify(response), resPrivateKey)
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

  /** 单例，创建 Fetch 实例 */
  static createService(option: Options) {
    if (!Fetch.instance) {
      Fetch.instance = new Fetch(option);
    } else {
      Fetch.instance.setOption(option);
    }
    return Fetch.instance;
  }
}

export const createService = (option: Options) => {
  const service = Fetch.createService(option);
  return service;
};
