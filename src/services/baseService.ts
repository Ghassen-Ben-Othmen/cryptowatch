import { Observable } from "rxjs";

export default abstract class BaseService<TModel> {
    protected cache: any;

    constructor(protected endpoint: string, protected queryParams: any) {
        this.cache = {};
    }

    abstract retrieve(queryParams: any, id?: any): Observable<TModel>;

    protected fetchFakeData(data: TModel, time: number): Promise<TModel> {
        return new Promise((resolve, _) => {
            setTimeout(() => resolve(data), time);
        });
    }

    protected getQueryParams(queryParams: any) {
        return { ...this.queryParams, ...queryParams };
    }

    protected getUrl(queryParams: any) {
        const url = new URL(this.endpoint);
        for (let key in queryParams) {
            url.searchParams.set(key, queryParams[key]);
        }
        return url.href
    }

    protected putInCache(response: any, url: string, time: number) {
        this.cache[url] = {
            timestamp: new Date(new Date().getTime() + (time * 60000)).getTime(),
            response: response
        }
    }

    protected isCacheResponseValid(url: string) { // check if response exists and time is less than 5min from the last call
        return this.cache[url] && this.cache[url].timestamp > new Date().getTime();
    }

    protected getFromCache(url: string) {
        return this.cache[url].response;
    }
}