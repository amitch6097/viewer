import React from 'react';
import { CreateBusinessFlagContainer } from './CreateBusinessFlagContainer';
import { Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export function CreateBusinessFlag(props) {
    const history = useHistory();

    async function goToBusiness() {
        history.push(`/business/${props.match.params.id}`);
    }

    return (
        <Container>
            <CreateBusinessFlagContainer
                id={props.match.params.id}
                goToBusiness={goToBusiness}
            />
        </Container>
    );
}
