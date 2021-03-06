import { Hidden, IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CreateIcon from '@material-ui/icons/Create';
import GradeIcon from '@material-ui/icons/Grade';
import HelpIcon from '@material-ui/icons/Help';
import DoneIcon from '@material-ui/icons/Done';
import FeedbackIcon from '@material-ui/icons/Feedback';
import ShareIcon from '@material-ui/icons/Share';

import React from 'react';
import { IBusinessListing } from '../../../typings/types';
import { strings } from '../../strings';
import { FavoriteIcon } from '../Favorites';
import { Rating } from '../Rating/Rating';

export interface IListingTitleCardProps {
    id: string;
    business: IBusinessListing;
    isFavorited?: boolean;
    onChangeAbout?: (about: string) => void;
    onToggleFavorite?: () => void;
    onFlagBusiness?: () => void;
    isEditMode?: boolean;
}

const useStyles = (props) =>
    makeStyles((theme: Theme) =>
        createStyles({
            cardRoot: {
                boxShadow: 'none',
            },
            root: {
                display: 'flex',
                flexDirection: 'row',
                minHeight: '250px',
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
                justifyContent: 'flex-end',
            },
            typographyWithIcon: {
                alignItems: 'center',
                display: 'flex',
                margin: '0px',
            },
        })
    );
export function ListingTitleCard(props: IListingTitleCardProps) {
    const matches = useMediaQuery('(max-width:600px)');
    const classes = useStyles({ matches })();
    const disabled = props.isEditMode;

    function WriteAReview() {
        return disabled ? (
            <Button
                disabled={disabled}
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<GradeIcon />}
            >
                <p className={classes.buttonText}>Write a Review</p>
            </Button>
        ) : (
            <Link href={`#/business/${props.id}/new-review`}>
                <Button
                    disabled={disabled}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<GradeIcon />}
                >
                    <p className={classes.buttonText}>Write a Review</p>
                </Button>
            </Link>
        );
    }

    function Flag() {
        return disabled ? (
            <IconButton
                disabled={disabled}
                color="secondary"
                aria-label="flag business"
                component="span"
                onClick={props.onFlagBusiness}
            >
                <FeedbackIcon />
            </IconButton>
        ) : (
            <Link href={`#/business/${props.id}/new-flag`}>
                <IconButton
                    disabled={disabled}
                    color="secondary"
                    aria-label="flag business"
                    component="span"
                    onClick={props.onFlagBusiness}
                >
                    <FeedbackIcon />
                </IconButton>
            </Link>
        );
    }

    return (
        <Card raised={false} className={classes.cardRoot}>
            <Grid container className={classes.root} direction="row">
                <Grid item xs={12} sm={4}>
                    <CardMedia
                        className={classes.image}
                        image={props.business?.image?.url}
                        title={props.business?.name}
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

                        <Grid container direction="row" alignItems="center">
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                            >
                                {strings.categories[props.business.category]}
                            </Typography>
                            {!props.isEditMode && (
                                <Link href={`#/business/${props.id}/claim`}>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        className={classes.typographyWithIcon}
                                    >
                                        {props.business.hasOwner ? (
                                            <>
                                                <DoneIcon />
                                                {'claimed'}
                                            </>
                                        ) : (
                                            <>
                                                <HelpIcon />
                                                {'unclaimed'}
                                            </>
                                        )}
                                    </Typography>
                                </Link>
                            )}
                        </Grid>

                        <Rating
                            average={props.business.averageReview}
                            reviewCount={props.business.reviewCount}
                        />

                        {!props.isEditMode && (
                            <Link href={`#/business/${props.id}/edit`}>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    className={classes.typographyWithIcon}
                                >
                                    <CreateIcon />
                                    {'Edit'}
                                </Typography>
                            </Link>
                        )}
                    </CardContent>
                    <div className={classes.controls}>
                        <WriteAReview />
                        <Hidden smDown>
                            <Button
                                disabled={disabled}
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<ShareIcon />}
                            >
                                Share
                            </Button>

                            <Button
                                disabled={disabled}
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
                            <Flag />
                        </Hidden>
                        <Hidden mdUp>
                            <Grid className={classes.iconButtons}>
                                <IconButton
                                    disabled={disabled}
                                    color="secondary"
                                    aria-label="share"
                                    component="span"
                                >
                                    <ShareIcon />
                                </IconButton>
                                <IconButton
                                    disabled={disabled}
                                    color="secondary"
                                    aria-label="toggle favorite"
                                    component="span"
                                    onClick={props.onToggleFavorite}
                                >
                                    <FavoriteIcon
                                        selected={props.isFavorited}
                                    />
                                </IconButton>
                                <Flag />
                            </Grid>
                        </Hidden>
                    </div>
                </Grid>
            </Grid>
        </Card>
    );
}
