import React from 'react';
import './Listing.less';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { ListingTitleCard } from './ListingTitleCard';
import {
    Theme,
    createStyles,
    makeStyles,
    useTheme,
} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import { Pagination } from '../../components/Pagination';
import { IBusinessListing, IReviews } from '../../../typings/types';
import { onChangeValue } from '../../helpers';
import { strings } from '../../strings';
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
    review: {},
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
