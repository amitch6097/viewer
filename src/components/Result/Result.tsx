import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import { IBusinessListing } from 'typings/types';
import { strings } from '../../strings';

export interface IResultProps {
    business: IBusinessListing;
    onClick: () => void;
}

const useStyles = makeStyles((theme) => ({
    root: {},
    card: {},
    cardActionArea: {
        display: 'flex',
        flexDirection: 'row',
    },
    cardMedia: {
        width: 200,
        height: 200,
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    cardContentTop: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardContentTopLeft: {},
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
}));

export function Result(props: IResultProps) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardActionArea onClick={props.onClick} className={classes.cardActionArea}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={props.business?.image?.url ?? "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Florida_Box_Turtle_Digon3_re-edited.jpg/440px-Florida_Box_Turtle_Digon3_re-edited.jpg"}
                        title=""
                    />
                    <CardContent className={classes.cardContent}>
                        <div className={classes.cardContentTop}>
                            <div className={classes.cardContentTopLeft}>
                                <Typography component="h5" variant="h5">
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
                            <div className={classes.cardContentTopRight}>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    {props.business.phone}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    {props.business.address.name}
                                </Typography>
                            </div>
                        </div>
                        <div className={classes.cardContentBottom}>
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
                                                    {strings.filters[key].label}
                                                </Typography>
                                            </div>
                                        );
                                    })}
                            </div>

                            <Typography variant="body1" color="textSecondary">
                                {props.business.about}
                            </Typography>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}
