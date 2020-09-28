import React from 'react';
import { FavoriteGroups } from '../../lib/FavoriteGroups';
import { API } from '../../services';

export interface IMyFavoritesContainerState {
    favoriteGroups: FavoriteGroups
}


export class MyFavoritesContainer extends React.Component<any, IMyFavoritesContainerState> {

    componentDidMount() {
        this.fetchFavorites();
    }

    async fetchFavorites() {
        const favoriteGroups = await API.getFavoriteGroups();
        this.setState({
            favoriteGroups
        })
    }

    render() {
        return <div></div>
    }
}