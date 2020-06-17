import React from 'react';
import './AppBar.less';

import { history } from '../../history';

import AppBar_M from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

export interface IAppBarProps {
    onClickAddBusiness?: () => void;
}

//@ts-ignore
window.a = history;

export function AppBar(props: IAppBarProps) {
    return (
        <div className="bb-app-bar">
            <AppBar_M position="static">
                <Toolbar>
                    <Typography variant="h6">Better Businesses</Typography>
                    <div className="bb-app-bar__search">
                        <div className="bb-app-bar__search-icon">
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{}}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <Button onClick={props.onClickAddBusiness} color="inherit">
                        Add A Business
                    </Button>
                    <Button color="inherit">Login</Button>
                    <Button color="inherit">Sign Up</Button>
                </Toolbar>
            </AppBar_M>
        </div>
    );
}
