import React from 'react';
import { AppBar } from '../../src/components/AppBar/AppBar';
import {
    Favorite,
    FavoriteGroupsList,
    FavoriteAddGroup,
    FavoriteBusinessResult,
} from '../../src/components/Favorites';

import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

export default {
    title: 'Components|Favorites',
    component: FavoriteGroupsList,
    decorators: [withKnobs],
};

const BUSINESS = {
    name: 'Hungry Howies',
    locationLabel: 'hungryhowies.com',
    reviewsLength: 22,
    reviewsAverage: 4.25,
    imageURL:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Florida_Box_Turtle_Digon3_re-edited.jpg/440px-Florida_Box_Turtle_Digon3_re-edited.jpg',
};

const FAVORITE_GROUPS = {
    '1': {
        label: 'My First Group',
        createdAt: Number(new Date()),
        updatedAt: Number(new Date()),
        length: 2,
        favoriteIds: [],
    },
    '2': {
        label: 'My Next Group',
        createdAt: Number(new Date()),
        updatedAt: Number(new Date()),
        length: 50,
        favoriteIds: [],
    },
    '3': {
        label: 'My Next Next Group',
        createdAt: Number(new Date()),
        updatedAt: Number(new Date()),
        length: 0,
        favoriteIds: [],
    },
    '4': {
        label: 'My Last Group',
        createdAt: Number(new Date()),
        updatedAt: Number(new Date(new Date().getDate() - 2)),
        length: 11,
        favoriteIds: [],
    },
};

export const FavoriteStory = () => {
    return (
        <Favorite
            business={BUSINESS}
            favoriteGroups={FAVORITE_GROUPS}
            onSaveGroup={console.log}
        />
    );
};

export const FavoriteBusinessResultStory = () => {
    return <FavoriteBusinessResult business={BUSINESS} />;
};

export const FavoriteAddGroupStory = () => {
    return <FavoriteAddGroup onSave={console.log} />;
};

export const FavoriteGroupsListStory = () => (
    <FavoriteGroupsList favoriteGroups={FAVORITE_GROUPS} />
);
