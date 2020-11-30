import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import { IFavoriteGroup } from 'typings/base';
import { IBusinessListing } from 'typings/types';
import { FavoriteAddGroup } from './FavoriteAddGroup';
import { FavoriteBusinessResult } from './FavoriteBusinessResult';
import { FavoriteGroupsList } from './FavoriteGroupsList';
import { FavoritesListCardSkelton } from './FavoritesListCard';
import { FavoritesListHeaderSkeleton } from './FavoritesListHeader';

export interface IFavoriteProps {
    onSaveGroup: (text: string) => Promise<void>;
    business: IBusinessListing;
    favoriteGroups: IFavoriteGroup[];
    selected: Record<string, boolean>;
    onClickFavoriteGroup: (groupId: string) => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    skeleton: {
        margin: theme.spacing(1),
        width: '100%',
        height: '60px',
    },
}));

export function Favorite(props: IFavoriteProps) {
    const classes = useStyles();
    return (
        <Grid className={classes.root}>
            <FavoriteBusinessResult business={props.business} />
            <Divider />
            <FavoriteAddGroup onSave={props.onSaveGroup} />
            <Divider />
            <FavoriteGroupsList
                selected={props.selected}
                onClickFavoriteGroup={props.onClickFavoriteGroup}
                favoriteGroups={props.favoriteGroups}
            />
        </Grid>
    );
}

export function FavoriteSkelton() {
    const classes = useStyles();
    return (
        <Grid className={classes.root}>
            <FavoritesListHeaderSkeleton />
            <Grid className={classes.root} container>
                <Skeleton
                    className={classes.skeleton}
                    variant="rect"
                />
                <Skeleton
                    className={classes.skeleton}
                    variant="rect"
                />
                <Skeleton
                    className={classes.skeleton}
                    variant="rect"
                />
            </Grid>
        </Grid>
    );
}
