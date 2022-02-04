import React, { useEffect, useState } from 'react';
import { Box, Grid, Link, styled, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import CoinsList from '../components/CoinsList';
import ExchangesList from '../components/ExchangesList';
import NewsList from '../components/NewsList';
import { retrieveCoinsAction } from '../store/coinsSlice';
import { retrieveExchangesAction } from '../store/exchangesSlice';
import { Link as RouterLink } from 'react-router-dom';
import { forkJoin, tap } from 'rxjs';
import { retrieveNewsAction } from '../store/newsSlice';

const Title = styled(Typography)(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    marginBottom: '1.5rem',
    "&:after": {
        content: '""',
        display: 'inline-block',
        width: '100%',
        height: '100%',
        position: 'absolute',
        borderBottom: '1px black solid',
        marginLeft: '1rem'
    }
}));

function Home() {

    const [coinsLoading, setCoinsLoading] = useState(true);
    const [exchangesLoading, setExchangesLoading] = useState(true);
    const [newsLoading, setNewsLoading] = useState(true);

    const coinsState = useAppSelector(state => state.coins);
    const exchangesState = useAppSelector(state => state.exchanges);
    const newsState = useAppSelector(state => state.news);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const retrieveCoins$ = retrieveCoinsAction(coinsState, dispatch, 0).pipe(tap(_ => setCoinsLoading(false)));
        const retrieveExchanges$ = retrieveExchangesAction(exchangesState, dispatch, 1).pipe(tap(_ => setExchangesLoading(false)));
        const retrieveNews$ = retrieveNewsAction(newsState, dispatch, 1).pipe(tap(_ => setNewsLoading(false)));

        const subscription = forkJoin([retrieveCoins$, retrieveExchanges$, retrieveNews$]).subscribe();

        return () => {
            subscription.unsubscribe();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <section style={{ marginBottom: '1.5rem' }}>
                <Title variant='h5'>Top Coins</Title>
                {
                    coinsLoading ? <div>Loading...</div> : (
                        <React.Fragment>
                            <Grid container spacing={2}>
                                <CoinsList coins={coinsState.data.slice(0, 12)} />
                            </Grid>
                            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                                <Link
                                    component={RouterLink}
                                    to={'coins'}
                                    variant="body2"
                                    textAlign={"center"}
                                >
                                    Show More
                                </Link>
                            </Box>
                        </React.Fragment>
                    )
                }
            </section>
            <section style={{ marginBottom: '1.5rem' }}>
                <Title variant='h5'>Top Exchanges</Title>
                {
                    exchangesLoading ? <div>Loading...</div> : (
                        <React.Fragment>
                            <Grid container spacing={2}>
                                <ExchangesList exchanges={exchangesState.data.slice(0, 12)} />
                            </Grid>
                            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                                <Link
                                    component={RouterLink}
                                    to={'exchanges'}
                                    variant="body2"
                                    textAlign={"center"}
                                >
                                    Show More
                                </Link>
                            </Box>
                        </React.Fragment>
                    )
                }
            </section>
            <section style={{ marginBottom: '1.5rem' }}>
                <Title variant='h5'>Coins News</Title>
                {
                    newsLoading ? <div>Loading...</div> : (
                        <React.Fragment>
                            <Grid container spacing={2}>
                                <NewsList news={newsState.data.slice(0, 12)} />
                            </Grid>
                            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                                <Link
                                    component={RouterLink}
                                    to={'news'}
                                    variant="body2"
                                    textAlign={"center"}
                                >
                                    Show More
                                </Link>
                            </Box>
                        </React.Fragment>
                    )
                }
            </section>
        </React.Fragment>
    );
}

export default Home;
