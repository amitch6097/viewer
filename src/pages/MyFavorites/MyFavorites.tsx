import { MyFavoritesContainer } from './MyFavoritesContainer';
import React from 'react';
import {
    goToBusiness,
    goToMyFavoritesFavoriteGroup,
    goToMyFavorites,
} from '../../history';

export function MyFavorites(props) {
    function onClickFavoriteGroup(favoriteGroupId: string) {
        if (props.history) {
            goToMyFavoritesFavoriteGroup(props.history, favoriteGroupId);
        }
    }

    function onClickBusiness(businessId: string) {
        if (props.history) {
            goToBusiness(props.history, businessId);
        }
    }

    function onClickMyFavorites() {
        if (props.history) {
            goToMyFavorites(props.history);
        }
    }

    return (
        <MyFavoritesContainer
            onClickBusiness={onClickBusiness}
            favoriteGroupId={props.match.params.favoriteGroupId}
            onClickFavoriteGroup={onClickFavoriteGroup}
        />
    );
}
