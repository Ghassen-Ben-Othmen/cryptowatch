import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Observable, tap } from "rxjs";
import { AppDispatch } from ".";
import News from "../models/news";
import { newsService } from "../services";

type NewsState = {
    data: News[];
}

const initState: NewsState = {
    data: []
}

const newsSlice = createSlice({
    name: 'news',
    initialState: initState,
    reducers: {
        setNews: (state, action: PayloadAction<News[]>) => {
            state.data = action.payload;
        }
    }
});

const { setNews } = newsSlice.actions;

const retrieveNewsAction = (state: NewsState, dispatch: AppDispatch, queryParams: any): Observable<News[]> => {
    return newsService.retrieve(queryParams).pipe(
        tap(data => {
            if (queryParams['page'] === 1) {
                dispatch(setNews(data));
            } else {
                dispatch(setNews(state.data.concat(data)));
            }
        })
    );
}

export { newsSlice, retrieveNewsAction };