import { Grid, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Subject, takeUntil } from 'rxjs';
import CoinsList from '../components/CoinsList';
import CoinsListSkeleton from '../components/CoinsListSkeleton';
import { retrieveCoinsAction } from '../store/coinsSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

function Coins() {

    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    // used to unsubscribe from action calls (in combination with takeUntil)
    const [destroy$] = useState(new Subject<void>());

    const coinsState = useAppSelector(state => state.coins);
    const selectedCurrencyRef = useAppSelector(state => state.navbar.selectedCurrency);
    const dispatch = useAppDispatch();

    const retrieveCoins = (offset: number, limit: number) => {
        if (!selectedCurrencyRef.uuid) return;
        return retrieveCoinsAction(coinsState, dispatch, { offset: offset, limit: limit, referenceCurrencyUuid: selectedCurrencyRef.uuid }).pipe(
            takeUntil(destroy$)
        ).subscribe(res => {
            if (offset === 0) { // reset loading for initial call
                setLoading(false);
            }
            if (res.length < 24) {
                setHasMore(false);
            }
            if (res.length > 0) { // we don't need to increment the offset if there is no more data to fetch
                setOffset(offset + limit);
            }
        });
    }

    useEffect(() => {
        if (offset === 0) {
            window.scroll({ top: 0 }); // scroll to top to prevent fetching next page
            retrieveCoins(0, 24);
        } else {
            retrieveCoins(0, offset);
        }

        return () => {
            destroy$.next();
            destroy$.complete();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCurrencyRef])

    if (loading) return (
        <Grid container spacing={2}>
            <CoinsListSkeleton size={24} />
        </Grid>
    );

    return (
        <InfiniteScroll style={{ overflow: "inherit" }}
            next={() => retrieveCoins(offset, 24)} dataLength={coinsState.data.length}
            hasMore={hasMore}
            loader={<Skeleton width={"60%"} />}
            scrollThreshold={"20px"}
        >
            <Grid container spacing={2}>
                <CoinsList coins={coinsState.data} currencySign={selectedCurrencyRef.sign || selectedCurrencyRef.symbol} />
            </Grid>
        </InfiniteScroll>
    );
}

export default Coins;
