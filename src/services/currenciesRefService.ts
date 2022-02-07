import { mergeMap, Observable, of, throwError } from "rxjs";
import { fromFetch } from 'rxjs/fetch';
import CurrencyRef from "../models/currencyRef";
import BaseService from "./baseService";

export default class CurrenciesRefService extends BaseService<CurrencyRef[]> {

    protected options: any;

    constructor() {
        super('https://coinranking1.p.rapidapi.com/reference-currencies', { types: 'fiat', limit: '20', offset: '0' });
        this.options = {
            headers: {
                'x-rapidapi-host': process.env.REACT_APP_RAPID_API_COINRANKING_HOST,
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_COINRANKING_KEY
            }
        }
    }

    public retrieve(queryparams = {}): Observable<CurrencyRef[]> {
        const qp = this.getQueryParams(queryparams);
        const url = this.getUrl(qp);

        return fromFetch(url, this.options).pipe(
            mergeMap((res: any) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return throwError(() => new Error(res.statusText))
                }
            }),
            mergeMap((res: any) => {
                const tn = {
                    uuid: "hi8n6hTOv12f",
                    type: "fiat",
                    iconUrl: "https://cdn.coinranking.com/4Fi9RPio-/tunisian-dinar.svg",
                    name: "Tunisian Dinar",
                    symbol: "TND",
                    sign: null
                }
                const data = res['data']['currencies'] as CurrencyRef[]
                data.push(tn);
                return of(data);
            })
        );
    }
}