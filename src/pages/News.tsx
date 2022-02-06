import { ButtonBase, Grid, Skeleton, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Subject, takeUntil } from 'rxjs';
import NewsList from '../components/NewsList';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { retrieveNewsAction } from '../store/newsSlice';
import SearchIcon from '@mui/icons-material/Search';
import NewsListSkeleton from '../components/NewsListSkeleton';

function News() {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [destroy$] = useState(new Subject<void>());
    const [search, setSearch] = useState('');
    const searchRef = useRef<any>(null);

    const newsState = useAppSelector(state => state.news);
    const dispatch = useAppDispatch();

    const retrieveNews = (page: number, search: string) => {
        retrieveNewsAction(newsState, dispatch, { page, q: search }).pipe(
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

    const handleSearch = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (e.target)
            setSearch(e.target.value)
    }

    const handleSearchSubmit = (e?: FormEvent<HTMLFormElement>) => {
        if (!search) return;
        e?.preventDefault();
        searchRef.current?.blur();
        setLoading(true);
        window.scroll({ top: 0 }); // scroll to top to prevent fetching next page
        retrieveNews(1, search);
    }

    useEffect(() => {
        window.scroll({ top: 0 }); // scroll to top to prevent fetching next page
        retrieveNews(page, search);

        return () => {
            destroy$.next();
            destroy$.complete();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 3, position: "sticky", top: 0, paddingTop: "70px", paddingBottom: "10px", zIndex: 10, bgcolor: '#f4f4f4' }}>
                <Grid container>
                    <Grid item xs={0} md={3}></Grid>
                    <Grid item xs={12} md={6} justifyContent={"center"}>
                        <form onSubmit={handleSearchSubmit}>
                            <Stack direction={"row"}>
                                <TextField inputRef={searchRef} value={search} onBlur={() => handleSearchSubmit()} onChange={handleSearch} fullWidth style={{ background: "white" }} id="outlined-basic" label="Search" variant="outlined" size='small' />
                                <ButtonBase onClick={() => handleSearchSubmit()}>
                                    <SearchIcon sx={{ color: 'action.active', ml: 1, height: "40px", width: "40px" }} />
                                </ButtonBase>
                            </Stack>
                        </form>
                    </Grid>
                    <Grid item xs={0} md={3}></Grid>
                </Grid>
            </Box>
            {
                loading ? (
                    <Grid container spacing={2}>
                        <NewsListSkeleton size={24} />
                    </Grid>
                ) : (

                    <InfiniteScroll style={{ overflow: "inherit" }}
                        scrollThreshold={"20px"}
                        next={() => retrieveNews(page, search)}
                        dataLength={newsState.data?.length}
                        hasMore={hasMore}
                        loader={<Skeleton width={"60%"} />}>
                        <Grid container spacing={2}>
                            <NewsList news={newsState.data} />
                        </Grid>
                    </InfiniteScroll>
                )
            }
        </React.Fragment>
    );
}

export default News;
