import React from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import { IFavoriteGroup } from '../../../typings/base';
import { FavoriteGroup } from './FavoriteGroup';


export interface IFavoriteGroupListProps {
    favoriteGroups: IFavoriteGroup[];
    selected: Record<string, boolean>;
    onClickFavoriteGroup: (groupId: string) => void;
}

const useStyles = makeStyles({
    root: {},
});

export function FavoriteGroupsList(props: IFavoriteGroupListProps) {
    const classes = useStyles();
    const ListItems = React.useMemo(() => {
        return props.favoriteGroups.map((group) => {
                return (
                    <FavoriteGroup
                        key={group.id}
                        group={group}
                        onClick={() => props.onClickFavoriteGroup(group.id)}
                        selected={props.selected[group.id]}
                    />
                );
            });
    }, [props.favoriteGroups, props.selected]);

    return <List className={classes.root}>{ListItems}</List>;
}
