import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from ".";
import Coin from "../models/coin";
import Exchange from "../models/exchange";
import News from "../models/news";
import { coinsService, exchnagesService, newsService } from "../services";

type HomeState = {
    coins: {
        data: Coin[];
    },
    exchanges: {
        data: Exchange[];
    },
    news: {
        data: News[];
    }
}

const initState: HomeState = {
    coins: {
        data: []
    },
    exchanges: {
        data: []
    },
    news: {
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

        setExchanges: (state, action: PayloadAction<Exchange[]>) => {
            state.exchanges.data = action.payload;
        },

        setNews: (state, action: PayloadAction<News[]>) => {
            state.news.data = action.payload;
        },
    }
});

const { setCoins, setExchanges, setNews } = homeSlice.actions;

const retrieveCoinsAction = async (dispatch: AppDispatch) => {
    const data = await coinsService.retrieve();
    dispatch(setCoins(data.slice(0, 8)));
}

const retrieveExchangesAction = async (dispatch: AppDispatch) => {
    const data = await exchnagesService.retrieve();
    dispatch(setExchanges(data));
}

const retrieveNewsAction = async (dispatch: AppDispatch) => {
    const data = await newsService.retrieve();
    dispatch(setNews(data.slice(0, 8)));
}

export { homeSlice, retrieveCoinsAction, retrieveExchangesAction, retrieveNewsAction };