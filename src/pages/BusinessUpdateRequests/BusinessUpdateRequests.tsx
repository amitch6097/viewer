import { Container } from '@material-ui/core';
import React from 'react';
import { BusinessUpdateRequestsContainer } from './BusinessUpdateRequestsContainer';

export function BusinessUpdateRequests(props) {
    return (
        <Container>
            <BusinessUpdateRequestsContainer id={props.match.params.id} />
        </Container>
    );
}
