import React from 'react';
import { Card, CardContent, CardHeader, Grid, Skeleton, Stack } from '@mui/material';

function ExchnageSkeleton() {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card sx={{ width: 245, height: '100%' }}>
                <CardHeader
                    avatar={
                        <Skeleton variant="circular" width={40} height={40} />
                    }
                    title={<Skeleton />}
                    subheader={<Skeleton />}
                />
                <CardContent>
                    <Stack direction="row" spacing={1}>
                        <Skeleton width={"40%"} />
                        <Skeleton width={"40%"} />
                    </Stack>
                    <Stack direction="row" spacing={1} marginBottom={2}>
                        <Skeleton width={"40%"} />
                        <Skeleton width={"40%"} />
                    </Stack>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default ExchnageSkeleton;
