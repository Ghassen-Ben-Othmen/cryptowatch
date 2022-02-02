import React, { useEffect } from 'react';
import { Grid, styled, Typography } from '@mui/material';
import { initAction } from '../store/homeSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Coins from '../components/Coins';
import Exchanges from '../components/Exchanges';

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
            </section>
            <section style={{ marginBottom: '1.5rem' }}>
                <Title variant='h5'>Top Exchanges</Title>
                <Grid container spacing={2}>
                    <Exchanges exchanges={homeState.exchanges.data} />
                </Grid>
            </section>
        </React.Fragment>
    );
}

export default Home;
