import { isEmpty, isFormData, querystring } from 'zmn-supply-utils';
import { SignUtil, RsaUtil } from 'zmn-ratel-sdk';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const URI = {
    mapp: "https://api-mapp.xiujiadian.com/ratel",
    userApp: "https://d.xiujiadian.com/userapp",
    gateway: "https://gateway-api.xiujiadian.com",
    ratel: "https://api-ratel.xiujiadian.com",
    upload: "",
};
/** 判断是否是 api 认证 */
const isApiKeyAuth = (type) => {
    return type === "api-key";
};
class Fetch {
    setURI(URI) {
        this._URI = URI;
    }
    get config() {
        return this._config;
    }
    constructor(options) {
        this._URI = URI;
        this._options = options;
        this._config = options.config;
        this._baseUrl = URI[options.type];
    }
    /** 设置 config */
    setConfig(config) {
        this._config = Object.assign(Object.assign({}, this._config), config);
    }
    /** 统一请求方法 */
    _request(url, options = {}) {
        const { body, responseType = "json", query } = options;
        const option = Object.assign({ "Content-Type": "application/json" }, options);
        if (!isEmpty(body)) {
            if (isFormData(body)) {
                delete option["Content-Type"];
                option.body = body;
            }
            else {
                option.body = JSON.stringify(body);
            }
        }
        if (!isEmpty(query)) {
            url += `?${querystring(query)}`;
        }
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(this._baseUrl + url, option);
                if (response.ok) {
                    if (responseType === "json") {
                        return resolve(response.json());
                    }
                    if (responseType === "blob") {
                        return resolve(yield response.blob());
                    }
                }
                else {
                    reject(response.json());
                }
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    /** 请求包裹器 */
    _requestWrapper(url, option) {
        return __awaiter(this, void 0, void 0, function* () {
            const { config, data } = this._options;
            const { type = "mapp", headers: h, method } = option;
            const BASE_URL = URI[type];
            const requestUrl = BASE_URL + url;
            const timestamp = +new Date();
            const sign = SignUtil.create({
                url: BASE_URL,
                httpMethod: method,
                timestamp,
                bodyParams: data,
                secretKey: config.secretKey,
            });
            let requestData = data;
            // 如果是 api-key 认证
            if (isApiKeyAuth(config.authType)) {
                requestData = {
                    ak: config.appKey,
                    body: RsaUtil.encrypt(JSON.stringify(data), config.reqPublicKey),
                };
            }
            const headers = Object.assign({ Sign: sign }, h);
            const response = yield this._request(requestUrl, {
                headers: headers,
                body: requestData,
            });
            const res = isApiKeyAuth(config.authType)
                ? RsaUtil.decrypt(JSON.stringify(response), config.resPrivateKey)
                : response;
            return res;
        });
    }
    /** post 请求 */
    post(url, option) {
        return this._requestWrapper(url, Object.assign({ method: "POST" }, option));
    }
    /** get 请求 */
    get(url, option) {
        return this._requestWrapper(url, Object.assign({ method: "GET" }, option));
    }
    /** put 请求 */
    put(url, option) {
        return this._requestWrapper(url, Object.assign({ method: "PUT" }, option));
    }
    /** delete 请求 */
    del(url, option) {
        return this._requestWrapper(url, Object.assign({ method: "DELETE" }, option));
    }
    /** 单例模式，仅维持一个 Fetch 实例 */
    static createService(option) {
        if (!Fetch.instance) {
            Fetch.instance = new Fetch(option);
        }
        return Fetch.instance;
    }
}

export { Fetch };
