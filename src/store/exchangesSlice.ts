import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Observable, tap } from "rxjs";
import { AppDispatch } from ".";
import Exchange from "../models/exchange";
import { exchangesService } from "../services";

type ExchangesState = {
    data: Exchange[];
}

const initState: ExchangesState = {
    data: []
}

const exchangesSlice = createSlice({
    name: 'exchanges',
    initialState: initState,
    reducers: {
        setExchanges: (state, action: PayloadAction<Exchange[]>) => {
            state.data = action.payload;
        }
    }
});

const { setExchanges } = exchangesSlice.actions;

const retrieveExchangesAction = (state: ExchangesState, dispatch: AppDispatch, queryParams: any): Observable<Exchange[]> => {
    return exchangesService.retrieve(queryParams).pipe(
        tap(data => {
            if (queryParams['page'] === 1) {
                dispatch(setExchanges(data));
            } else {
                dispatch(setExchanges(state.data.concat(data)));
            }
        })
    );
}

export { exchangesSlice, retrieveExchangesAction };