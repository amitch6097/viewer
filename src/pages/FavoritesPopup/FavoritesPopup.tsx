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
                <ClickAwayListener onClickAway={this.props.onClose}>
                    <Popup
                        label={'My Pop Up'}
                        actionRight="Save"
                        onActionRight={this.handleSave}
                    >
                        {!this.state.idle ? (
                            <Favorite
                                business={{
                                    name: 'Hungry Howies',
                                    locationLabel: 'hungryhowies.com',
                                    reviewsLength: 22,
                                    reviewsAverage: 4.25,
                                    imageURL:
                                        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Florida_Box_Turtle_Digon3_re-edited.jpg/440px-Florida_Box_Turtle_Digon3_re-edited.jpg',
                                }}
                                favoriteGroups={this.state.favoriteGroups.getInOrder()}
                                onSaveGroup={this.handleSaveGroup}
                                selected={this.state.selected}
                                onClickFavoriteGroup={this.handleClickFavoriteGroup}
                            />
                        ) : (
                            <CircularProgress />
                        )}
                    </Popup>
                </ClickAwayListener>
            </Container>

        );
    }
}
