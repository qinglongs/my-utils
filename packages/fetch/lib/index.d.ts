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
    setRequestBody?: (body: FetchOptions["body"]) => Promise<FetchOptions> | FetchOptions;
    setResponseBody?: (response: any) => any | Promise<any>;
    setRequestHeader?: (headers: HeadersInit) => HeadersInit;
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
    post<T = unknown>(url: string, option: FetchWrapperOptions): Promise<T>;
    /** get 请求 */
    get<T = unknown>(url: string, option: FetchWrapperOptions): Promise<T>;
    /** put 请求 */
    put<T = unknown>(url: string, option: FetchWrapperOptions): Promise<T>;
    /** delete 请求 */
    del<T = unknown>(url: string, option: FetchWrapperOptions): Promise<T>;
    /** Fetch 实例 */
    private static instance;
    /** 单例模式，创建 Fetch 实例 */
    static createService(option: Options | (() => Options)): Fetch;
}
export declare const createService: (option: Options) => Fetch;
export {};
