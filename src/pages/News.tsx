import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Subject, takeUntil } from 'rxjs';
import NewsList from '../components/NewsList';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { retrieveNewsAction } from '../store/newsSlice';

function News() {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [destroy$] = useState(new Subject<void>());

    const newsState = useAppSelector(state => state.news);
    const dispatch = useAppDispatch();

    const retrieveNews = () => {
        retrieveNewsAction(newsState, dispatch, page).pipe(
            takeUntil(destroy$)
        ).subscribe(res => {
            if (page === 1) { // reset loading for initial call
                setLoading(false);
            }
            if (res.length < 24) {
                setHasMore(false);
            }
            if (res.length > 0) { // we don't need to increment the offset if there is no more data to fetch
                setPage(page + 1);
            }
        });
    }

    useEffect(() => {
        retrieveNews();

        return () => {
            destroy$.next();
            destroy$.complete();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) return <div>Loading...</div>

    return (
        <InfiniteScroll style={{ overflow: "inherit" }} next={retrieveNews} dataLength={newsState.data.length} hasMore={hasMore} loader={<div>Loading..</div>}>
            <Grid container spacing={2}>
                <NewsList news={newsState.data} />
            </Grid>
        </InfiniteScroll>
    );
}

export default News;
