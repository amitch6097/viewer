import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { useSearch } from '../../hooks/useSearch';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '20px',
    }
});


export function ResultPagination() {
    const classes = useStyles();

    const { search, result, onChangePage } = useSearch();
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        onChangePage(value - 1 );
    };
    return result ? (
        <Pagination
            className={classes.root}
            count={result.getPages()}
            page={search.getPage() + 1}
            onChange={handleChange}
        />
    ) : (
        <div></div>
    );
}
