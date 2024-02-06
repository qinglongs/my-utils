const URL_ENUM = {
  mapp: "https://api-mapp.xiujiadian.com/ratel",
  userApp: "https://d.xiujiadian.com/userapp",
  gateway: "https://gateway-api.xiujiadian.com",
  ratel: "https://api-ratel.xiujiadian.com",
};

type Options = {
  config: {
    /** 认证类型 api-key 参数需要使用rsa算法加密 */
    authType: "api-key" | "app-key";
    appKey: string;
    secretKey: string;
    reqPublicKey?: string;
    resPublicKey?: string;
  };

  /** 接口请求的地址 */
  baseUrl: string;
  headers?: any;
  type: keyof typeof URL_ENUM;
};

export class Fetch {
  method: "POST" | "GET" | "PUT" | "DELETE";
  headers: any;

  /** 配置参数 */
  config: Options["config"];

  private type: keyof typeof URL_ENUM = "mapp";

  constructor(options: Options) {
    this.method = "POST";
    this.config = options.config;
    if (!options.config) {
      console.error("请传入 config ");
      return;
    }

    this.setConfig(options.config);
  }

  public setConfig(config: Options["config"]) {
    this.config = config;
  }

  private getUri(config: any) {}

  private async _fetch(url: string, options: RequestInit) {
    const fullPath = url;

    const res = await fetch(url, options);
  }
}
