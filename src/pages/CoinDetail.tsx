import { Avatar, ButtonBase, Card, CardActions, CardContent, CardHeader, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography, Tooltip as MuiTooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { retrieveCoinDetailAction } from '../store/coinDetailSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';
import FacebookIcon from '@mui/icons-material/Facebook';
import LanguageIcon from '@mui/icons-material/Language';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box } from '@mui/system';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'Price History',
        },
    },
};

const TitleHeader = ({ name, change }: { name: string; change: number }) => (
    <Stack direction="row">
        <Typography variant='body2' marginRight={4}>{name}</Typography>

        <Stack direction="row">
            {change > 0 ? <ArrowDropUpIcon color={"success"} /> : <ArrowDropDownIcon color={"error"} />}
            {change > 0 ?
                <Typography variant='body2' color={"green"}>{change}</Typography>
                : <Typography variant='body2' color={"red"}>{change * -1}</Typography>}
        </Stack>
    </Stack>
);

function CoinDetail() {
    const [loading, setLoading] = useState(true);
    const [historyPeriod, setHistoryPeriod] = useState("3h"); // used for chartjs changing period

    const { data, history } = useAppSelector(state => state.coinDetail);
    const navbarState = useAppSelector(state => state.navbar);

    const dispatch = useAppDispatch();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!navbarState.stats?.data) return; // wait until navbar call is resolved to get some data
        const subscription = retrieveCoinDetailAction(dispatch, id!).subscribe(_ => {
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, navbarState])

    const historyData = { // used for chartjs
        labels: history.map(h => new Date(h.timestamp).toLocaleString()),
        datasets: [
            {
                label: 'Price',
                data: history.map(h => parseInt(h.price, 10)),
                borderColor: data.color!,
                backgroundColor: data.color!,
            }
        ]
    }

    if (loading) return <div>Loading...</div>

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" src={data.iconUrl || ""}>
                            R
                        </Avatar>
                    }
                    title={<TitleHeader name={data.name} change={Number(data.change)} />}
                    subheader={data.symbol}
                />
                <Typography variant='body1' dangerouslySetInnerHTML={{ __html: data.description }} />
                <section style={{ marginTop: "1.5rem" }}>
                    <Stack direction={"row"}>
                        <div style={{ flexGrow: 1 }}></div>
                        <FormControl sx={{ m: 1, minWidth: 100 }}>
                            <InputLabel id="demo-simple-select-label">Period</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Period"
                                value={historyPeriod}
                                onChange={(e) => setHistoryPeriod(e.target.value)}
                            >
                                <MenuItem selected value={"3h"}>3h</MenuItem>
                                <MenuItem value={"24h"}>24h</MenuItem>
                                <MenuItem value={"7d"}>7d</MenuItem>
                                <MenuItem value={"30d"}>30d</MenuItem>
                                <MenuItem value={"1y"}>1y</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Line options={options} data={historyData} />
                </section>
            </Grid>
            <Grid item xs={12} md={4}>
                <Box style={{ position: "sticky", top: "55px" }}>
                    <React.Fragment>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant='h5' sx={{ mb: 2 }} fontWeight={"bold"}>Price & Stats</Typography>
                                <section style={{ marginBottom: "1.5rem" }}>
                                    <Typography variant="body1" color={"grey"}>Price</Typography>
                                    <Divider variant="fullWidth" sx={{ mb: 2 }} />
                                    <Stack direction={"row"}>
                                        <Typography variant='caption' flexGrow={1}>
                                            Price {data.priceAt && `(${new Date(data.priceAt).toLocaleDateString()})`}
                                        </Typography>
                                        <Typography variant='caption' fontWeight={"bold"}>
                                            $ {Number(data.price).toFixed(2)}
                                        </Typography>
                                    </Stack>
                                    <Stack direction={"row"}>
                                        <Typography variant='caption' flexGrow={1}>
                                            Highest Price ({new Date(data.allTimeHigh.timestamp).toLocaleDateString()})
                                        </Typography>
                                        <Typography variant='caption' fontWeight={"bold"}>
                                            $ {Number(data.allTimeHigh.price).toFixed(2)}
                                        </Typography>
                                    </Stack>
                                </section>
                                <section style={{ marginBottom: "1.5rem" }}>
                                    <Typography variant="body1" color={"grey"}>Market</Typography>
                                    <Divider variant="fullWidth" sx={{ mb: 2 }} />
                                    <Stack direction={"row"}>
                                        <Typography variant='caption' flexGrow={1}>Trading Vol. (24h)</Typography>
                                        <Typography variant='caption' fontWeight={"bold"}>
                                            $ {Number(data['24hVolume']).toFixed(2)}
                                        </Typography>
                                    </Stack>
                                    <Stack direction={"row"}>
                                        <Typography variant='caption' flexGrow={1}>Market Cap.</Typography>
                                        <Typography variant='caption' fontWeight={"bold"}>
                                            $ {Number(data.marketCap).toFixed(2)}
                                        </Typography>
                                    </Stack>
                                    <Stack direction={"row"}>
                                        <Typography variant='caption' flexGrow={1}>Vol. / Market Cap.</Typography>
                                        <Typography variant='caption' fontWeight={"bold"}>
                                            {(Number(data['24hVolume']) / Number(data.marketCap)).toFixed(3)}
                                        </Typography>
                                    </Stack>
                                    <Stack direction={"row"}>
                                        <Typography variant='caption' flexGrow={1}>Market Dominanace</Typography>
                                        <Typography variant='caption' fontWeight={"bold"}>
                                            {((Number(data.marketCap) / Number(navbarState.stats.data.totalMarketCap)) * 100).toFixed(3)}%
                                        </Typography>
                                    </Stack>
                                    <Stack direction={"row"}>
                                        <Typography variant='caption' flexGrow={1}>Number Of Markets</Typography>
                                        <Typography variant='caption' fontWeight={"bold"}>{data.numberOfMarkets}</Typography>
                                    </Stack>
                                    <Stack direction={"row"}>
                                        <Typography variant='caption' flexGrow={1}>Number Of Exchanges</Typography>
                                        <Typography variant='caption' fontWeight={"bold"}>{data.numberOfExchanges}</Typography>
                                    </Stack>
                                    <Stack direction={"row"}>
                                        <Typography variant='caption' flexGrow={1}>Rank</Typography>
                                        <Typography variant='caption' fontWeight={"bold"}>#{data.rank}</Typography>
                                    </Stack>
                                </section>
                                <section style={{ marginBottom: "1.5rem" }}>
                                    <Typography variant="body1" color={"grey"}>Supply</Typography>
                                    <Divider variant="fullWidth" sx={{ mb: 2 }} />
                                    <Stack direction={"row"}>
                                        <Typography variant='caption' flexGrow={1}>Circulating</Typography>
                                        <Typography variant='caption' fontWeight={"bold"}>
                                            {data.supply.circulating}{' '}{data.symbol}
                                        </Typography>
                                    </Stack>
                                    <Stack direction={"row"}>
                                        <Typography variant='caption' flexGrow={1}>Total</Typography>
                                        <Typography variant='caption' fontWeight={"bold"}>
                                            {
                                                data.supply.total ? (
                                                    data.supply.total
                                                ) : 'N/A'
                                            }
                                        </Typography>
                                    </Stack>
                                </section>
                            </CardContent>
                            <CardActions sx={{ flexWrap: "wrap" }}>
                                {
                                    data.links.map(link => {
                                        let linkIcon = <LanguageIcon />
                                        switch (link.type) {
                                            case 'reddit':
                                                linkIcon = <RedditIcon sx={{ color: "#FF5700" }} />;
                                                break;
                                            case 'facebook':
                                                linkIcon = <FacebookIcon sx={{ color: "##3b5998" }} />;
                                                break;
                                            case 'twitter':
                                                linkIcon = <TwitterIcon sx={{ color: "#00acee" }} />;
                                                break;
                                            case 'linkedin':
                                                linkIcon = <LinkedInIcon sx={{ color: "#0077b5" }} />;
                                                break;
                                            case 'youtube':
                                                linkIcon = <YouTubeIcon color='error' />;
                                        }

                                        return (
                                            <MuiTooltip key={link.url} title={link.name}>
                                                <ButtonBase sx={{ mx: 2, my: 1 }} href={link.url} target={"_blank"}>
                                                    {linkIcon}
                                                </ButtonBase>
                                            </MuiTooltip>
                                        );
                                    })
                                }
                            </CardActions>
                        </Card>
                    </React.Fragment>
                </Box>
            </Grid>
        </Grid>
    );
}

export default CoinDetail;
