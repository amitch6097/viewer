import React from 'react';
import './AppBar.less';

import AppBar_M from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Auth } from '../../services/Auth';
import { useUser } from '../../hooks/useUser';
import { goToCreate, goToHome } from '../../history';

import { strings } from '../../strings';

export interface IAppBarProps {
    onClickAddBusiness?: () => void;
    history: any;
}

export function AppBar(props: IAppBarProps) {
    const user: firebase.User = useUser();
    return (
        <div className="bb-app-bar">
            <AppBar_M position="static">
                <Toolbar>
                    <Button
                        color="inherit"
                        onClick={() => goToHome(props.history)}
                    >
                        <Typography variant="h6">Common Good</Typography>
                    </Button>
                    <div className="bb-app-bar__controls">
                        {user ? (
                            <>
                                <Button
                                    onClick={
                                        user
                                            ? () => goToCreate(props.history)
                                            : Auth.signInWithGoogle
                                    }
                                    color="inherit"
                                >
                                    {strings.appBar.addBusiness}
                                </Button>
                                <Button color="inherit" onClick={Auth.signOut}>
                                    {strings.appBar.logout}
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    color="inherit"
                                    onClick={Auth.signInWithGoogle}
                                >
                                    {strings.appBar.signUp}
                                </Button>
                                <Button
                                    color="inherit"
                                    onClick={Auth.signInWithGoogle}
                                >
                                    {strings.appBar.login}
                                </Button>
                            </>
                        )}
                    </div>
                </Toolbar>
            </AppBar_M>
        </div>
    );
}
