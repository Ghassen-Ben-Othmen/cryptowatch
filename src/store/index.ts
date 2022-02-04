import { configureStore } from "@reduxjs/toolkit";
import { coinsSlice } from "./coinsSlice";
import { exchangesSlice } from "./exchangesSlice";
import { navbarSlice } from "./navbarSlice";
import { newsSlice } from './newsSlice';

const store = configureStore({
    reducer: {
        navbar: navbarSlice.reducer,
        coins: coinsSlice.reducer,
        exchanges: exchangesSlice.reducer,
        news: newsSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;