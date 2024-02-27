type URI = {
    /**  mapp: "https://test3-api-mapp.xiujiadian.com/ratel", */
    mapp: string;
    /**  userApp: "https://test3-d.xiujiadian.com/userapp"; */
    userApp: string;
    /** gateway: "https://test3-gateway-api.xiujiadian.com"; */
    gateway: string;
    /** ratel: "https://test3-api-ratel.xiujiadian.com"; */
    ratel: string;
};
type FetchOptions = {
    method?: "POST" | "GET" | "PUT" | "DELETE";
    body?: Record<string, any> | FormData | string;
    type?: "ratel" | "gateway" | "mapp" | "userApp";
    headers?: HeadersInit;
    query?: Record<string, any>;
    reqType?: "json" | "formData";
    resType?: "json" | "blob";
};
type FetchWrapperOptions = Omit<FetchOptions, "body"> & {
    data: FetchOptions["body"];
};
type GlobalConfig = {
    authType: "api-key" | "app-key";
    appKey: string;
    secretKey: string;
    /** rsa 解密公钥 */
    reqPublicKey?: string;
    /** rsa 加密私钥 */
    resPrivateKey?: string;
};
type Options = {
    /** 接口鉴权相关配置 */
    globalConfig: GlobalConfig | (() => GlobalConfig);
    /** 配置请求体 */
    setRequestBody?: (body: FetchOptions["body"]) => Promise<FetchOptions> | FetchOptions;
    /** 配置响应体,该方法抛出错误会被 onError 捕获 */
    setResponseBody?: (response: any) => any | Promise<any>;
    /** 配置 */
    setRequestHeader?: (headers: HeadersInit) => HeadersInit;
    /** 请求错误时触发 */
    onError: (reason: any) => void;
    URI: URI;
};
declare class Fetch {
    private _options;
    private _URI;
    setURI(URI: typeof this._URI): void;
    constructor(options: Options);
    /** 设置 config2313 */
    setOption(option: Options): void;
    /** 统一请求方法 */
    private _request;
    /** 请求包裹器 */
    private _requestWrapper;
    /** post 请求 */
    post<T = unknown>(url: string, option: FetchWrapperOptions): Promise<unknown>;
    /** get 请求 */
    get<T = unknown>(url: string, option: FetchWrapperOptions): Promise<unknown>;
    /** put 请求 */
    put<T = unknown>(url: string, option: FetchWrapperOptions): Promise<unknown>;
    /** delete 请求 */
    del<T = unknown>(url: string, option: FetchWrapperOptions): Promise<unknown>;
    /** Fetch 实例 */
    private static instance;
    /** 单例模式，创建 Fetch 实例 */
    static createService(option: Options | (() => Options)): Fetch;
}
export declare const createService: (option: Options | (() => Options)) => Fetch;
export {};
