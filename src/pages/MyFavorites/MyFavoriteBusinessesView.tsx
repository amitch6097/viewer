import { Container, Grid, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { EViewState, IFavoriteGroup } from '../../../typings/base';
import { IBusinessListing } from '../../../typings/types';
import {
    FavoritesListHeader,
    FavoritesListHeaderSkeleton,
} from '../../components/Favorites';
import { Results, ResultsSkeleton } from '../../components/Result';

export interface IMyFavoriteBusinessesViewProps {
    businesses: Record<string, IBusinessListing>;
    state: EViewState;
    onClickBusiness: (businessId: string) => void;
    group: IFavoriteGroup;
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        minHeight: 'var(--page-height)',
        paddingTop: 'var(--page-padding)',
        paddingBottom: 'var(--page-padding)',
    },
    divider: {
        marginTop: '10px',
        marginBottom: '10px',
    },
});

export function MyFavoriteBusinessesView(
    props: IMyFavoriteBusinessesViewProps
) {
    const classes = useStyles();

    function Loading() {
        return (
            <Grid className={classes.root}>
                <FavoritesListHeaderSkeleton />
                <Divider className={classes.divider} />
                <ResultsSkeleton />
            </Grid>
        );
    }

    function Empty() {
        return (
            <Grid className={classes.root}>
                <FavoritesListHeader
                    group={props.group}
                    onClick={console.log}
                />
                <Divider className={classes.divider} />{' '}
                <Typography>
                    You have not added any businesses to this Group
                </Typography>
            </Grid>
        );
    }

    function Done() {
        return (
            <Grid className={classes.root}>
                <FavoritesListHeader
                    group={props.group}
                    onClick={console.log}
                />
                <Divider className={classes.divider} />{' '}
                <Results
                    businesses={props.businesses}
                    withFavorite={false}
                    onClick={props.onClickBusiness}
                />
            </Grid>
        );
    }

    return (
        <Container className={classes.container}>
            {props.state === EViewState.LOADING && <Loading />}
            {props.state === EViewState.EMPTY && <Empty />}
            {props.state === EViewState.DONE && <Done />}
        </Container>
    );
}
