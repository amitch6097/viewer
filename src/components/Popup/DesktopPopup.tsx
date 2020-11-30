import Grid from '@material-ui/core/Grid';
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Portal from '@material-ui/core/Portal';
import { Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            zIndex: 100000,
            top: 0,
            left: 0,
            background: 'rgba(0,0,0,.5)'
        },
        root: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: `1px solid ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.background.paper,
            borderRadius: '10px',
            minWidth: '200px',
            width: '50%',
            position: 'fixed',
            maxHeight: '75%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
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
        content: {
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
        },
    })
);

export function DesktopPopup(props) {
    const classes = useStyles();
    const containerRef = React.useRef(null);
    return (
        <Portal>
            <div className={classes.container} ref={containerRef} onClick={(event) => {
                if (event.target === containerRef.current) {
                    props.onClose();
                }
                }}>
                <Grid className={classes.root}>
                    <div className={classes.header}>
                        <Button
                            variant="contained"
                            color="primary"
                            disableElevation={true}
                            onClick={props.onActionLeft}
                            className={`${props.actionLeft ? '' : classes.hidden}`}
                        >
                            {props.actionLeft}
                        </Button>
                        <Typography>{props.label}</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            disableElevation={true}
                            onClick={props.onActionRight}
                            className={`${props.actionRight ? '' : classes.hidden}`}
                        >
                            {props.actionRight}
                        </Button>
                    </div>
                    <div className={classes.content}>{props.children}</div>
                </Grid>
            </div>

        </Portal>
    );
}
