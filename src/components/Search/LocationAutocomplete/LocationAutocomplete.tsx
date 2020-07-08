import React, { Component } from 'react';
import './LocationAutocomplete.less';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import { createConnector } from 'react-instantsearch-dom';
import { LocationAutocompleteView } from './LocationAutocompleteView';

const searchClient = algoliasearch(
    'MQBBVGG94P',
    'd68c847f05c3ef5ddce1b1890080a35b'
);

const connector = createConnector({
    displayName: 'AlgoliaLocationAutocomplete',

    getProvidedProps() {
        return {};
    },

    refine(props, searchState, nextValue) {
        return {
            ...searchState,
            aroundLatLng: nextValue,
            boundingBox: {},
        };
    },
});

const LocationAutocompleteViewConnected = connector(LocationAutocompleteView);

export interface ILocationAutocompleteProps {
    onChange?: (value: string) => void;
    onClickSuggestion?: (event: any) => void;
    onClear?: () => void;
}

export function LocationAutocomplete(props: ILocationAutocompleteProps) {
    return (
        <div className="bb-location-autocomplete">
            <InstantSearch indexName="common-good" searchClient={searchClient}>
                <LocationAutocompleteViewConnected {...props} />
            </InstantSearch>
        </div>
    );
}
