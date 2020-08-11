import React from 'react';
import { EIdentify } from '../../typings/types';
import { Search, BusinessAutocomplete, LocationAutocomplete } from '../../src/components/Search';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

export default {
    title: 'Search',
    component: Search,
    decorators: [withKnobs],
};

export const SearchStory = () => (
    <Search 
        onSearch={console.log}
        onChangeBusiness={console.log}
        onChangeLocationSuggestion={console.log}
        locationValue={text('locationValue','location')}
        businessValue={text('businessValue','business')}
    />
);

export const BusinessAutocompleteStory = () => (
    <BusinessAutocomplete 
        onChange={console.log}
        onClear={console.log}
        disable={boolean('disable', false)}
    />
);

export const LocationAutocompleteStory = () => (
    <LocationAutocomplete 
        onChange={console.log}
        onClear={console.log}
        value={text('value','location')}
    />
);