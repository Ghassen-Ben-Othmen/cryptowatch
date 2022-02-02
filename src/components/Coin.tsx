import React from 'react';
import CoinModel from '../models/coin';
import { Avatar, ButtonBase, Card, CardContent, CardHeader, Grid, Stack, Typography } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Sparklines, SparklinesLine } from 'react-sparklines';

interface Props {
    coin: CoinModel;
}

const TitleHeader = ({ name, change }: { name: string; change: number }) => (
    <Stack direction="row">
        <Typography variant='body2' flexGrow={1}>{name}</Typography>

        <Stack direction="row">
            {change > 0 ? <ArrowDropUpIcon color={"success"} /> : <ArrowDropDownIcon color={"error"} />}
            {change > 0 ?
                <Typography variant='body2' color={"green"}>{change}</Typography>
                : <Typography variant='body2' color={"red"}>{change * -1}</Typography>}
        </Stack>
    </Stack>
);

function Coin({ coin }: Props) {
    const sparklineData = coin.sparkline.filter(v => !!v).map(v => parseFloat(v!));
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <ButtonBase style={{ textAlign: 'left' }}>
                <Card sx={{ width: 250, height: 250 }}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" src={coin.iconUrl || ''}>
                                C
                            </Avatar>
                        }
                        title={<TitleHeader name={coin.name} change={Number(coin.change)} />}
                        subheader={coin.symbol}
                    />
                    <CardContent>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="caption" flexGrow={1}>Price</Typography>
                            <Typography variant="caption" color={'primary'} style={{ fontWeight: 'bold' }}>$ {Number(coin.price).toFixed(2)}</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} marginBottom={2}>
                            <Typography variant="caption" flexGrow={1}>Market Cap</Typography>
                            <Typography variant="caption" color={'primary'} style={{ fontWeight: 'bold' }}>$ {Number(coin.marketCap).toFixed(2)}</Typography>
                        </Stack>
                        <Sparklines data={sparklineData} width={200} height={90}>
                            <SparklinesLine color={Number(coin.change) > 0 ? "green" : "red"} />
                        </Sparklines>
                    </CardContent>
                </Card>
            </ButtonBase>
        </Grid>
    );
}

export default Coin;
