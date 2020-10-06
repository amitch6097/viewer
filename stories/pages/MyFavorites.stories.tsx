import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { Home } from '../../src/pages/Home/Home';
import {
    MyFavoritesView,
    MyFavoriteBusinessesView,
} from '../../src/pages/MyFavorites';
import { FAVORITE_GROUPS_DATA } from '../../__mock__/favorite-groups-data';
import { BUSINESSES_DATA } from '../../__mock__/businesses-data';
import { EViewState } from '../../typings/base';

export default {
    title: 'Pages|MyFavorites',
    component: MyFavoritesView,
    decorators: [withKnobs],
};

export const MyFavoritesViewStory = () => (
    <MyFavoritesView
        onClickGroup={console.log}
        state={select(
            'state',
            {
                Loading: EViewState.LOADING,
                Empty: EViewState.EMPTY,
                Done: EViewState.DONE,
            },
            EViewState.DONE
        )}
        favoriteGroups={FAVORITE_GROUPS_DATA}
    />
);

export const MyFavoriteBusinessesViewStory = () => (
    <MyFavoriteBusinessesView
        onClickBusiness={console.log}
        state={select(
            'state',
            {
                Loading: EViewState.LOADING,
                Empty: EViewState.EMPTY,
                Done: EViewState.DONE,
            },
            EViewState.DONE
        )}
        group={FAVORITE_GROUPS_DATA[0]}
        businesses={BUSINESSES_DATA}
    />
);
