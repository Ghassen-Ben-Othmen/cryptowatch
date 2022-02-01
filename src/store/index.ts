import { configureStore } from "@reduxjs/toolkit";
import { globalStatsSlice } from "./golobalStatsSlice";

const store = configureStore({
    reducer: {
        globalStats: globalStatsSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;