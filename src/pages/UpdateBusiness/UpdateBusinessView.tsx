import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { IInfoStepState, InfoStep } from '../Create/Steps/InfoStep';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import * as firebase from 'firebase';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 'var(--page-height)',
        paddingTop: 'var(--page-padding)',
        paddingBottom: 'var(--page-padding)',
    },
}));

export interface IUpdateBusinessViewProps {
    businessName: string;
    onSubmit: (state: IInfoStepState) => void;
}

export function UpdateBusinessView(props: IUpdateBusinessViewProps) {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <Typography variant="h4" gutterBottom>{'Update Business Details'}</Typography>
            <Typography variant="subtitle1" gutterBottom>{props.businessName}</Typography>
            <InfoStep onNextStep={props.onSubmit} withImage={false} notRequired={true} />
        </Container>
    );
}

