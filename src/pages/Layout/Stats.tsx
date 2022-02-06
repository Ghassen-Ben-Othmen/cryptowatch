import React from 'react';
import Typography from '@mui/material/Typography';
import GlobalStats from '../../models/globalStats';
import { Divider, Stack } from '@mui/material';

interface Props {
    stats: GlobalStats,
    currencySign: string | null
}

function Stats({ stats, currencySign }: Props) {
    return (
        <React.Fragment>
            {
                stats.data &&
                <React.Fragment>
                    <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={2}
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems={'center'}
                        >
                            <Typography variant="caption" style={{ marginRight: 4 }}>Coins:</Typography>
                            <Typography variant="caption" color={'primary'} style={{ fontWeight: 'bold' }}>{stats.data.totalCoins}</Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems={'center'}
                        >
                            <Typography variant="caption" style={{ marginRight: 4 }}>Exchanges:</Typography>
                            <Typography variant="caption" color={'primary'} style={{ fontWeight: 'bold' }}>{stats.data.totalExchanges}</Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems={'center'}
                        >
                            <Typography variant="caption" style={{ marginRight: 4 }}>Market Cap:</Typography>
                            <Typography variant="caption" color={'primary'} style={{ fontWeight: 'bold' }}>{currencySign}{' '}{Number(stats.data.totalMarketCap).toFixed(3)}</Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems={'center'}
                        >
                            <Typography variant="caption" style={{ marginRight: 4 }}>Markets:</Typography>
                            <Typography variant="caption" color={'primary'} style={{ fontWeight: 'bold' }}>{stats.data.totalMarkets}</Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems={'center'}
                        >
                            <Typography variant="caption" style={{ marginRight: 4 }}>24h Vol:</Typography>
                            <Typography variant="caption" color={'primary'} style={{ fontWeight: 'bold' }}>{currencySign}{' '}{Number(stats.data.total24hVolume).toFixed(3)}</Typography>
                        </Stack>
                    </Stack>
                </React.Fragment>
            }
        </React.Fragment>
    );
}

export default Stats;
