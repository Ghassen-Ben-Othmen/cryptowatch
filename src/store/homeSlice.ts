import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from ".";
import Coin from "../models/coin";
import Exchange from "../models/exchange";
import { coinsService, exchnagesService } from "../services";

type HomeState = {
    coins: {
        loading: boolean;
        data: Coin[];
    },
    exchanges: {
        loading: boolean;
        data: Exchange[];
    }
}

const initState: HomeState = {
    coins: {
        loading: false,
        data: []
    },
    exchanges: {
        loading: false,
        data: []
    }
}

const homeSlice = createSlice({
    name: 'home',
    initialState: initState,
    reducers: {
        setCoins: (state, action: PayloadAction<Coin[]>) => {
            state.coins.data = action.payload;
        },
        setCoinsLoading: (state, action: PayloadAction<boolean>) => {
            state.coins.loading = action.payload;
        },
        setExchanges: (state, action: PayloadAction<Exchange[]>) => {
            state.exchanges.data = action.payload;
        },
        setExchangesLoading: (state, action: PayloadAction<boolean>) => {
            state.exchanges.loading = action.payload;
        }
    }
});

const { setCoins, setCoinsLoading, setExchanges, setExchangesLoading } = homeSlice.actions;

const retrieveCoinsAction = async (dispatch: AppDispatch) => {
    dispatch(setCoinsLoading(true));
    const data = await coinsService.retrieve();
    dispatch(setCoins(data));
    dispatch(setCoinsLoading(false));
}

const retrieveExchangesAction = async (dispatch: AppDispatch) => {
    dispatch(setExchangesLoading(true));
    const data = await exchnagesService.retrieve();
    dispatch(setExchanges(data));
    dispatch(setExchangesLoading(false));
}

const initAction = (dispatch: AppDispatch) => {
    retrieveCoinsAction(dispatch);
    retrieveExchangesAction(dispatch);
}

export { homeSlice, initAction };