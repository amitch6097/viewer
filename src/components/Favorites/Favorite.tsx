import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { IFavoriteGroup } from 'typings/base';
import { IBusinessListing } from 'typings/types';
import { FavoriteAddGroup } from './FavoriteAddGroup';
import { FavoriteBusinessResult } from './FavoriteBusinessResult';
import { FavoriteGroupsList } from './FavoriteGroupsList';


export interface IFavoriteProps {
    onSaveGroup: (text: string) => Promise<void>;
    business: IBusinessListing;
    favoriteGroups: IFavoriteGroup[];
    selected: Record<string, boolean>;
    onClickFavoriteGroup: (groupId: string) => void;
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },
});

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
