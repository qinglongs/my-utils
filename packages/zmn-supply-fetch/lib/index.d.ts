declare const URL_ENUM: {
    mapp: string;
    userApp: string;
    gateway: string;
    ratel: string;
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
export declare class Fetch {
    method: "POST" | "GET" | "PUT" | "DELETE";
    headers: any;
    /** 配置参数 */
    config: Options["config"];
    private type;
    constructor(options: Options);
    setConfig(config: Options["config"]): void;
    private getUri;
    private _fetch;
}
export {};
