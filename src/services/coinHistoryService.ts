import { mergeMap, Observable, of, throwError } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import CoinHistory from "../models/CoinHistory";
import BaseService from "./baseService";

export default class CoinHistoryService extends BaseService<CoinHistory[]> {

    protected options: any;

    constructor() {
        super('https://coinranking1.p.rapidapi.com/coin', { timePeriod: '3h' });
        this.options = {
            headers: {
                'x-rapidapi-host': process.env.REACT_APP_RAPID_API_COINRANKING_HOST,
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_COINRANKING_KEY
            }
        }
    }

    protected getUrlWithParams(queryParams: any, id: string) {
        const url = new URL(`${this.endpoint}/${id}/history`);
        for (let key in queryParams) {
            url.searchParams.set(key, queryParams[key]);
        }
        return url.href;
    }

    public retrieve(queryParams: any, id: any): Observable<CoinHistory[]> {
        const qp = this.getQueryParams(queryParams);
        const url = this.getUrlWithParams(qp, id);

        if (this.isCacheResponseValid(url)) {
            return of(this.getFromCache(url));
        }

        return fromFetch(url, this.options).pipe(
            mergeMap((res: any) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return throwError(() => new Error(res.statusText));
                }
            }),
            mergeMap((res: any) => {
                const data = res['data']['history'];
                this.putInCache(data, url, 5);
                return of(data);
            })
        );
    }
}