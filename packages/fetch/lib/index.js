import { isEmpty, querystring, isFunction } from '@zmn/zmn-scm-utils';
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

/** 判断是否是 api 认证 */
const isApiKeyAuth = (type) => {
    return type === "api-key";
};
class Fetch {
    setURI(URI) {
        this._URI = URI;
    }
    constructor(options) {
        this.setOption(options);
    }
    /** 设置 config2313 */
    setOption(option) {
        this._options = option;
    }
    /** 统一请求方法 */
    _request(url, options) {
        const { body, query, resType, reqType, method, headers } = options;
        const option = Object.assign(Object.assign({}, options), { method, headers: Object.assign({ "Content-Type": "application/json" }, headers) });
        if (!isEmpty(body)) {
            if (reqType !== "json") {
                delete option.headers["Content-Type"];
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
                const response = yield fetch(url, option);
                if (response.ok) {
                    if (resType === "json") {
                        return resolve(response.json());
                    }
                    if (resType === "blob") {
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
            const { secretKey, authType, appKey, reqPublicKey, resPrivateKey, setRequestBody, setRequestHeader, setResponseBody, } = this._options;
            const { type = "mapp", headers: h, method, data, reqType = "json", resType = "json", } = option;
            const body = setRequestBody ? setRequestBody(data) : data;
            const BASE_URL = this._URI[type];
            const requestUrl = BASE_URL + url;
            const timestamp = +new Date();
            const sign = SignUtil.create({
                url: BASE_URL,
                httpMethod: method,
                timestamp,
                bodyParams: body,
                secretKey: secretKey,
            });
            let requestData = body;
            const baseHeader = Object.assign({ Sign: sign, "App-Key": appKey, timestamp }, h);
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
            const requestOpt = Object.assign(Object.assign({ headers,
                method,
                type, body: requestData }, this._options), { resType,
                reqType });
            const response = yield this._request(requestUrl, requestOpt);
            const res = isApiKeyAuth(authType)
                ? RsaUtil.decrypt(JSON.stringify(response), resPrivateKey)
                : response;
            return setResponseBody ? (yield setResponseBody(res)) : res;
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
    /** 单例模式，创建 Fetch 实例 */
    static createService(option) {
        if (!Fetch.instance) {
            if (isFunction(option)) {
                Fetch.instance = new Fetch(option());
            }
            else {
                Fetch.instance.setOption(option);
            }
        }
        return Fetch.instance;
    }
}
const createService = (option) => {
    const service = Fetch.createService(option);
    return service;
};

export { createService };
