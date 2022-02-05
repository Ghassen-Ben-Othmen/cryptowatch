import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tap } from "rxjs";
import { AppDispatch } from ".";
import Coin from "../models/coin";
import Exchange from "../models/exchange";
import News from "../models/news";
import { coinsService, exchangesService, newsService } from "../services";

type HomeState = {
    coins: Coin[];
    exchanges: Exchange[];
    news: News[];
}

const initState: HomeState = {
    coins: [],
    exchanges: [],
    news: []
}

const homeSlice = createSlice({
    name: 'home',
    initialState: initState,
    reducers: {
        setCoins: (state, action: PayloadAction<Coin[]>) => {
            state.coins = action.payload;
        },
        setExchanges: (state, action: PayloadAction<Exchange[]>) => {
            state.exchanges = action.payload;
        },
        setNews: (state, action: PayloadAction<News[]>) => {
            state.news = action.payload;
        }
    }
});

const { setCoins, setExchanges, setNews } = homeSlice.actions;

const retrieveCoinsAction = (dispatch: AppDispatch) => {
    return coinsService.retrieve({ offset: 0 }).pipe(
        tap(data => {
            dispatch(setCoins(data.slice(0, 12)));
        })
    );
}

const retrieveExchangesAction = (dispatch: AppDispatch) => {
    return exchangesService.retrieve({ page: 1 }).pipe(
        tap(data => {
            dispatch(setExchanges(data.slice(0, 12)));
        })
    );
}

const retrieveNewsAction = (dispatch: AppDispatch) => {
    return newsService.retrieve({ offset: 0 }).pipe(
        tap(data => {
            dispatch(setNews(data.slice(0, 12)));
        })
    );
}

export { homeSlice, retrieveCoinsAction, retrieveExchangesAction, retrieveNewsAction };