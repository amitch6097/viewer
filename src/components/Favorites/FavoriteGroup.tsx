import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { IFavoriteGroup } from '../../../typings/base';
import { FavoriteIcon } from './FavoriteIcon';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

export interface IFavoriteGroupProps {
    group: IFavoriteGroup;
    onClick: () => void;
    selected: boolean;
}

export function FavoriteGroup(props: IFavoriteGroupProps) {
    const updatedAgo = timeAgo.format(new Date( props.group.updatedAt));
    const updatedText = props.selected === undefined ? updatedAgo : props.selected ? 'Added To List' : "Removed From List"
    return (
        <ListItem button onClick={props.onClick}>
            <ListItemText
                primary={props.group.label}
                secondary={`${props.group.length} businesses - ${updatedText}`}
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
