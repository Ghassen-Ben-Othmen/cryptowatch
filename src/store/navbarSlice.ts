import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from ".";
import CurrencyRef from "../models/currencyRef";
import GlobalStats from "../models/globalStats";
import { currenciesRefService, globalStatsService } from '../services';

const navbarSlice = createSlice({
    name: 'navbar',
    initialState: {
        loading: false,
        stats: {} as GlobalStats,
        currenciesRef: [] as CurrencyRef[],
        selectedCurrency: {} as CurrencyRef
    },
    reducers: {
        setGlobalStats: (state, action: PayloadAction<GlobalStats>) => {
            state.stats = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setCurrenciesRef: (state, action: PayloadAction<CurrencyRef[]>) => {
            state.currenciesRef = action.payload;
            state.selectedCurrency = action.payload[0];
        },
        setSelectedCurrency: (state, action: PayloadAction<CurrencyRef>) => {
            state.selectedCurrency = action.payload;
        }
    }
});

const { setGlobalStats, setLoading, setCurrenciesRef, setSelectedCurrency } = navbarSlice.actions;

const retrieveGlobalStatsAction = async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    const stats$ = globalStatsService.retrieve();
    const currenciesRef$ = currenciesRefService.retrieve();
    const [stats, currenciesRef] = await Promise.all([stats$, currenciesRef$]);
    dispatch(setGlobalStats(stats));
    dispatch(setCurrenciesRef(currenciesRef));
    dispatch(setLoading(false));
}

const selectCurrencyAction = (dispatch: AppDispatch, currencyRef: CurrencyRef) => {
    dispatch(setSelectedCurrency(currencyRef));
}

export { navbarSlice, retrieveGlobalStatsAction, selectCurrencyAction };