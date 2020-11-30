import { Container, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { CreateReview } from '../../components/Review';
import { strings } from '../../strings';


const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 'var(--page-height)',
        paddingTop: 'var(--page-padding)',
        paddingBottom: 'var(--page-padding)'
    },
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
            <Container className={classes.root}>
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
            </Container>
    );
}
