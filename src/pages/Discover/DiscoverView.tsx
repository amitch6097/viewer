import React from 'react';
import { strings } from '../../strings';

import { ResultsContainer } from '../../components/Result/ResultsContainer';
import { ResultPagination } from '../../components/Result/ResultPagination';
import { FiltersContainer } from '../../components/Filters/FiltersContainer';
import { Grid, Container, Hidden } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import FilterListIcon from '@material-ui/icons/FilterList';
import { purple } from '@material-ui/core/colors';
import { FormatListBulletedRounded } from '@material-ui/icons';

export interface IDiscoverViewProps {
    onClickBusiness: (id: string) => void;
    isMobile?: boolean;
}

const useStyles = makeStyles({
    root: {
        flexWrap: 'nowrap',
        minHeight: 'var(--page-height)',
    },
    filters: {
        width: '300px',
        position: 'sticky',
        top: 'var(--app-bar-height)',
    },
    filtersContent: {},
    filterContainer: {
        position: 'fixed',
        height: '100%',
        display: 'flex',
        width: '100%',
        transition: 'top linear .5s',
        alignItems: 'center',
        flexWrap: 'nowrap',
        top: 'calc(100% - 60px)',
        pointerEvents: 'none',
    },
    'filterContainer--open': {
        top: 0,
        pointerEvents: 'all',

        // transform: 'translate(0px, calc(100% - 60px)'
    },
    filterContent: {
        background: 'purple',
        paddingTop: '20px',
        borderRadius: '20px 20px 0px 0px',
        display: 'flex',
        width: '100%',
        height: 'calc(100% - 60px)',
    },
    filterContentContainer: {
        background: 'white',
        width: '99%',
        borderRadius: '20px 20px 0px 0px',
        margin: '0 auto',
    },
    filterFab: {
        pointerEvents: 'all',
        marginBottom: '10px',
        height: '50px',
    },
    results: {
        // width: 'calc(100% - 300px)',
        width: '100%',
        padding: '20px',
        minHeight: 'var(--page-height)',
        display: 'flex',
        flexDirection: 'column'
    },
});

export function DiscoverView(props: IDiscoverViewProps) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    return (
        <Grid
            className={classes.root}
            container
            direction="row"
            alignItems="flex-start"
        >
            <Hidden only={['xs', 'sm']}>
                <Grid className={classes.filters} item md={3}>
                    <aside className={classes.filtersContent}>
                        <FiltersContainer />
                    </aside>
                </Grid>
            </Hidden>
            <Grid
                item
                className={classes.results}
                md={9}
                style={
                    open
                        ? {
                              position: 'fixed',
                          }
                        : {}
                }
            >
                <ResultsContainer
                    onClick={props.onClickBusiness}
                    withFavorite={true}
                />
                <ResultPagination />
            </Grid>
            <Hidden only={['md', 'lg']}>
                <Grid
                    className={`${classes.filterContainer} ${
                        open ? classes['filterContainer--open'] : ''
                    }`}
                    container
                    direction="column"
                >
                    <Fab
                        onClick={() => setOpen(!open)}
                        className={classes.filterFab}
                        variant="extended"
                    >
                        <FilterListIcon />
                        Filter
                    </Fab>

                    <aside className={classes.filterContent}>
                        <Grid
                            className={classes.filterContentContainer}
                            container
                            direction="column"
                        >
                            <FiltersContainer />
                        </Grid>
                    </aside>
                </Grid>
            </Hidden>
        </Grid>
    );
}
