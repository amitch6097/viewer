import React from 'react';
import { Search, ISearchProps } from './Search';
import { useSearch } from '../../hooks/useSearch';

export interface ISearchContainerProps {
    history: any;
}

export function SearchContainer() {
    const { search, onChangeSearch, onSearch } = useSearch();
    return (
        <Search
            onSearch={onSearch}
            businessValue={search.getSearchValue()}
            locationValue={search.getLocationValue()}
            onChangeBusiness={(...args) =>
                onChangeSearch(search.onChangeSearchValue(...args))
            }
            onChangeLocationValue={(...args) =>
                onChangeSearch(search.onChangeLocationValue(...args))
            }
            onChangeLocationSuggestion={(...args) =>
                onChangeSearch(search.onChangeLocationSuggestion(...args))
            }
        />
    );
}
