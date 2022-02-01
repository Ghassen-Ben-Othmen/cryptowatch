import { configureStore } from "@reduxjs/toolkit";
import { navbarSlice } from "./navbarSlice";

const store = configureStore({
    reducer: {
        navbar: navbarSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;