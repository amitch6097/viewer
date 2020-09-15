import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { useSearch } from '../../hooks/useSearch';

export function ResultPagination() {
    const { search, result, onChangePage } = useSearch();
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        onChangePage(value - 1 );
    };
    return result ? (
        <Pagination
            count={result.getPages()}
            page={search.getPage() + 1}
            onChange={handleChange}
        />
    ) : (
        <div></div>
    );
}
