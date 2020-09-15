
import React from 'react';
import {SearchContext, ISearchContextState} from '../context/SearchContext';

export function useSearch(): ISearchContextState {
    const context = React.useContext(SearchContext);
    return context;
}