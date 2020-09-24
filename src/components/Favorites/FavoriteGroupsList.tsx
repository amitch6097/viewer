import React from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import { IFavoriteGroup } from '../../../typings/base';
import { FavoriteGroup } from './FavoriteGroup';


export interface IFavoriteGroupListProps {
    favoriteGroups: Record<string, IFavoriteGroup>;
}

const useStyles = makeStyles({
    root: {},
});

export function FavoriteGroupsList(props: IFavoriteGroupListProps) {
    const classes = useStyles();

    const [selected, setSelected] = React.useState({});

    function onClickFavoriteGroup(key: string) {
        return function () {
            setSelected({
                ...selected,
                [key]: !Boolean(selected[key]),
            });
        };
    }

    const ListItems = React.useMemo(() => {
        return Object.keys(props.favoriteGroups)
            .sort((key1, key2) => {
                const group1: IFavoriteGroup = props.favoriteGroups[key1];
                const group2: IFavoriteGroup = props.favoriteGroups[key2];
                return group2.updatedAt - group1.updatedAt;
            })
            .map((key) => {
                const group: IFavoriteGroup = props.favoriteGroups[key];
                return (
                    <FavoriteGroup
                        key={key}
                        group={group}
                        onClick={onClickFavoriteGroup(key)}
                        selected={selected[key]}
                    />
                );
            });
    }, [props.favoriteGroups, selected]);

    return <List className={classes.root}>{ListItems}</List>;
}
