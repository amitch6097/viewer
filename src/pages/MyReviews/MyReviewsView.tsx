import React from 'react';

import { Container, Grid, Typography } from '@material-ui/core';
import { MyReview } from '../../components/Review';
import { IReview, IReviews } from 'typings/types';
import { makeStyles, useTheme } from '@material-ui/core/styles';

export interface IMyReviewsViewProps {
    reviews: IReview[];
    onClickReview: (businessId: string) => void;
    onDeleteReview: (reviewId: string) => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 'var(--page-height)',
        paddingTop: 'var(--page-padding)',
        paddingBottom: 'var(--page-padding)',
    },
    reviews: {
        gridRowGap: theme.spacing(2),
        gridColumnGap: theme.spacing(2),
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 600px))',
    },
    review: {},
}));

export function MyReviewsView(props: IMyReviewsViewProps) {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <Container className={classes.root}>
            <Typography variant="h3" gutterBottom>
                Reviews
            </Typography>
            <Grid container direction="column" className={classes.reviews}>
                {props.reviews?.length ? (
                    props.reviews.map((review) => {
                        return (
                            <Grid item className={classes.review}>
                                <MyReview
                                    review={review}
                                    onDelete={() =>
                                        props.onDeleteReview(review.id)
                                    }
                                    onClick={() =>
                                        props.onClickReview(review.businessId)
                                    }
                                />
                            </Grid>
                        );
                    })
                ) : (
                    <Typography>No Reviews Yet!</Typography>
                )}
            </Grid>
        </Container>
    );
}
