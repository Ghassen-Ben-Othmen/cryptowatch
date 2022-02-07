import BaseService from "./baseService"
import GlobalStats from '../models/globalStats';
import { mergeMap, Observable, of, throwError } from "rxjs";
import { fromFetch } from "rxjs/fetch";

export default class GlobalStatsService extends BaseService<GlobalStats> {

    protected options: any

    constructor() {
        super('https://coinranking1.p.rapidapi.com/stats', {});
        this.options = {
            headers: {
                'x-rapidapi-host': process.env.REACT_APP_RAPID_API_COINRANKING_HOST,
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_COINRANKING_KEY
            }
        }
    }

    public retrieve(queryParams = {}): Observable<GlobalStats> {
        const qp = this.getQueryParams(queryParams);
        const url = this.getUrl(qp);

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
                this.putInCache(res, url, 5);
                return of(res);
            })
        );
    }
}