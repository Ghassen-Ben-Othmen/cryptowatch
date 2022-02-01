import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from ".";
import Coin from "../models/coin";
import { coinsService } from "../services";

type HomeState = {
    coins: {
        loading: boolean;
        data: Coin[];
    }
}

const initState: HomeState = {
    coins: {
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
        }
    }
});

const { setCoins, setCoinsLoading } = homeSlice.actions;

const retrieveCoinsAction = async (dispatch: AppDispatch) => {
    dispatch(setCoinsLoading(true));
    const data = await coinsService.retrieve();
    dispatch(setCoins(data));
    dispatch(setCoinsLoading(false));
}

const initAction = (dispatch: AppDispatch) => {
    retrieveCoinsAction(dispatch);
}

export { homeSlice, initAction };