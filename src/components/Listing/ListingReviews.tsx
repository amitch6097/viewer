import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import {
    makeStyles
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { IReviews } from '../../../typings/types';
import { Review } from '../Review';

export interface IListingReviewsProps {
    reviews: IReviews;
    onLoadMoreReviews: () => void;
}

const useStyles = makeStyles({
    root: {},
    title: {
        fontWeight: 700,
    },
    reviews: {},
    review: {
        width: '100%'
    },
    divider: {
        marginTop: '20px',
    },
});

export function ListingReviews({
    reviews,
    onLoadMoreReviews,
}: IListingReviewsProps) {
    const classes = useStyles();

    return (
        <Grid
            className={classes.root}
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
        >
            <Typography className={classes.title} variant="h5" gutterBottom>
                Reviews
            </Typography>
            <Grid
                className={classes.reviews}
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                spacing={3}
            >
                {reviews.reviews.map((review) => {
                    return (
                        <Grid
                            className={classes.review}
                            item
                            direction="column"
                            justify="flex-start"
                            alignItems="flex-start"
                        >
                            <Review review={review} />
                            <Divider className={classes.divider} />
                        </Grid>
                    );
                })}
            </Grid>
            {reviews.reviews.length < reviews.size && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onLoadMoreReviews}
                    // startIcon={<CreateIcon />}
                >
                    Load More
                </Button>
            )}
        </Grid>
    );
}
