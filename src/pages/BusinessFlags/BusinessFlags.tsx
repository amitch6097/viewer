import { Container } from '@material-ui/core';
import React from 'react';
import { BusinessFlagsContainer } from './BusinessFlagsContainer';

export function BusinessFlags(props) {
    return (
        <Container>
            <BusinessFlagsContainer id={props.match.params.id} />
        </Container>
    );
}
