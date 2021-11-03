import ApiUtils from './ApiUtils';

export default class ServerAPI {

    static getHelloWorld = (): Promise<string> => {
        return ApiUtils.getResource<string>(`/`);
    }

    static postRGB = (red, green, blue): Promise<string> => {
        const request = {
            uri: `/sendColor`,
            jsonObject: {
                'red': red.toString(),
                'green': green.toString(),
                'blue': blue.toString()
            }
        };
        console.log("Server Command:", red, green, blue);
        return ApiUtils.postJson<string>(request);
    }
}
