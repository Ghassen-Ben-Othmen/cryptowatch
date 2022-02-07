import { mergeMap, Observable, of, throwError } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import News from "../models/news";
import BaseService from "./baseService";

export default class NewsService extends BaseService<News[]> {

    protected options: any;

    constructor() {
        super('https://free-news.p.rapidapi.com/v1/search', { q: 'cryptocurrencies', lang: 'en', page: '1', page_size: '24' });
        this.options = {
            headers: {
                'x-rapidapi-host': process.env.REACT_APP_RAPID_API_FREENEWS_HOST,
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_FREENEWS_KEY
            }
        }
    }

    protected getQueryParams(queryParams: any) {
        queryParams['q'] = queryParams['q'] || this.queryParams['q'];
        return super.getQueryParams(queryParams);
    }

    public retrieve(queryParams: any = {}): Observable<News[]> {
        const qp = this.getQueryParams(queryParams);
        if (qp['page'] > 4) return of([]);
        const url = this.getUrl(qp);

        // get response from cache if time passed is less then 5min from the first call
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
                this.putInCache(res['articles'], url, 5); // save response in cache for 5min
                return of(res['articles']);
            })
        ) as Observable<News[]>
        // return from(this.fetchFakeData(news.articles, 1000));
    }
}