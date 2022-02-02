import React, { useEffect, useState } from 'react';
import { Box, Grid, Link, styled, Typography } from '@mui/material';
import { retrieveCoinsAction, retrieveExchangesAction, retrieveNewsAction } from '../store/homeSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import CoinsList from '../components/CoinsList';
import ExchangesList from '../components/ExchangesList';
import NewsList from '../components/NewsList';
import { Link as RouterLink } from 'react-router-dom';

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

    const homeState = useAppSelector(state => state.home);
    const dispatch = useAppDispatch();

    useEffect(() => {
        retrieveCoinsAction(dispatch).finally(() => setCoinsLoading(false));
        retrieveExchangesAction(dispatch).finally(() => setExchangesLoading(false));
        retrieveNewsAction(dispatch).finally(() => setNewsLoading(false));
    }, [dispatch]);

    return (
        <React.Fragment>
            <section style={{ marginBottom: '1.5rem' }}>
                <Title variant='h5'>Top Coins</Title>
                {
                    coinsLoading ? <div>Loading...</div> : (
                        <React.Fragment>
                            <Grid container spacing={2}>
                                <CoinsList coins={homeState.coins.data} />
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
                                <ExchangesList exchanges={homeState.exchanges.data} />
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
                                <NewsList news={homeState.news.data} />
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
