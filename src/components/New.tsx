import React from 'react';
import NewsModel from '../models/news';
import { ButtonBase, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

interface Props {
    newz: NewsModel;
}

function New({ newz }: Props) {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <ButtonBase style={{ textAlign: 'left' }} href={newz.link} target={"_blank"}>
                <Card sx={{ width: 245, height: 245 }}>
                    <CardMedia
                        component="img"
                        height="80"
                        image={newz.media || ""}
                        alt=""
                    />
                    <CardContent style={{ paddingBottom: 0, paddingTop: "10px", maxHeight: "135px", textOverflow: "ellipsis", overflow: "hidden" }}>
                        <Typography gutterBottom variant="body2" component="div" dangerouslySetInnerHTML={{ __html: newz.title }}>
                        </Typography>
                        <Typography variant="caption" color="text.secondary" dangerouslySetInnerHTML={{ __html: newz.summary }}>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Typography noWrap variant='caption' flexGrow={1}>{formatDistanceToNow(new Date(newz.published_date), { addSuffix: true })}</Typography>
                        {newz.author && <Typography noWrap variant='caption'>@{newz.author}</Typography>}
                    </CardActions>
                </Card>
            </ButtonBase>
        </Grid>
    );
}

export default New;
