import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from '@material-ui/core';
import { Auth } from '../../services/Auth';
import { makeStyles, useTheme } from '@material-ui/core/styles';

export interface IAppBarUserProps {
    onClickMyFavorites?: () => void;
    onClickLogout?: () => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: theme.spacing(1),

    },
}));


export function AppBarUser({ onClickLogout }: IAppBarUserProps) {
    const theme = useTheme();
    const classes = useStyles(theme);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={Auth.signOut}>Logout</MenuItem>
                <Link href={`/my-reviews`}>
                    <MenuItem>My Reviews</MenuItem>
                </Link>
                <Link href={`/my-favorites`}>
                    <MenuItem>My Favorites</MenuItem>
                </Link>
            </Menu>
        </div>
    );
}
