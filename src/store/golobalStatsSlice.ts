import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import GlobalStats from "../models/globalStats";
import { globalStatsService } from '../services';

const globalStatsSlice = createSlice({
    name: 'globalStats',
    initialState: {
        loading: false,
        stats: {}
    },
    reducers: {
        setGlobalStats: (state, action: PayloadAction<GlobalStats>) => {
            state.stats = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    }
});

const { setGlobalStats, setLoading } = globalStatsSlice.actions;

const retrieveGlobalStatsAction = async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true));
    const data = await globalStatsService.retrieve();
    dispatch(setGlobalStats(data));
    dispatch(setLoading(false));
}

export { globalStatsSlice, retrieveGlobalStatsAction };