import React from 'react';
import { BusinessFlagContainer } from './BusinessFlagContainer';
import { Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export function BusinessFlag(props) {
    const history = useHistory();

    async function goToBusiness() {
        history.push(`/business/${props.match.params.id}`);
    }

    return (
        <Container>
            <BusinessFlagContainer
                id={props.match.params.id}
                goToBusiness={goToBusiness}
            />
        </Container>
    );
}
