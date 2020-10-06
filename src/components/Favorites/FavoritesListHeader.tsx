import { Button, CardActions, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Skeleton from '@material-ui/lab/Skeleton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import React from 'react';
import { IFavoriteGroup } from '../../../typings/base';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

export interface IFavoritesListHeaderProps {
    group: IFavoriteGroup;
    onClick?: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
        },
        actions: {
            flex: '1',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        imageContainer: {
            display: 'flex',
            flexDirection: 'row',
            height: '20vh',
            minHeight: '200px',
            minWidth: '345px',
        },
        image: {
            flex: '1',
        },
        imageRight: {
            display: 'flex',
            flex: '1',
        },
    })
);
const placeholder =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Florida_Box_Turtle_Digon3_re-edited.jpg/440px-Florida_Box_Turtle_Digon3_re-edited.jpg';

export function FavoritesListHeader(props: IFavoritesListHeaderProps) {
    const classes = useStyles();
    const updatedAgo = timeAgo.format(new Date(props.group.updatedAt));
    const image = props.group?.images?.length
        ? props.group?.images[0]
        : placeholder;

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card raised={false} elevation={0} className={classes.root}>
            <Grid className={classes.imageContainer}>
                <CardMedia className={classes.image} image={image}></CardMedia>
                <Grid direction="column" className={classes.imageRight}>
                    <CardMedia
                        className={classes.image}
                        image={image}
                    ></CardMedia>
                    <CardMedia
                        className={classes.image}
                        image={image}
                    ></CardMedia>
                </Grid>
            </Grid>
            <CardContent>
                <Typography component="h5" variant="h5">
                    {props.group.label}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {props.group.length + ' businesses'}
                </Typography>
                <Typography>{`last updated ${updatedAgo}`}</Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                <Button>Share</Button>
                <IconButton
                    size="medium"
                    aria-label="settings"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreHorizIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Make Public</MenuItem>
                    <MenuItem onClick={handleClose}>Delete</MenuItem>
                    <MenuItem onClick={handleClose}>Make A Copy</MenuItem>
                </Menu>
            </CardActions>
        </Card>
    );
}

export function FavoritesListHeaderSkeleton() {
    const classes = useStyles();

    return (
        <Card raised={false} elevation={0} className={classes.root}>
            <Grid className={classes.imageContainer}>
                <Skeleton
                    height="100%"
                    className={classes.image}
                    variant="rect"
                    style={{ margin: '5px' }}
                />
            </Grid>
            <CardContent  className={classes.actions}>
                <Skeleton variant="text" />
                <Skeleton variant="text" width="50%" />
                <Skeleton variant="text" />
            </CardContent>
        </Card>
    );
}
