import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mergeMap, Observable, tap } from "rxjs";
import { AppDispatch } from ".";
import CurrencyRef from "../models/currencyRef";
import GlobalStats from "../models/globalStats";
import { currenciesRefService, globalStatsService } from '../services';

type NavbarState = {
    stats: GlobalStats;
    currenciesRef: CurrencyRef[];
    selectedCurrency: CurrencyRef;
}

const initState: NavbarState = {
    stats: {} as GlobalStats,
    currenciesRef: [],
    selectedCurrency: {} as CurrencyRef
}

const navbarSlice = createSlice({
    name: 'navbar',
    initialState: initState,
    reducers: {
        setGlobalStats: (state, action: PayloadAction<GlobalStats>) => {
            state.stats = action.payload;
        },
        setCurrenciesRef: (state, action: PayloadAction<CurrencyRef[]>) => {
            state.currenciesRef = action.payload;
            state.selectedCurrency = action.payload[0];
        },
        setNavbarState: (state, action) => { // aggregate the state change used in order to minimize the number of calling useAppSelector
            state.stats = action.payload.stats;
            state.selectedCurrency = action.payload.selectedCurrency;
        }
    }
});

const { setGlobalStats, setCurrenciesRef, setNavbarState } = navbarSlice.actions;

const initAction = (dispatch: AppDispatch): Observable<any> => {
    return currenciesRefService.retrieve().pipe(
        mergeMap(currenciesRef => {
            dispatch(setCurrenciesRef(currenciesRef));
            return globalStatsService.retrieve({ referenceCurrencyUuid: currenciesRef[0].uuid });
        }),
        tap(stats => {
            dispatch(setGlobalStats(stats));
        })
    );
}

const selectCurrencyAction = (dispatch: AppDispatch, currencyRef: CurrencyRef) => {
    return globalStatsService.retrieve({ referenceCurrencyUuid: currencyRef.uuid }).pipe(
        tap(stats => {
            dispatch(setNavbarState({
                stats: stats,
                selectedCurrency: currencyRef
            }));
        })
    );
}

export { navbarSlice, initAction, selectCurrencyAction };