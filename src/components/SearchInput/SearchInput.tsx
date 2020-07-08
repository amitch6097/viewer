import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { generateGUID } from '../../helpers';

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

const AutocompleteSearch = ({ hits, currentRefinement, refine, searchRef }) => (
    <Autocomplete
        options={hits}
        value={currentRefinement}
        freeSolo
        onChange={(event) => {
            //@ts-ignore
            const index = event.currentTarget.value;
            console.log('This is the Selected Option:', index && hits[index]);
            return refine(index);
        }}
        getOptionLabel={(option) => {
            return option?.data?.name || generateGUID();
        }}
        style={{ width: 300 }}
        renderInput={(params) => (
            <TextField
                {...params}
                inputRef={searchRef}
                label="Business Name"
                variant="outlined"
            />
        )}
    />
);

const CustomAutocomplete = connectAutoComplete(AutocompleteSearch);

export function SearchInput({ searchRef }) {
    return (
        <InstantSearch indexName="common-good" searchClient={searchClient}>
            <CustomAutocomplete searchRef={searchRef} />
        </InstantSearch>
    );
}
