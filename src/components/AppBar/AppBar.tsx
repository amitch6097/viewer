import React from 'react';
import './AppBar.less';

import AppBar_M from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import { Auth } from '../../services/Auth';
import { useUser } from '../../hooks/useUser';
import { goToCreate } from '../../history';

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
                    <Typography variant="h6">Common Good</Typography>
                    <Button
                        onClick={user ? () => goToCreate(props.history) : Auth.signInWithGoogle}
                        color="inherit"
                    >
                        Add A Business
                    </Button>
                    {!user && (
                        <Button color="inherit" onClick={Auth.signInWithGoogle}>
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar_M>
        </div>
    );
}
