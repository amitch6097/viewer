import React from 'react';
import { Container, Grid, Link } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CreateReview } from '../../components/Review';
import { AppBar } from '../../components/AppBar';

import { strings } from '../../strings';

const useStyles = makeStyles((theme) => ({
    root: {},
    businessLink: {
        fontSize: theme.typography.h3.fontSize,
    },
}));

export interface ICreateReviewViewProps {
    onSubmitReview: (review: { text: string; rating: number }) => void;
    businessName: string;
    businessId: string;
}

export function CreateReviewView(props: ICreateReviewViewProps) {
    const classes = useStyles(props);
    return (
            <Grid container direction="column" className={classes.root}>
                <Link
                    className={classes.businessLink}
                    href={`/business/${props.businessId}`}
                >
                    {' '}
                    {props.businessName}
                </Link>

                <CreateReview
                    onSubmitReview={props.onSubmitReview}
                    submitText={strings.createReview.submitText}
                    placeholder={strings.createReview.placeholder}
                />
            </Grid>
    );
}
