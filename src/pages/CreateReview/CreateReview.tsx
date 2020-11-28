import React from 'react';
import { CreateReviewContainer } from './CreateReviewContainer';
import { Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export function CreateReview(props) {
    const history = useHistory();

    async function goToBusiness() {
        history.push(`/business/${props.match.params.id}`);
    }

    return (
        <Container>
            <CreateReviewContainer
                id={props.match.params.id}
                goToBusiness={goToBusiness}
            />
        </Container>
    );
}
