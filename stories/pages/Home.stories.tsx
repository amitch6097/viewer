import React from 'react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { Home } from '../../src/pages/Home/Home';
import { SearchContextProvider } from '../../src/context/SearchContext';

export default {
    title: 'Pages|Home',
    component: Home,
    decorators: [withKnobs],
};

export const HomeStory = () => (
    <SearchContextProvider>
        <Home />
    </SearchContextProvider>
);
