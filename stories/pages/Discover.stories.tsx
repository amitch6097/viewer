import React from 'react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { DiscoverView } from '../../src/pages/Discover/DiscoverView';
import {SearchContextProvider} from '../../src/context/SearchContext';

export default {
    title: 'Pages|Discover',
    component: DiscoverView,
    decorators: [withKnobs],
};

export const DiscoverStory = () => (
    <SearchContextProvider>
        <DiscoverView onClickBusiness={console.log} />
    </SearchContextProvider>
);
