import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
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
import { Result } from '../../components/Result/Result';

export interface IMyFavoriteBusinessesViewProps {
    businesses: IBusinessListing[];
    state: EViewState;
    onClickBusiness: (businessId: string) => void;
}

const useStyles = makeStyles({
    root: {},
});

export function MyFavoriteBusinessesView(
    props: IMyFavoriteBusinessesViewProps
) {
    const classes = useStyles();

    return (
        <Container>
            <Grid container spacing={4}>
                {props.state === EViewState.LOADING &&
                    new Array(3).fill(0).map((_, index) => {
                        return (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <FavoritesListCardSkelton />
                            </Grid>
                        );
                    })}
                {props.state === EViewState.EMPTY && (
                    <Typography>
                        You have not added any businesses to this Group
                    </Typography>
                )}
                {props.state === EViewState.DONE &&
                    props.businesses.map((business) => {
                        return (
                            <Grid item key={business.id} sm={12}>
                                <Result
                                    business={business}
                                    onClick={() =>
                                        props.onClickBusiness(business.id)
                                    }
                                />
                            </Grid>
                        );
                    })}
            </Grid>
        </Container>
    );
}
