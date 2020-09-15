import React from 'react';
import { Filters } from './Filters';
import { useSearch } from '../../hooks/useSearch';

export function FiltersContainer() {
    const { search, onChangeSearch } = useSearch();

    return (
        <Filters
            onChangeCategory={(...args) =>
                onChangeSearch(search.onChangeCategory(...args))
            }
            onChangeFilterSelected={(...args) =>
                onChangeSearch(search.onChangeFilterSelected(...args))
            }
            onChangeLocationDistance={(...args) =>
                onChangeSearch(search.onChangeLocationDistance(...args))
            }
            filters={search.getFilters()}
            category={search.getCategory()}
            locationDistance={search.getLocationDistance()}
        />
    );
}
