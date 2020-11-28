import { Avatar, Grid, Typography, Link } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import React from 'react';
import { IReview } from '../../../typings/types';

export interface IReviewProps {
    review: IReview;
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexFlow: 'nowrap',
    },
    user: {
        display: 'flex',
        flexDirection: 'row',
        minWidth: '250px',
        alignItems: 'center',
    },
    userImg: {
        marginRight: '10px',
    },
    review: {},
    reviewHeading: {
        display: 'flex',
        flexDirection: 'row',
    },
    reviewHeadingDate: {
        marginLeft: '10px',
    },
    link: {
        fontSize: theme.typography.h3.fontSize,
    },
}));

export function Review({ review }: IReviewProps) {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <Grid
            container
            direction="row"
            alignItems="flex-start"
            className={classes.root}
        >
            <Grid item className={classes.user}>
                {review.user ? (
                    <>
                        <Avatar
                            src={review.user.image}
                            className={classes.userImg}
                        />
                        <Typography>{review.user.name}</Typography>
                    </>
                ) : (
                    <Link
                        href={`/business/${review.businessId}`}
                        className={classes.link}
                    >
                        {review.businessName}
                    </Link>
                )}
            </Grid>
            <Grid item className={classes.review}>
                <div className={classes.reviewHeading}>
                    <Rating value={review.rating} readOnly />
                    <Typography className={classes.reviewHeadingDate}>
                        {new Date(review.createdAt).toLocaleDateString()}{' '}
                    </Typography>
                </div>

                <Typography>{review.text}</Typography>
            </Grid>
        </Grid>
    );
}
