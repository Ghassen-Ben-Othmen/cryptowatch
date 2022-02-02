import React, { useEffect } from 'react';
import { Box, Button, Grid, Link, styled, Typography } from '@mui/material';
import { initAction } from '../store/homeSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Coins from '../components/Coins';
import Exchanges from '../components/Exchanges';
import News from '../components/News';

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

    const homeState = useAppSelector(state => state.home);
    const dispatch = useAppDispatch();

    useEffect(() => {
        initAction(dispatch);
    }, [dispatch]);

    return (
        <React.Fragment>
            <section style={{ marginBottom: '1.5rem' }}>
                <Title variant='h5'>Top Coins</Title>
                <Grid container spacing={2}>
                    <Coins coins={homeState.coins.data} />
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                    <Link
                        component="button"
                        variant="body2"
                        textAlign={"center"}
                    >
                        Show More
                    </Link>
                </Box>
            </section>
            <section style={{ marginBottom: '1.5rem' }}>
                <Title variant='h5'>Top Exchanges</Title>
                <Grid container spacing={2}>
                    <Exchanges exchanges={homeState.exchanges.data} />
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                    <Link
                        component="button"
                        variant="body2"
                        textAlign={"center"}
                    >
                        Show More
                    </Link>
                </Box>
            </section>
            <section style={{ marginBottom: '1.5rem' }}>
                <Title variant='h5'>Coins News</Title>
                <Grid container spacing={2}>
                    <News news={homeState.news.data} />
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                    <Link
                        component="button"
                        variant="body2"
                        textAlign={"center"}
                    >
                        Show More
                    </Link>
                </Box>
            </section>
        </React.Fragment>
    );
}

export default Home;
