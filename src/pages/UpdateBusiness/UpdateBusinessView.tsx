import React from 'react';
import Container from '@material-ui/core/Container';
import { IInfoStepState, InfoStep } from '../Create/Steps/InfoStep';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {},
}));

export interface IUpdateBusinessViewProps {
    businessName: string;
    onSubmit: (state: IInfoStepState) => void;
}

export function UpdateBusinessView(props: IUpdateBusinessViewProps) {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <Typography>{props.businessName}</Typography>
            <InfoStep onNextStep={props.onSubmit} withImage={false} notRequired={true} />
        </Container>
    );
}
