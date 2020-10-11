import React from 'react';
import {
    Theme,
    createStyles,
    makeStyles,
    useTheme,
} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import ShareIcon from '@material-ui/icons/Share';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CreateIcon from '@material-ui/icons/Create';
import { Hidden, IconButton } from '@material-ui/core';

import { IBusinessListing } from '../../../typings/types';
import { strings } from '../../strings';
import { config } from '../../config';
import { FavoriteIcon } from '../Favorites';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export interface IListingProps {
    business: IBusinessListing;
    isEditable?: boolean;
    id: string;
    isFavorited?: boolean;
    onChangeAbout?: (about: string) => void;
    onToggleFavorite?: () => void;
}

const useStyles = props => makeStyles((theme: Theme) =>
    createStyles({
        cardRoot: {
            boxShadow: 'none',
        },
        root: {
            display: 'flex',
            flexDirection: 'row',
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
        },
        content: {},
        image: {
            backgroundSize: 'contain',
            width: props.matches ? '90vw' : '100%',
            height: props.matches ? '50vw' : '100%',
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        button: {
            margin: theme.spacing(1),
        },
        buttonText: {
            margin: 0,
            whiteSpace: 'nowrap',
        },
        heading: {
            fontWeight: 700,
        },
        iconButtons: {
            flex: '1',
            display: 'flex',
            justifyContent: 'flex-end'
        },
    })
);
export function ListingTitleCard(props: IListingProps) {
    const matches = useMediaQuery('(max-width:600px)');
    const classes = useStyles({matches})();

    return (
        <Card raised={false} className={classes.cardRoot}>
            <Grid container className={classes.root} direction="row">
                <Grid item xs={12} sm={4}>
                    <CardMedia
                        className={classes.image}
                        image={props.business.image.url}
                        title={props.business.name}
                    />
                </Grid>

                <Grid item xs={12} sm={8} className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography
                            className={classes.heading}
                            component="h3"
                            variant="h3"
                        >
                            {props.business.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {strings.categories[props.business.category]}
                        </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                        <Link href={`#/business/${props.id}/new-review`}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<CreateIcon />}
                            >
                                <p className={classes.buttonText}>
                                    Write a Review
                                </p>
                            </Button>
                        </Link>

                        <Hidden smDown>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<ShareIcon />}
                            >
                                Share
                            </Button>

                            <Button
                                onClick={props.onToggleFavorite}
                                variant="contained"
                                color={
                                    props.isFavorited ? 'secondary' : 'primary'
                                }
                                className={classes.button}
                                startIcon={<BookmarkBorderIcon />}
                            >
                                <Hidden xsDown>
                                    {props.isFavorited
                                        ? 'Unfavorite'
                                        : 'Favorite'}
                                </Hidden>
                            </Button>
                        </Hidden>
                        <Hidden mdUp>
                            <Grid className={classes.iconButtons}>
                                <IconButton
                                    color="secondary"
                                    aria-label="share"
                                    component="span"
                                >
                                    <ShareIcon />
                                </IconButton>
                                <IconButton
                                    color="secondary"
                                    aria-label="toggle favorite"
                                    component="span"
                                    onClick={props.onToggleFavorite}
                                >
                                    <FavoriteIcon
                                        selected={props.isFavorited}
                                    />
                                </IconButton>
                            </Grid>
                        </Hidden>
                    </div>
                </Grid>
            </Grid>
        </Card>
    );
}
