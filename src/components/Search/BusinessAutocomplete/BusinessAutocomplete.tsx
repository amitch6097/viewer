import React from 'react';
import './BusinessAutocomplete.less';

import algoliasearch from 'algoliasearch/lite';
import { BusinessAutocompleteView } from './BusinessAutocompleteView';
import { connectAutoComplete, InstantSearch } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
    'MQBBVGG94P',
    'd68c847f05c3ef5ddce1b1890080a35b'
);

export interface IBusinessAutocompleteProps {
    onChange?: (value: string) => void;
    onClickSuggestion?: (event: any) => void;
    onClear?: () => void;
    disable?: boolean;
    value?: string;
    placeholder?: string;
}

const BusinessAutocompleteViewConnected = connectAutoComplete(
    BusinessAutocompleteView
);

export function BusinessAutocomplete(props: IBusinessAutocompleteProps) {
    return (
        <div className="bb-business-autocomplete">
            <InstantSearch indexName="common-good" searchClient={searchClient}>
                <BusinessAutocompleteViewConnected {...props} />
            </InstantSearch>
        </div>
    );
}
