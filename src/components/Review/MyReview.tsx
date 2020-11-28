import {
    Card,
    Grid,
    Link,
    Typography,
    CardContent,
    CardActionArea,
} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Rating from '@material-ui/lab/Rating';
import React from 'react';
import { IReview } from '../../../typings/types';

export interface IMyReviewProps {
    review: IReview;
    onClick: () => void;
    onDelete: () => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexFlow: 'nowrap',
        display: 'flex',
        flexDirection: 'column',
    },
    businessName: {},
    review: {},
    reviewHeading: {
        display: 'flex',
        flexDirection: 'row',
    },
    reviewHeadingDate: {
        marginLeft: theme.spacing(1),
    },
    content: {
        padding: theme.spacing(2),
    },
    link: {
        fontSize: theme.typography.h4.fontSize,
    },
    actions: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
}));

export function MyReview(props: IMyReviewProps) {
    const theme = useTheme();
    const classes = useStyles(theme);
    const { review } = props;

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={props.onClick}>
                <CardContent className={classes.content}>
                    <Grid>
                        <Grid item className={classes.businessName}>
                            <Typography variant="h4" gutterBottom>
                                {review.businessName}
                            </Typography>
                        </Grid>
                        <Grid item className={classes.review}>
                            <div className={classes.reviewHeading}>
                                <Rating value={review.rating} readOnly />
                                <Typography
                                    className={classes.reviewHeadingDate}
                                >
                                    {new Date(
                                        review.createdAt
                                    ).toLocaleDateString()}{' '}
                                </Typography>
                            </div>

                            <Typography>{review.text}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.actions}>
                <IconButton aria-label="delete" onClick={props.onDelete}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
