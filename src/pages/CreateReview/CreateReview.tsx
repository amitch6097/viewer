import React from 'react';
import { CreateReviewContainer } from './CreateReviewContainer';
import { Container } from '@material-ui/core';

export function CreateReview(props) {
    return (
        <Container>
            <CreateReviewContainer id={props.match.params.id} />
        </Container>
    );
}
