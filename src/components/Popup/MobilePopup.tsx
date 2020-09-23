import Grid from '@material-ui/core/Grid';
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Portal from '@material-ui/core/Portal';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'fixed',
            width: 'calc(100% - 5px)',
            height: '85%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: `5px solid ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.background.paper,
            borderRadius: '10px 10px 0px 0px',
        },
        header: {
            padding: 10,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            textAlign: 'center'
        },
    })
);

export function MobilePopup(props) {
    const classes = useStyles();
    return (
        <Portal>
            <Grid className={classes.root}>
                <div className={classes.header}>
                    <Typography>{props.label}</Typography>
                </div>
                {props.children}
            </Grid>
        </Portal>
    );
}
