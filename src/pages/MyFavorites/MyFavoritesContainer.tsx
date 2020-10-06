import { groupEnd } from 'console';
import React from 'react';
import { EViewState } from '../../../typings/base';
import { Business } from '../../lib/Business';
import { FavoriteGroups } from '../../lib/FavoriteGroups';
import { API } from '../../services';
import { MyFavoriteBusinessesView } from './MyFavoriteBusinessesView';
import { MyFavoritesView } from './MyFavoritesView';

export interface IMyFavoritesContainerProps {
    favoriteGroupId?: string;
    onClickFavoriteGroup: (favoriteGroupId: string) => void;
    onClickBusiness: (businessId: string) => void;
}

export interface IMyFavoritesContainerState {
    favoriteGroupId?: string;
    favoriteGroups?: FavoriteGroups;
    state: EViewState;
    businesses: Business[];
}

export class MyFavoritesContainer extends React.Component<
    IMyFavoritesContainerProps,
    IMyFavoritesContainerState
> {
    state: IMyFavoritesContainerState;

    constructor(props: IMyFavoritesContainerProps) {
        super(props);
        this.state = {
            state: EViewState.LOADING,
            favoriteGroups: undefined,
            favoriteGroupId: this.props.favoriteGroupId,
            businesses: undefined,
        };
    }

    componentDidMount() {
        if (this.state.favoriteGroupId) {
            this.fetchBusinessesForFavoriteGroup(this.state.favoriteGroupId);
        } else {
            this.fetchFavorites();
        }
    }

    fetchFavorites = async () => {
        const favoriteGroups = await API.getFavoriteGroups();
        this.setState({
            favoriteGroups,
            state: favoriteGroups.length ? EViewState.DONE : EViewState.EMPTY,
        });
    };

    fetchBusinessesForFavoriteGroup = async (groupId: string) => {
        const favoriteGroups = await API.getFavoriteGroups();
        const businesses = await API.getBusinessesForFavoriteGroup(groupId);
        this.setState({
            businesses,
            favoriteGroups,
            state: businesses.length ? EViewState.DONE : EViewState.EMPTY,
        });
    };

    handleClickGroup = async (groupId: string) => {
        this.setState({
            favoriteGroupId: groupId,
            state: EViewState.LOADING,
        });
        this.props.onClickFavoriteGroup(groupId);
        // await this.fetchBusinessesForFavoriteGroup(groupId);
    };

    handleClickBusiness = async (businessId: string) => {
        this.props.onClickBusiness(businessId);
    };

    render() {
        return this.state.favoriteGroupId ? (
            <MyFavoriteBusinessesView
                businesses={this.state?.businesses}
                state={this.state.state}
                onClickBusiness={this.handleClickBusiness}
                group={this.state.favoriteGroups?.data?.find((group) => group.id === this.state.favoriteGroupId)}
            />
        ) : (
            <MyFavoritesView
                favoriteGroups={this.state?.favoriteGroups?.getInOrder()}
                state={this.state.state}
                onClickGroup={this.handleClickGroup}
            />
        );
    }
}
