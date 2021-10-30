import ApiUtils from './ApiUtils';

export default class ServerAPI {

    static getHelloWorld = (): Promise<string> => {
        return ApiUtils.getResource<string>(`/`);
    }

    static postRGB = (): Promise<string> => {
        const request = {
            uri: `/sendColor`,
            jsonObject: {
                'red': 255,
                'green': 0,
                'blue': 0
            }
        };
        return ApiUtils.postJson<string>(request);
    }
}
