import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

export interface IFavoriteIconProps {
    selected: boolean;
}

const useStyles = makeStyles({
    root: {},
    selected: {
        color: 'red',
    },
});

export function FavoriteIcon(props: IFavoriteIconProps) {
    const classes = useStyles();
    return props.selected ? (
        <Favorite className={classes.selected} />
    ) : (
        <FavoriteBorder className={classes.root} />
    );
}
