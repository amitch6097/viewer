import React from 'react';
import Pagination_M from '@material-ui/lab/Pagination';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import {
    makeStyles,
} from '@material-ui/core/styles';
export interface IPaginationProps {
    pages: number;
    page: number;
    onChangePage: (page: number) => void;
}

const useStyles = makeStyles({
    root: {},
    divider: {
        marginTop: 10,
        marginBottom: 10,
    },
});

export function Pagination({ pages, page, onChangePage }) {
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        event.preventDefault();
        if (onChangePage && value !== page) {
            onChangePage(value);
        }
    };
    return (
        <Grid className={classes.root}>
            <Divider className={classes.divider} />
            <Pagination_M count={pages} page={page} onChange={handleChange} />
            <Divider className={classes.divider} />
        </Grid>
    );
}
