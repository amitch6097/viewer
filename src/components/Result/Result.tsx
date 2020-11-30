import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import { IBusinessListing } from '../../../typings/types';
import { strings } from '../../strings';
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid, Box, IconButton } from '@material-ui/core';
import { FavoriteIcon } from '../Favorites';

export interface IResultProps {
    business: IBusinessListing;
    minimal?: boolean;
    imageSize?: number;
    onClick: () => void;
    withFavorite: boolean;
    onClickFavorite?: () => void;
}

const useStyles = makeStyles({
    root: {
        height: (props: IResultProps) =>
            props.minimal ? 'var(--card-minimal-height)' : 'var(--card-height)',
    },
    card: {
        height: (props: IResultProps) =>
            props.minimal ? 'var(--card-minimal-height)' : 'var(--card-height)',
    },
    cardActionArea: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'end',
    },
    cardMedia: {
        width: (props: IResultProps) =>
            props.minimal ? 'var(--card-minimal-height)' : 'var(--card-height)',
        height: (props: IResultProps) =>
            props.minimal ? 'var(--card-minimal-height)' : 'var(--card-height)',
        alignSelf: 'center',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        height: (props: IResultProps) =>
        props.minimal ? 'calc(var(--card-minimal-height) - 32px)' : 'calc(var(--card-height) - 32px)',
        justifyContent: 'space-between',
    },
    cardContentTop: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardContentTopLeft: {
        width: '100%',
    },
    cardTitle: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        maxWidth: '80%',
    },
    cardContentTopRight: {},
    cardContentBottom: {},
    cardContentBottomTags: {
        display: 'flex',
        flexDirection: 'row',
    },
    cardContentBottomTag: {
        display: 'flex',
        flexDirection: 'row',
    },
    locationDivider: {
        background: 'black',
        height: '5px',
        width: '5px',
        borderRadius: '100%',
    },
});

export function Result(props: IResultProps) {
    const classes = useStyles(props);

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardActionArea
                    onClick={props.onClick}
                    className={classes.cardActionArea}
                >
                    <CardMedia
                        className={classes.cardMedia}
                        image={
                            props.business?.image?.url ??
                            'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Florida_Box_Turtle_Digon3_re-edited.jpg/440px-Florida_Box_Turtle_Digon3_re-edited.jpg'
                        }
                        title={props.business.name}
                    />
                    <CardContent className={classes.cardContent}>
                        <div className={classes.cardContentTop}>
                            <div className={classes.cardContentTopLeft}>
                                <Typography
                                    className={classes.cardTitle}
                                    component="h5"
                                    variant="h5"
                                >
                                    {props.business.name}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="textSecondary"
                                >
                                    {
                                        strings.categories[
                                            props.business.category
                                        ]
                                    }
                                </Typography>
                            </div>
                            {props.withFavorite && (
                                <div className={classes.cardContentTopRight}>
                                    <IconButton
                                        edge="end"
                                        aria-label="toggle favorite"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            if (props.onClickFavorite) {
                                                props.onClickFavorite();
                                            }
                                        }}
                                    >
                                        <FavoriteIcon selected={false} />
                                    </IconButton>
                                </div>
                            )}
                        </div>
                        {!props.minimal && (
                            <div className={classes.cardContentBottom}>
                                <Grid container direction="row">
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        {props.business.phone}
                                    </Typography>
                                    {props.business?.address?.name && (
                                        <Box
                                            className={classes.locationDivider}
                                            component="span"
                                            m={1}
                                        />
                                    )}
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        {props.business?.address?.name}
                                    </Typography>
                                </Grid>
                                <div className={classes.cardContentBottomTags}>
                                    {Object.keys(props.business.identify)
                                        .filter((key) => {
                                            return props.business.identify[key]
                                                .selected;
                                        })
                                        .map((key) => {
                                            return (
                                                <div
                                                    className={
                                                        classes.cardContentBottomTag
                                                    }
                                                >
                                                    <DoneIcon />
                                                    <Typography
                                                        variant="body2"
                                                        color="textSecondary"
                                                    >
                                                        {
                                                            strings.filters[key]
                                                                .label
                                                        }
                                                    </Typography>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}

export function ResultSkeleton() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardActionArea className={classes.cardActionArea}>
                    <Skeleton
                        className={classes.cardMedia}
                        variant="rect"
                        style={{ margin: '5px' }}
                    />
                    <CardContent className={classes.cardContent}>
                        <Skeleton variant="text" height={30} />
                        <Skeleton variant="text" width="50%" height={25} />
                        <Skeleton variant="text" height={25} />
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}
