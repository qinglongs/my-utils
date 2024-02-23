declare const URI: {
    mapp: string;
    userApp: string;
    gateway: string;
    ratel: string;
    upload: string;
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
export declare class Fetch {
    private _options;
    private _config;
    private _baseUrl;
    private _URI;
    setURI(URI: typeof this._URI): void;
    get config(): {
        /** 接口认证类型 如果是 api-key 参数需要使用rsa算法加密 */
        authType: "api-key" | "app-key";
        appKey: string;
        secretKey: string;
        reqPublicKey?: string;
        resPrivateKey?: string;
    };
    constructor(options: Options);
    /** 设置 config */
    setConfig(config: Options["config"]): void;
    /** 统一请求方法 */
    private _request;
    /** 请求包裹器 */
    private _requestWrapper;
    /** post 请求 */
    post(url: string, option: FetchOptions): Promise<unknown>;
    /** get 请求 */
    get(url: string, option: FetchOptions): Promise<unknown>;
    /** put 请求 */
    put(url: string, option: FetchOptions): Promise<unknown>;
    /** delete 请求 */
    del(url: string, option: FetchOptions): Promise<unknown>;
    /** Fetch 实例 */
    private static instance;
    /** 单例模式，仅维持一个 Fetch 实例 */
    static createService(option: Options): Fetch;
}
export {};
