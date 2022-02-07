import { Observable, of, mergeMap, throwError } from "rxjs";
import { fromFetch } from 'rxjs/fetch';
import Exchange from "../models/exchange";
import BaseService from "./baseService";

export default class ExchangeService extends BaseService<Exchange[]> {

    constructor() {
        super('https://api.coingecko.com/api/v3/exchanges', { page: 1, per_page: 60 });

    }

    public retrieve(queryParams: any = {}): Observable<Exchange[]> {
        const qp = this.getQueryParams(queryParams);
        if (queryParams['page'] > 4) return of([]);

        const url = this.getUrl(qp);

        if (this.isCacheResponseValid(url)) {
            return of(this.getFromCache(url));
        }

        return fromFetch(url).pipe(
            mergeMap(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return throwError(() => new Error(res.statusText))
                }
            }),
            mergeMap(res => {
                this.putInCache(res, url, 5);
                return of(res);
            })
        );
    }
}