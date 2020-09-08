import React from 'react';
import { EIdentify } from '../../typings/types';
import { Search, BusinessAutocomplete, LocationAutocomplete } from '../../src/components/Search';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

export default {
    title: 'Components|Search',
    component: Search,
    decorators: [withKnobs],
};

export const SearchStory = () => (
    <Search 
        onSearch={console.log}
        onChangeBusiness={console.log}
        onChangeLocationSuggestion={console.log}
        onChangeLocationValue={console.log}
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

export const LocationAutocompleteStory = () => {
    const [state, setState] = React.useState('location');
    return (<LocationAutocomplete 
        onChange={setState}
        onClear={console.log}
        value={state}
    />)
}

export const LocationAutocompleteUseTextFieldStory = () => {
    const [state, setState] = React.useState('location');
    return (<LocationAutocomplete 
        onChange={setState}
        onClear={console.log}
        value={state}
        useTextField={true}
    />)
}

export const LocationAutocompleteCityOnlyStory = () => {
    const [state, setState] = React.useState('location');
    return (<LocationAutocomplete 
        onChange={setState}
        onClear={console.log}
        value={state}
        cityResultsOnly={true}
    />)
}
