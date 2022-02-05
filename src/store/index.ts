import { configureStore } from "@reduxjs/toolkit";
import { coinDetailSlice } from "./coinDetailSlice";
import { coinsSlice } from "./coinsSlice";
import { exchangesSlice } from "./exchangesSlice";
import { homeSlice } from "./homeSlice";
import { navbarSlice } from "./navbarSlice";
import { newsSlice } from './newsSlice';

const store = configureStore({
    reducer: {
        navbar: navbarSlice.reducer,
        home: homeSlice.reducer,
        coins: coinsSlice.reducer,
        exchanges: exchangesSlice.reducer,
        news: newsSlice.reducer,
        coinDetail: coinDetailSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;