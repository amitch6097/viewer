import React from 'react';

import AppBar_M from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Auth } from '../../services/Auth';
import { goToCreate, goToHome } from '../../history';

import { strings } from '../../strings';
import Container from '@material-ui/core/Container';
import { Grid, Drawer, Hidden } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import {AppBarUser} from './AppBarUser';

export interface IAppBarProps {
    history: any;
    user?: firebase.User;
    searchComponent?: JSX.Element;
}

const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: 'none',
        minHeight: 'var(--app-bar-height)',
        position: 'sticky',
        top: '0',
        background: theme.palette.background.default
    },
    search: {},
    controls: {
        width: 'auto',
        marginRight: 0,
    },
    button: {
        marginLeft: 5,
    },
    drawerPaper: {
        width: '30%',
    },
    userButtons: {
        display: 'flex',
        flexDirection: 'row'
    }
}));

export function AppBar(props: IAppBarProps) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    function AppBarDrawerButton() {
        return (
            <IconButton
                onClick={() => setOpen(true)}
                color="primary"
                component="span"
            >
                <MenuIcon fontSize="large" />
            </IconButton>
        );
    }

    function AppBarDrawer() {
        return (
            <Drawer
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor={'right'}
                open={open}
                onClose={() => setOpen(false)}
            >
                {props.user ? (
                    <List>
                        <ListItem button>
                            <ListItemText
                                primary={strings.appBar.addBusiness}
                                onClick={
                                    props.user
                                        ? () => goToCreate(props.history)
                                        : Auth.signInWithGoogle
                                }
                            />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText
                                primary={strings.appBar.logout}
                                onClick={Auth.signOut}
                            />
                        </ListItem>
                    </List>
                ) : (
                    <List>
                        <ListItem button onClick={Auth.signInWithGoogle}>
                            <ListItemText primary={strings.appBar.signUp} />
                        </ListItem>
                        <ListItem button onClick={Auth.signInWithGoogle}>
                            <ListItemText primary={strings.appBar.login} />
                        </ListItem>
                    </List>
                )}
            </Drawer>
        );
    }
    return (
        <AppBar_M
            color="transparent"
            className={classes.root}
            position="static"
        >
            <Toolbar>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item>
                        <Button
                            color="inherit"
                            onClick={() => goToHome(props.history)}
                        >
                            <Typography variant="h6">Common Good</Typography>
                        </Button>
                    </Grid>
                    <Hidden only={['sm', 'md', 'lg']}>
                        <AppBarDrawerButton />
                    </Hidden>
                    {props.searchComponent ? (
                        <Grid
                            item
                            style={{
                                flex: '1',
                            }}
                        >
                            {props.searchComponent}
                        </Grid>
                    ) : (
                        <></>
                    )}
                    <Hidden only={['xs', 'md', 'lg']}>
                        <AppBarDrawerButton />
                    </Hidden>
                    <Hidden only={['xs', 'sm']}>
                        <Grid item className={classes.userButtons}>
                            {props.user ? (
                                <>
                                    <Button
                                        className={classes.button}
                                        onClick={
                                            props.user
                                                ? () =>
                                                      goToCreate(props.history)
                                                : Auth.signInWithGoogle
                                        }
                                        variant="contained"
                                        color="primary"
                                    >
                                        {strings.appBar.addBusiness}
                                    </Button>
                                    <AppBarUser />
                                    {/* <Button
                                        className={classes.button}
                                        onClick={Auth.signOut}
                                        color="inherit"
                                        variant="outlined"
                                    >
                                        {strings.appBar.logout}
                                    </Button> */}
                                </>
                            ) : (
                                <>
                                    <Button
                                        className={classes.button}
                                        color="inherit"
                                        variant="outlined"
                                        onClick={Auth.signInWithGoogle}
                                    >
                                        {strings.appBar.signUp}
                                    </Button>
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        color="primary"
                                        onClick={Auth.signInWithGoogle}
                                    >
                                        {strings.appBar.login}
                                    </Button>
                                </>
                            )}
                        </Grid>
                    </Hidden>
                </Grid>
            </Toolbar>
            <Hidden only={['md', 'lg']}>
                <AppBarDrawer />
            </Hidden>
        </AppBar_M>
    );
}
