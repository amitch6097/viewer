import React from 'react';
import { Popup } from '../../components/Popup';
import { Favorite } from '../../components/Favorites';
import { Business } from '../../lib/Business';
import { FavoriteGroups } from '../../lib/FavoriteGroups';
import { API } from '../../services';
import { CircularProgress, ClickAwayListener, Container } from '@material-ui/core';

export interface IFavoritesPopupProps {
    businessId: string;
    business: Business;
    onClose: () => void;
}

export interface IFavoritesPopupState {
    selected: Record<string, boolean>;
    favoriteGroups: FavoriteGroups | undefined;
    idle: boolean;
}

export class FavoritesPopup extends React.Component<
    IFavoritesPopupProps,
    IFavoritesPopupState
> {
    state: IFavoritesPopupState = {
        selected: {},
        idle: true,
        favoriteGroups: undefined,
    };

    componentDidMount() {
        this.fetchFavoriteGroups();
    }

    fetchFavoriteGroups = async() => {
        const favoriteGroups = await API.getFavoriteGroups();
        this.setState({
            favoriteGroups,
            idle: false,
            selected: favoriteGroups.getSelected(this.props.businessId)
        });
    }

    handleSave = async () => {
        this.setState({
            idle: true,
        });
        await API.setBusinessAsFavorite(this.props.businessId, this.state.selected);
        this.setState({
            idle: false,
        });
        this.props.onClose();
    }

    handleSaveGroup = async (text: string) => {
        const favoriteGroups = await this.state.favoriteGroups.createFavoriteGroup(
            text
        );
        // set our new group as selected
        const selected = favoriteGroups.data.reduce((__, favoriteGroup) => {
            if(!__[favoriteGroup.id]) {
                __[favoriteGroup.id] = false;
            }
            return __;
        }, this.state.selected);

        this.setState({
            favoriteGroups,
            selected
        });
    }

    handleClickFavoriteGroup = (groupId: string) => {
        this.setState({
            selected: {
                ...this.state.selected,
                [groupId]: !Boolean(this.state.selected[groupId])
            }
        });
    }

    render() {
        return (
            <Container className="BPB">
                <Popup
                    label={'Favorite Groups'}
                    actionRight="Save"
                    actionLeft="Cancel"
                    onActionLeft={this.props.onClose}
                    onActionRight={this.handleSave}
                    onClose={this.props.onClose}
                >
                    {!this.state.idle ? (
                        <Favorite
                            business={this.props.business}
                            favoriteGroups={this.state.favoriteGroups.getInOrder()}
                            onSaveGroup={this.handleSaveGroup}
                            selected={this.state.selected}
                            onClickFavoriteGroup={this.handleClickFavoriteGroup}
                        />
                    ) : (
                        <CircularProgress />
                    )}
                </Popup>
            </Container>

        );
    }
}
