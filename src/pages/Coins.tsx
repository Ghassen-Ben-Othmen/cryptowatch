import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Subject, takeUntil } from 'rxjs';
import CoinsList from '../components/CoinsList';
import { retrieveCoinsAction } from '../store/coinsSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

function Coins() {

    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    // used to unsubscribe from action calls (in combination with takeUntil)
    const [destroy$] = useState(new Subject<void>());

    const coinsState = useAppSelector(state => state.coins);
    const dispatch = useAppDispatch();

    const retrieveCoins = () => {
        return retrieveCoinsAction(coinsState, dispatch, offset).pipe(
            takeUntil(destroy$)
        ).subscribe(res => {
            if (offset === 0) { // reset loading for initial call
                setLoading(false);
            }
            if (res.length < 24) {
                setHasMore(false);
            }
            if (res.length > 0) { // we don't need to increment the offset if there is no more data to fetch
                setOffset(offset + 1);
            }
        });
    }

    useEffect(() => {
        retrieveCoins();

        return () => {
            destroy$.next();
            destroy$.complete();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) return <div>loading...</div>

    return (
        <InfiniteScroll style={{ overflow: "inherit" }}
            next={retrieveCoins} dataLength={coinsState.data.length}
            hasMore={hasMore}
            loader={<div>Loading..</div>}
        >
            <Grid container spacing={2}>
                <CoinsList coins={coinsState.data} />
            </Grid>
        </InfiniteScroll>
    );
}

export default Coins;
