declare const URL_ENUM: {
    mapp: string;
    userApp: string;
    gateway: string;
    ratel: string;
};
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
export declare class Fetch {
    method: "POST" | "GET" | "PUT" | "DELETE";
    headers: HeadersInit;
    /** 配置参数 */
    config: Options["config"];
    private type;
    constructor(options: Options);
    setConfig(config: Options["config"]): void;
    private getUri;
    private _getRequestData;
    private setHeaders;
    /** 请求方法 */
    private _fetch;
}
export {};
