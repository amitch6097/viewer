import Grid from '@material-ui/core/Grid';
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Portal from '@material-ui/core/Portal';
import { Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: `1px solid ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.background.paper,
            borderRadius: '10px',
            minWidth: '200px',
        },
        header: {
            borderRadius: '10px 10px 0px 0px',
            padding: 10,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        action: {},
        hidden: {
            visibility: 'hidden',
        },
        content: {},
    })
);

export function DesktopPopup(props) {
    const classes = useStyles();
    return (
        <Portal>
            <Grid className={classes.root}>
                <div className={classes.header}>
                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation={true}
                        className={`${props.actionLeft ? '' : classes.hidden}`}
                    >
                        {props.actionLeft}
                    </Button>
                    <Typography>{props.label}</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation={true}
                        className={`${props.actionRight ? '' : classes.hidden}`}
                    >
                        {props.actionRight}
                    </Button>
                </div>
                <div className={classes.content}>{props.children}</div>
            </Grid>
        </Portal>
    );
}
