import React from 'react';
import { Avatar, ButtonBase, Card, CardHeader, Grid, Stack, Typography } from '@mui/material';
import ExchangeModel from '../models/exchange';

const TitleHeader = ({ name, score }: { name: string; score: number }) => {
    let scoreColor = null;
    if (score > 7) {
        scoreColor = "green"
    } else if (score > 4) {
        scoreColor = "orange"
    } else {
        scoreColor = "red";
    }

    return (
        <Stack direction="row">
            <Typography variant='body2' flexGrow={1}>{name}</Typography>

            <Stack direction="row">
                <Typography variant='body2' style={{ marginRight: "0.5rem" }}>Score:</Typography>
                <Typography variant='body2' color={scoreColor}>{score}</Typography>
            </Stack>
        </Stack>
    );
}

interface Props {
    exchange: ExchangeModel;
}

function Exchange({ exchange }: Props) {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <ButtonBase style={{ textAlign: 'left', height: '100%' }}>
                <Card sx={{ width: 250, height: '100%' }}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" src={exchange.image || ''}>
                                EX
                            </Avatar>
                        }
                        title={<TitleHeader name={exchange.name} score={exchange.trust_score} />}
                        subheader={exchange.id}
                    />
                </Card>
            </ButtonBase>
        </Grid>
    );
}

export default Exchange;
