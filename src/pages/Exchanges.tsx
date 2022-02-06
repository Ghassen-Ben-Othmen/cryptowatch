import { Grid, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Subject, takeUntil } from 'rxjs';
import ExchangesList from '../components/ExchangesList';
import ExchangesListSkeleton from '../components/ExchangesListSkeleton';
import { retrieveExchangesAction } from '../store/exchangesSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

function Exchanges() {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [destroy$] = useState(new Subject<void>());

    const exchangesState = useAppSelector(state => state.exchanges);
    const dispatch = useAppDispatch();

    const retrieveExchanges = () => {
        retrieveExchangesAction(exchangesState, dispatch, { page }).pipe(
            takeUntil(destroy$)
        ).subscribe(res => {
            if (page === 1) { // reset loading for initial call
                setLoading(false);
            }
            if (res.length < 60) { // assuming page size is 60
                setHasMore(false);
            }
            if (res.length > 0) { // we don't need to increment the offset if there is no more data to fetch
                setPage(page + 1);
            }
        })
    }

    useEffect(() => {
        retrieveExchanges();

        return () => {
            destroy$.next();
            destroy$.complete();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) return (
        <Grid container spacing={2}>
            <ExchangesListSkeleton size={24} />
        </Grid>
    );

    return (
        <InfiniteScroll style={{ overflow: "inherit" }}
            next={retrieveExchanges}
            dataLength={exchangesState.data.length}
            hasMore={hasMore}
            loader={<Skeleton width={"60%"} />}
            scrollThreshold={"20px"}
        >
            <Grid container spacing={2}>
                <ExchangesList exchanges={exchangesState.data} />
            </Grid>
        </InfiniteScroll >
    );
}

export default Exchanges;
