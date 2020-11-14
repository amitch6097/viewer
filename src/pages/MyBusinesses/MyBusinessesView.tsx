import { Container, Typography } from '@material-ui/core';
import React from 'react';
import { IBusinessListing } from 'typings/types';
import { Results, ResultsSkeleton } from '../../components/Result';

export interface IMyBusinessesViewProps {
    businesses: Record<string, IBusinessListing>;
    onClickBusiness: (index: string) => void;
}

export function MyBusinessesView(props: IMyBusinessesViewProps) {
    return (
        <Container>
            <Typography>My Businesses</Typography>
            {props.businesses ? (
                <Results
                    onClick={props.onClickBusiness}
                    businesses={props.businesses}
                />
            ) : (
                <ResultsSkeleton />
            )}
        </Container>
    );
}
