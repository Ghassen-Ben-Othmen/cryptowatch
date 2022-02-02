import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from ".";
import Coin from "../models/coin";
import { coinsService } from "../services";

type CoinsState = {
    data: Coin[];
}

const initState: CoinsState = {
    data: []
}

const coinsSlice = createSlice({
    name: 'coins',
    initialState: initState,
    reducers: {
        setCoins: (state, action: PayloadAction<Coin[]>) => {
            state.data = action.payload;
        }
    }
});

const { setCoins } = coinsSlice.actions;

const retrieveCoinsAction = async (dispatch: AppDispatch) => {
    const data = await coinsService.retrieve();
    dispatch(setCoins(data));
}

export { coinsSlice, retrieveCoinsAction };