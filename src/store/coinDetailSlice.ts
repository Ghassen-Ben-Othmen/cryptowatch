import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mergeMap, Observable, tap } from "rxjs";
import { AppDispatch } from ".";
import CoinDetail from "../models/coinDetail";
import CoinHistory from "../models/CoinHistory";
import { coinDetailService, coinHistoryService } from "../services";

type CoinDetailState = {
    data: CoinDetail;
    history: CoinHistory[];
}

const initState: CoinDetailState = {
    data: {} as CoinDetail,
    history: []
};

const coinDetailSlice = createSlice({
    name: 'coinDetail',
    initialState: initState,
    reducers: {
        setCoinDetail: (state, action: PayloadAction<CoinDetail>) => {
            state.data = action.payload;
        },
        setCoinHistory: (state, action: PayloadAction<CoinHistory[]>) => {
            state.history = action.payload;
        }
    }
});

const { setCoinDetail, setCoinHistory } = coinDetailSlice.actions;

const retrieveCoinDetailAction = (dispatch: AppDispatch, id: string): Observable<any> => {
    return coinDetailService.retrieve({}, id).pipe(
        mergeMap(data => {
            dispatch(setCoinDetail(data));
            return coinHistoryService.retrieve({}, id)
        }),
        tap(data => {
            dispatch(setCoinHistory(data));
        })
    );
}

export { coinDetailSlice, retrieveCoinDetailAction };