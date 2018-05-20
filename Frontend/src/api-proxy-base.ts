export class ApiProxyBase {
    transformOptions(options: RequestInit): Promise<RequestInit> {
        options.credentials = 'include';
        return Promise.resolve(options);
    }

    transformResult(url: string, response: Response, process: (res: Response) => Promise<any>) {
        return process(response);
    }

    getBaseUrl(baseUrl: string) {
        return "http://localhost:51474";
    }
}
