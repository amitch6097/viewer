import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import { FavoriteGroupsList } from './FavoriteGroupsList';
import { FavoriteAddGroup } from './FavoriteAddGroup';
import { FavoriteBusinessResult } from './FavoriteBusinessResult';
import { IBusiness, IFavoriteGroup } from 'typings/base';

export interface IFavoriteProps {
    onSaveGroup: (text: string) => void;
    business: IBusiness;
    favoriteGroups: Record<string, IFavoriteGroup>;
}

const useStyles = makeStyles({
    root: {},
});

export function Favorite(props: IFavoriteProps) {
    const classes = useStyles();
    return (
        <Grid className={classes.root}>
            <FavoriteBusinessResult business={props.business} />
            <Divider />
            <FavoriteAddGroup onSave={props.onSaveGroup} />
            <Divider />
            <FavoriteGroupsList favoriteGroups={props.favoriteGroups} />
        </Grid>
    );
}
