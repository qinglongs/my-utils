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
declare class Fetch {
    private _options;
    private _baseUrl;
    private _URI;
    setURI(URI: typeof this._URI): void;
    constructor(options: Options);
    /** 设置 config */
    setOption(option: Options): void;
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
    /** 单例，创建 Fetch 实例 */
    static createService(option: Options): Fetch;
}
export declare const createService: (option: Options) => Fetch;
export {};
