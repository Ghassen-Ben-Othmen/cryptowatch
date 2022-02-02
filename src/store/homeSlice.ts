import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from ".";
import Coin from "../models/coin";
import Exchange from "../models/exchange";
import News from "../models/news";
import { coinsService, exchnagesService, newsService } from "../services";

type HomeState = {
    coins: {
        loading: boolean;
        data: Coin[];
    },
    exchanges: {
        loading: boolean;
        data: Exchange[];
    },
    news: {
        loading: boolean;
        data: News[];
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
    },
    news: {
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
        },

        setNews: (state, action: PayloadAction<News[]>) => {
            state.news.data = action.payload;
        },
        setNewsLoading: (state, action: PayloadAction<boolean>) => {
            state.news.loading = action.payload;
        }
    }
});

const { setCoins, setCoinsLoading, setExchanges, setExchangesLoading, setNews, setNewsLoading } = homeSlice.actions;

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

const retrieveNewsAction = async (dispatch: AppDispatch) => {
    dispatch(setNewsLoading(true));
    const data = await newsService.retrieve();
    dispatch(setNews(data));
    dispatch(setNewsLoading(false));
}

const initAction = (dispatch: AppDispatch) => {
    retrieveCoinsAction(dispatch);
    retrieveExchangesAction(dispatch);
    retrieveNewsAction(dispatch);
}

export { homeSlice, initAction };