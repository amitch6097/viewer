import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {
    FavoritesListCard,
    FavoritesListCardSkelton,
} from '../../components/Favorites/FavoritesListCard';
import { IFavoriteGroup } from '../../../typings/base';
import {
    CircularProgress,
    Container,
    Grid,
    Typography,
} from '@material-ui/core';
import { EViewState } from '../../../typings/base';

export interface IMyFavoritesViewProps {
    favoriteGroups: IFavoriteGroup[];
    state: EViewState;
    onClickGroup: (groupId: string) => void;
}

const useStyles = makeStyles({
    root: {},
});

export function MyFavoritesView(props: IMyFavoritesViewProps) {
    const classes = useStyles();
    return (
        <Container>
            <Grid container spacing={4}>
                {props.state === EViewState.LOADING && (
                    <MyFavoritesViewLoading />
                )}
                {props.state === EViewState.EMPTY && <MyFavoritesViewEmpty />}
                {props.state === EViewState.DONE &&
                    props.favoriteGroups.map((group) => {
                        return (
                            <Grid item key={group.id} xs={12} sm={6} md={4}>
                                <FavoritesListCard
                                    group={group}
                                    onClick={() => props.onClickGroup(group.id)}
                                />
                            </Grid>
                        );
                    })}
            </Grid>
        </Container>
    );
}

function MyFavoritesViewLoading() {
    return (
        <>
            {new Array(3).fill(0).map((_, index) => {
                return (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <FavoritesListCardSkelton />
                    </Grid>
                );
            })}
        </>
    );
}

function MyFavoritesViewEmpty() {
    return (
        <Typography>You have not created and favorite Groups yet</Typography>
    );
}
