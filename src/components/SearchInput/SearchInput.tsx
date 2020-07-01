import React from 'react';
import algoliasearch from 'algoliasearch/lite';

import {
    connectAutoComplete,
    InstantSearch,
    Hits,
    SearchBox,
} from 'react-instantsearch-dom';

/* eslint-disable no-use-before-define */
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const searchClient = algoliasearch(
    'MQBBVGG94P',
    'd68c847f05c3ef5ddce1b1890080a35b'
);

const AutocompleteSearch = ({ hits, currentRefinement, refine }) => (
    <Autocomplete
        options={hits}
        value={currentRefinement}
        freeSolo
        onChange={(event) => {
            //@ts-ignore
            return refine(event.currentTarget.value);
        }}
        getOptionLabel={(option) => option?.data?.name}
        style={{ width: 300 }}
        renderInput={(params) => (
            <TextField {...params} label="Business Name" variant="outlined" />
        )}
    />
);

const CustomAutocomplete = connectAutoComplete(AutocompleteSearch);

export function SearchInput() {
    return (
        <InstantSearch indexName="common-good" searchClient={searchClient}>
            <CustomAutocomplete />
        </InstantSearch>
    );
}
