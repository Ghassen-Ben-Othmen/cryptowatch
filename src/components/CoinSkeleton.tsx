import React from 'react';
import { Card, CardContent, CardHeader, Grid, Skeleton, Stack } from '@mui/material';


function CoinSkeleton() {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card sx={{ width: 245, height: 245 }}>
                <CardHeader
                    avatar={
                        <Skeleton variant="circular" width={40} height={40} />
                    }
                    title={<Skeleton variant="text" />}
                    subheader={<Skeleton variant="text" />}
                />
                <CardContent>
                    <Stack direction="row" spacing={1}>
                        <Skeleton variant="text" width={"20%"} />
                        <Skeleton variant="text" width={"20%"} />
                    </Stack>
                    <Stack direction="row" spacing={1} marginBottom={2}>
                        <Skeleton variant="text" width={"20%"} />
                        <Skeleton variant="text" width={"20%"} />
                    </Stack>
                    <Skeleton variant="rectangular" width={200} height={90} />
                </CardContent>
            </Card>
        </Grid>
    );
}

export default CoinSkeleton;
