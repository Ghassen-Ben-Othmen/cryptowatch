import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Observable, tap } from "rxjs";
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

const retrieveCoinsAction = (dispatch: AppDispatch): Observable<Coin[]> => {
    return coinsService.retrieve().pipe(
        tap(data => {
            dispatch(setCoins(data.slice(0, 12)))
        })
    );
}

const retrieveExchangesAction = (dispatch: AppDispatch): Observable<Exchange[]> => {
    return exchnagesService.retrieve().pipe(
        tap(data => {
            dispatch(setExchanges(data));
        })
    )
}

const retrieveNewsAction = (dispatch: AppDispatch): Observable<News[]> => {
    return newsService.retrieve().pipe(
        tap(data => {
            dispatch(setNews(data.slice(0, 12)));
        })
    );
}

export { homeSlice, retrieveCoinsAction, retrieveExchangesAction, retrieveNewsAction };