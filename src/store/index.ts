import { configureStore } from "@reduxjs/toolkit";
import { coinsSlice } from "./coinsSlice";
import { homeSlice } from "./homeSlice";
import { navbarSlice } from "./navbarSlice";

const store = configureStore({
    reducer: {
        navbar: navbarSlice.reducer,
        home: homeSlice.reducer,
        coins: coinsSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;