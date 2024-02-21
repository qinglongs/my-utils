import { isUndefined, querystring, isFormData } from "zmn-supply-utils";

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
  data: Record<string, any>;
  query: Record<string, any>;
};

const zmnFetch = (
  url: string,
  options: RequestInit & {
    data: { [key: string]: any };
    responseType: "json" | "blob";
    query: { [key: string]: any };
  }
) => {
  const { data, responseType = "json", query } = options;

  const option: RequestInit & { [key: string]: any } = {
    "Content-Type": "application/json",
    ...options,
  };

  if (isFormData(data)) {
    delete option["Content-Type"];
    option.body = data as FormData;
  } else {
    options.body = JSON.stringify(data);
  }

  if (!isUndefined(query)) {
    url += `?${querystring(query)}`;
  }

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url, option);
      if (response.ok) {
        if (responseType === "json") {
          return resolve(response.json());
        }
        if (responseType === "blob") {
          return resolve(await response.blob());
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const zmnFetchWrapper = (url: string, option: Options) => {
  const { config, baseUrl, type = "mapp", headers: h } = option;

  const headers = {
    ...h,
  };
};
