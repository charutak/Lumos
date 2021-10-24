export type ApiGetCall = {
    uri: string,
    headers?: Map<string, string>,
    queryParams?: Map<string, string[]|string|number|boolean|null|undefined>
} | string;

export type ApiPostCall = {
    uri: string,
    headers?: Map<string, string>,
    formParams?: Map<string, string|number|boolean|null|undefined>,
    jsonObject?: object,
    multiPartBody?: FormData,
};

interface Error {
    msg: string;
    details?: {
        source: string;
        lineno: number;
        colno: number;
        error: object;
    };
}

/**
 * Converts a map to http headers
 * @param map
 * @param additionalHeaders
 * @return {Headers}
 */
function mapToHttpHeaders(map?: Map<string, string>, ...additionalHeaders: Array<[string, string]>): Headers {
    const headers = new Headers();
    if (map) {
        map.forEach((v, k) => headers.set(k, v));
    }
    if (additionalHeaders) {
        additionalHeaders.forEach(x => headers.set(x[0], x[1]));
    }
    return headers;
}

function makeApiCall<T>(
    method: string,
    uri: string,
    headerMap?: Map<string, string>,
    body?: string | FormData, contentType?: string
): Promise<T> {
    console.log('uri' + uri);
    const headers = mapToHttpHeaders(headerMap);
    if (contentType) {
        headers.set('Content-Type', contentType);
    }
    const url = ApiUtils.apiBase + uri.replace(/^\/+/, '');
    console.log('url' + url);
    const rawApiFunc = () => fetch(url, {
        mode: 'cors',
        method,
        headers,
        cache: 'no-store',
        body
    });
    return rawApiFunc()
        .catch(onFetchPromiseRejected)
        .then((response: Response) => {
            if (response.status === 401) {
                /* return refreshCredentials().then(() => {
                 *     headers.set('Authorization', `Bearer ${getCredentials().accessToken}`); */
                    console.log('401 came');
                    return rawApiFunc();
            } else {
                return response;
            }
        })
        .then(onFetchPromiseFulfilled)
        .then((response: Response) => response.text())
        .then((respText: string) => {
            return respText ? JSON.parse(respText) : null;
        })
        .then((json: T) => json);
}

export type ApiErrorType = 'auth'|'client'|'server'|'network';

export class ApiError extends Error {
    type: ApiErrorType;
    body: any;

    private static getMessage(type: ApiErrorType): string {
        switch (type) {
            case 'auth':
                return 'Not Authorised';
            case 'client':
                return 'Request Error';
            case 'server':
                return 'Server Error';
            case 'network':
                return 'Network Error';
            default:
                return 'Error';
        }
    }

    constructor(type: ApiErrorType, body: {}) {
        super(ApiError.getMessage(type));
        this.type = type;
        this.body = body;
    }
}

export class NetworkError extends ApiError {
    constructor(error: Error) {
        super('network', error);
    }
}

function onFetchPromiseRejected(error: Error): Response {
    throw new NetworkError(error);
}

function onFetchPromiseFulfilled(response: Response): Promise<Response> {
    if (response.status >= 400) {
        console.log('HTTP ERROR', response.status, response.url); // tslint:disable-line no-console
        return response.json().then((json: {}) => {
            if (response.status === 401) {
                throw new AuthError(json);
            } else if (response.status >= 400 && response.status < 500) {
                throw new ClientError(json);
            } else {
                throw new ServerError(json);
            }
        });
    }
    return Promise.resolve(response);
}

export default class ApiUtils {
    static apiBase = 'http://192.168.1.29:3000/';

    static setApiBase(apiBase: string) {
        ApiUtils.apiBase = apiBase;
    }

    /**
     * Make an API GET call
     * @param request
     * @return {Promise<T>}
     */
    static getResource<T>(request: ApiGetCall): Promise<T> {
        console.log('get resource' + request.uri);
        if (typeof request === 'string') {
            request = {uri: request};
        }
        let paramsEncoded = null;
        if (request.queryParams) {
            const paramsArr: Array<string> = [];
            request.queryParams
                .forEach((v, k) => {
                    if (v && v !== null) {
                        if (v instanceof Array) {
                            v.forEach(paramValue => paramsArr.push(`${k}=${paramValue ? encodeURIComponent(String(paramValue)) : null}`));
                        } else {
                            paramsArr.push(`${k}=${v ? encodeURIComponent(String(v)) : null}`);
                        }
                    }
                });
            paramsEncoded = paramsArr.join('&');
        }
        const uri = request.uri;
        const uriWithParams = paramsEncoded
            ? (uri.indexOf('?') >= 0 ? uri + paramsEncoded : `${uri}?${paramsEncoded}`)
            : uri;

        return makeApiCall(
            'GET',
            uriWithParams,
            request.headers
        );
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * POST an HTTP form
     * @param request
     * @return {Promise<T>}
     */
    static postUrlEncodedForm<T>(request: ApiPostCall): Promise<T> {
        let body = '';
        if (request.formParams) {
            const paramsArr: Array<string> = [];
            request.formParams
                .forEach((v, k) =>
                    paramsArr.push(`${k}=${v ? encodeURIComponent(String(v)) : null}`)
                );
            body = paramsArr.join('&');
        }
        return makeApiCall(
            'POST',
            request.uri,
            request.headers,
            body,
            'application/x-www-form-urlencoded'
        );
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * POST a JSON object
     * @param request
     * @return {Promise<T>}
     */
    static postJson<T>(request: ApiPostCall): Promise<T> {
        return makeApiCall(
            'POST',
            request.uri,
            request.headers,
            request.jsonObject ? JSON.stringify(request.jsonObject) : '',
            'application/json'
        );
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * Example:
     *
     * let params = new FormData();
     * params.append('image', file); // file is of type File
     * params.append('abc', 'xyz');
     *
     * const request = {
     *     uri: `/api/upload-image`,
     *     multiPartBody: params,
     * }
     *
     * HttpUtils.postMultipartForm(request);
     *
     * @returns {Promise}
     */
    static postMultipartForm<T>(request: ApiPostCall): Promise<T> {
        return makeApiCall(
            'POST',
            request.uri,
            request.headers,
            request.multiPartBody
            /*, 'multipart/form-data' */ // Do NOT add this here — fetch stops adding boundary to Content-Type header
        );
    }
}
