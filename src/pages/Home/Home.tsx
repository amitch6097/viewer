import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { SearchContainer } from '../../components/Search/SearchContainer';

const useStyles = makeStyles({
    root: {},
    searchContainer: {
        backgroundImage:
            'url("https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2852&q=80")',
        width: '100%',
        height: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchItem: {
        width: '60%',
        minWidth: '600px'
    },
});

export function Home(props: any) {
    const classes = useStyles(props);

    return (
        <Grid>
            <Grid container className={classes.searchContainer}>
                <Grid item className={classes.searchItem}>
                    <SearchContainer />
                </Grid>
            </Grid>
            <Grid container>
            </Grid>

        </Grid>
    );
}
