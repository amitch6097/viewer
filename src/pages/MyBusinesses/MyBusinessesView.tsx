import { Container, Typography } from '@material-ui/core';
import React from 'react';
import { IBusinessListing } from 'typings/types';
import { Results, ResultsSkeleton } from '../../components/Result';
import { makeStyles, useTheme } from '@material-ui/core/styles';

export interface IMyBusinessesViewProps {
    businesses: Record<string, IBusinessListing>;
    onClickBusiness: (index: string) => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 'var(--page-height)',
        paddingTop: 'var(--page-padding)',
        paddingBottom: 'var(--page-padding)',
    },
}));

export function MyBusinessesView(props: IMyBusinessesViewProps) {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <Container className={classes.root}>
            <Typography variant="h3" gutterBottom>
                My Businesses
            </Typography>
            {props.businesses ? (
                <Results
                    onClick={props.onClickBusiness}
                    businesses={props.businesses}
                    withFavorite={false}
                />
            ) : (
                <ResultsSkeleton />
            )}
        </Container>
    );
}
