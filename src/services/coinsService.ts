import { mergeMap, Observable, of, throwError } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import Coin from "../models/coin";
import BaseService from "./baseService";

export default class CoinsService extends BaseService<Coin[]>{

    protected options: any;

    constructor() {
        super('https://coinranking1.p.rapidapi.com/coins', {
            referenceCurrencyUuid: 'yhjMzLPhuIDl',
            timePeriod: '3h',
            tiers: '1',
            orderBy: 'marketCap',
            orderDirection: 'desc',
            limit: '24',
            offset: '0'
        });

        this.options = {
            headers: {
                'x-rapidapi-host': process.env.REACT_APP_RAPID_API_COINRANKING_HOST,
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_COINRANKING_KEY
            }
        }
    }

    public retrieve(queryParams: any = {}): Observable<Coin[]> {
        const qp = this.getQueryParams(queryParams);
        if (queryParams['offset'] > 4 * 24) return of([]);
        const url = this.getUrl(qp);

        if (this.isCacheResponseValid(url)) {
            return of(this.getFromCache(url));
        }

        return fromFetch(url, this.options).pipe(
            mergeMap((res: any) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return throwError(() => new Error(res.statusText))
                }
            }),
            mergeMap((res: any) => {
                const data = res['data']['coins']
                this.putInCache(data, url, 5);
                return of(data);
            })
        );

        // return from(this.fetchFakeData(coins.data.coins, 1000));
    }
}