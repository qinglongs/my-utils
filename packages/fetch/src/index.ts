import { isEmpty, querystring, isFunction } from "@zmn/zmn-scm-utils";

import { HttpMethod, SignUtil, RsaUtil } from "zmn-ratel-sdk";

type URI = {
  /**  mapp: "https://test3-api-mapp.xiujiadian.com/ratel", */
  mapp: string;
  /**  userApp: "https://test3-d.xiujiadian.com/userapp"; */
  userApp: string;
  /** gateway: "https://test3-gateway-api.xiujiadian.com"; */
  gateway: string;
  /** ratel: "https://test3-api-ratel.xiujiadian.com"; */
  ratel: string;
  /** upload: "https://test3-api-ratel.xiujiadian.com"; */
  upload: string;
};

type FetchOptions = {
  method?: "POST" | "GET" | "PUT" | "DELETE";
  body?: Record<string, any> | FormData | string;
  type?: "ratel" | "gateway" | "mapp" | "upload" | "userApp";
  headers?: HeadersInit;
  query?: Record<string, any>;
  reqType?: "json" | "formData";
  resType?: "json" | "blob";
};

type FetchWrapperOptions = Omit<FetchOptions, "body"> & {
  data: FetchOptions["body"];
};

type Options = {
  /** 接口认证类型 如果是 api-key 参数需要使用rsa算法加密 */
  authType: "api-key" | "app-key";
  appKey: string;
  secretKey: string;
  reqPublicKey?: string;
  resPrivateKey?: string;
  setRequestBody?: (
    body: FetchOptions["body"]
  ) => Promise<FetchOptions> | FetchOptions;
  setResponseBody?: (response: any) => any | Promise<any>;
  setRequestHeader?: (headers: HeadersInit) => HeadersInit;
  URI: URI;
};

/** 判断是否是 api 认证 */
const isApiKeyAuth = (type: Options["authType"]) => {
  return type === "api-key";
};

class Fetch {
  private _options: Options;

  private _URI: URI;

  setURI(URI: typeof this._URI) {
    this._URI = URI;
  }

  constructor(options: Options) {
    this.setOption(options);
    this.post = this.post.bind(this);
    this.get = this.get.bind(this);
    this.put = this.put.bind(this);
    this.del = this.del.bind(this);
  }

  /** 设置 config2313 */
  setOption(option: Options) {
    this._options = option;
    this._URI = option.URI;
  }

  /** 统一请求方法 */
  private _request(
    url: string,
    options: Omit<
      FetchOptions,
      "setRequestBody" | "setResponseBody" | "setRequestHeader"
    >
  ) {
    const { body, query, resType, reqType, method, headers } = options;
    const option = {
      ...options,
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (!isEmpty(body)) {
      if (reqType !== "json") {
        delete option.headers["Content-Type"];
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
    option: FetchWrapperOptions
  ) {
    const {
      secretKey,
      authType,
      appKey,
      reqPublicKey,
      resPrivateKey,
      setRequestBody,
      setRequestHeader,
      setResponseBody,
    } = this._options;

    const {
      type = "mapp",
      headers: h,
      method,
      data,
      reqType = "json",
      resType = "json",
    } = option;

    const body = setRequestBody ? setRequestBody(data) : data;

    const BASE_URL = this._URI[type];

    const requestUrl = BASE_URL + url;

    const timestamp = +new Date();

    const sign = SignUtil.create({
      url: BASE_URL,
      httpMethod: method as HttpMethod,
      timestamp,
      bodyParams: body,
      secretKey: secretKey,
    });

    let requestData: any = body;

    const baseHeader = {
      Sign: sign,
      "App-Key": appKey,
      timestamp,
      ...h,
    } as any;

    // 设置请求头
    const headers = setRequestHeader
      ? setRequestHeader(baseHeader)
      : baseHeader;

    // 如果是 api-key 认证，参数需要加密
    if (isApiKeyAuth(authType) && reqType === "json") {
      requestData = {
        ak: appKey,
        body: RsaUtil.encrypt(JSON.stringify(body), reqPublicKey),
      };
      delete headers["App-Key"];
    }

    const requestOpt = {
      headers,
      method,
      type,
      body: requestData,
      ...this._options,
      resType,
      reqType,
    };

    const response = await this._request(requestUrl, requestOpt);

    const res = isApiKeyAuth(authType)
      ? RsaUtil.decrypt(JSON.stringify(response), resPrivateKey)
      : response;

    return setResponseBody ? ((await setResponseBody(res)) as T) : (res as T);
  }

  /** post 请求 */
  public post<T = unknown>(url: string, option: FetchWrapperOptions) {
    return this._requestWrapper<T>(url, { method: "POST", ...option });
  }

  /** get 请求 */
  public get<T = unknown>(url: string, option: FetchWrapperOptions) {
    return this._requestWrapper<T>(url, { method: "GET", ...option });
  }

  /** put 请求 */
  public put<T = unknown>(url: string, option: FetchWrapperOptions) {
    return this._requestWrapper<T>(url, { method: "PUT", ...option });
  }

  /** delete 请求 */
  public del<T = unknown>(url: string, option: FetchWrapperOptions) {
    return this._requestWrapper<T>(url, { method: "DELETE", ...option });
  }

  /** Fetch 实例 */
  private static instance: Fetch;

  /** 单例模式，创建 Fetch 实例 */
  static createService(option: Options | (() => Options)) {
    if (!Fetch.instance) {
      if (isFunction(option)) {
        Fetch.instance = new Fetch((option as () => any)());
      }
    } else {
      Fetch.instance.setOption(option as Options);
    }
    return Fetch.instance;
  }
}

export const createService = (option: Options | (() => Options)) => {
  const service = Fetch.createService(option);
  return service;
};
