import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import React from 'react';
import { IFavoriteGroup } from '../../../typings/base';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

export interface IFavoritesListCardProps {
    group: IFavoriteGroup;
    onClick?: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '345px',
        },
        imageContainer: {
            display: 'flex',
            flexDirection: 'row',
            height: '20vh',
            minHeight: '200px',
            minWidth: '200px',
        },
        image: {
            flex: '1',
        },
        imageRight: {
            display: 'flex',
            flex: '1',
        },
    })
);

const placeholder =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Florida_Box_Turtle_Digon3_re-edited.jpg/440px-Florida_Box_Turtle_Digon3_re-edited.jpg';

export function FavoritesListCard(props: IFavoritesListCardProps) {
    const classes = useStyles();
    const updatedAgo = timeAgo.format(new Date(props.group.updatedAt));
    const image = props.group?.images?.length
        ? props.group?.images[0]
        : placeholder;
    return (
        <Card className={classes.root}>
            <CardActionArea onClick={props.onClick}>
                <Grid className={classes.imageContainer}>
                    <CardMedia
                        className={classes.image}
                        image={image}
                    ></CardMedia>
                    <Grid direction="column" className={classes.imageRight}>
                        <CardMedia
                            className={classes.image}
                            image={image}
                        ></CardMedia>
                        <CardMedia
                            className={classes.image}
                            image={image}
                        ></CardMedia>
                    </Grid>
                </Grid>
                <CardContent>
                    <Typography component="h5" variant="h5">
                        {props.group.label}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {props.group.length + ' businesses'}
                    </Typography>
                    <Typography>{`last updated ${updatedAgo}`}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export function FavoritesListCardSkelton() {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <Grid className={classes.imageContainer} spacing={5}>
                    <Skeleton
                        height="100%"
                        className={classes.image}
                        variant="rect"
                        style={{ margin: '5px' }}
                    />
                    <Grid
                        spacing={5}
                        direction="column"
                        className={classes.imageRight}
                    >
                        <Skeleton
                            style={{ margin: '5px' }}
                            className={classes.image}
                            variant="rect"
                        />
                        <Skeleton
                            style={{ margin: '5px' }}
                            className={classes.image}
                            variant="rect"
                        />
                    </Grid>
                </Grid>
                <CardContent>
                    <Skeleton variant="text" />
                    <Skeleton variant="text" width="50%" />
                    <Skeleton variant="text" />
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
