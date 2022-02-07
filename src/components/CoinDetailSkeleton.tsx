import React from 'react';
import { CardHeader, Grid, Skeleton, Stack } from '@mui/material';
import { Box } from '@mui/system';

type Props = {};

function CoinDetailSkeleton({ }: Props) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <CardHeader
                    avatar={
                        <Skeleton variant="circular" width={40} height={40} />
                    }
                    title={<Skeleton width={60} />}
                    subheader={<Skeleton width={60} />}
                />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton width={60} />
                <section style={{ marginTop: "1.5rem" }}>
                    <Stack direction={"row"}>
                        <div style={{ flexGrow: 1 }}></div>
                        <Skeleton width={20} />
                    </Stack>
                    <Skeleton variant="rectangular" height={300} />
                </section>
            </Grid>
            <Grid item xs={12} md={4}>
                <Box style={{ position: "sticky", top: "55px" }}>
                    <Skeleton variant="rectangular" height={400} />
                </Box>
            </Grid>
        </Grid>
    );
}

export default CoinDetailSkeleton;
