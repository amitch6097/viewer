import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import {
    FavoritesListCard,
    FavoritesListCardSkelton,
} from '../../components/Favorites/FavoritesListCard';
import { IFavoriteGroup } from '../../../typings/base';
import { IBusinessListing } from '../../../typings/types';
import {
    CircularProgress,
    Container,
    Grid,
    Typography,
} from '@material-ui/core';
import { EViewState } from '../../../typings/base';
import { Result, ResultSkeleton } from '../../components/Result/Result';
import {
    FavoritesListHeaderSkeleton,
    FavoritesListHeader,
} from '../../components/Favorites';
import { Results, ResultsSkeleton } from '../../components/Result';

export interface IMyFavoriteBusinessesViewProps {
    businesses: IBusinessListing[];
    state: EViewState;
    onClickBusiness: (businessId: string) => void;
    group: IFavoriteGroup;
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
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
                <Results businesses={props.businesses} />
            </Grid>
        );
    }

    return (
        <Container>
            {props.state === EViewState.LOADING && <Loading />}
            {props.state === EViewState.EMPTY && <Empty />}
            {props.state === EViewState.DONE && <Done />}
        </Container>
    );
}
