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

export interface IFavoriteGroupState {
    text: string;
    number: number;
    initialSelection: boolean
}

export class FavoriteGroup  extends React.Component<IFavoriteGroupProps, IFavoriteGroupState> {

    state: IFavoriteGroupState;
    props: IFavoriteGroupProps;

    constructor(props: IFavoriteGroupProps) {
        super(props);

        const updatedAgo = timeAgo.format(new Date( this.props.group.updatedAt));
        this.state = {
            initialSelection: this.props.selected,
            number: this.props.group.length,
            text: updatedAgo
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.selected !== prevProps.selected) {
            if (this.props.selected) {
                this.setState({
                    number: this.state.initialSelection ? this.props.group.length : this.props.group.length + 1,
                    text: 'Added To List'
                })
            } else {
                this.setState({
                    number: this.state.initialSelection ? this.props.group.length - 1: this.props.group.length,
                    text: "Removed From List"
                })
            }
        }
    }

    render() {
        return (
            <ListItem button onClick={this.props.onClick}>
                <ListItemText
                    primary={this.props.group.label}
                    secondary={`${this.state.number} businesses - ${this.state.text}`}
                />
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        aria-label="toggle favorite"
                        onClick={this.props.onClick}
                    >
                        <FavoriteIcon selected={this.props.selected} />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}