
import React from 'react';
import Container from '@material-ui/core/Container';
import {InfoStep} from '../Create/Steps/InfoStep';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {}
}));

export function UpdateBusinessView() {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <InfoStep onNextStep={console.log} withImage={false} />
        </Container>
    );
}