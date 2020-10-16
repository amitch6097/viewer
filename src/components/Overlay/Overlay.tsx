import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

export interface IOverlayProps {
    children: JSX.Element | JSX.Element[];
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        width: '100v2',
        background: 'rgba(0,0,0, .3)',
        position: 'fixed',
        margin: '0px',
        padding: '0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        left: 0,
    },
}));

export function Overlay(props: IOverlayProps) {
    const classes = useStyles();
    const { children } = props;
    return (
        <Grid className={classes.root} container direction="column">
            {children}
        </Grid>
    );
}
