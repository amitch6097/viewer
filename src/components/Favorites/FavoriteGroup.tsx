import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { IFavoriteGroup } from '../../../typings/base';
import { FavoriteIcon } from './FavoriteIcon';


export interface IFavoriteGroupProps {
    group: IFavoriteGroup;
    onClick: () => void;
    selected: boolean;
}

export function FavoriteGroup(props: IFavoriteGroupProps) {
    return (
        <ListItem button onClick={props.onClick}>
            <ListItemText
                primary={props.group.label}
                secondary={`${props.group.length} businesses - ${new Date(
                    props.group.updatedAt
                )}`}
            />
            <ListItemSecondaryAction>
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={props.onClick}
                >
                    <FavoriteIcon selected={props.selected} />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}
