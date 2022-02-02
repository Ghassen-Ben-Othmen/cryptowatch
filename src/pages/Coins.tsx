import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CoinsList from '../components/CoinsList';
import { retrieveCoinsAction } from '../store/coinsSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

function Coins() {

    const [loading, setLoading] = useState(true);

    const coinsState = useAppSelector(state => state.coins);
    const dispatch = useAppDispatch();
    console.log(loading)

    useEffect(() => {
        retrieveCoinsAction(dispatch).finally(() => setLoading(false));
    }, [dispatch])

    if (loading) return <div>loading...</div>

    return (
        <Grid container spacing={2}>
            <CoinsList coins={coinsState.data} />
        </Grid>
    );
}

export default Coins;
