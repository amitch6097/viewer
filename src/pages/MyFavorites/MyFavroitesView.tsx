import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { FavoritesListCard } from '../../components/Favorites/FavoritesListCard';
import { IFavoriteGroup } from '../../../typings/base';

export interface IFavoriteGroupListProps {
    favoriteGroups: IFavoriteGroup[];
}

const useStyles = makeStyles({
    root: {},
});

export function MyFavoritesView() {
    const classes = useStyles();
}
