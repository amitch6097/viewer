import React from 'react';
import { Grid, Typography, Button, Container } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { onChangeValue } from '../../helpers';

export interface IReviewProps {
    onSubmitReview: (review: { text: string; rating: number }) => void;
    placeholder: string;
    submitText: string;
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: '10px',
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: '10px',
    },
    textarea: {
        padding: '5px',
        resize: 'none',
        border: 'none',
        '&:focus': {
            border: 'none',
            outline: 'none',
        },
    },
    submitContainer: {
        padding: '0px'
    }
}));

export function CreateReview(props: any) {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [rating, setRating] = React.useState(5);
    const [text, setText] = React.useState('');

    function onSubmitReview() {
        if (props.onSubmitReview) {
            props.onSubmitReview({
                text,
                rating,
            });
        }
    }

    return (
        <Grid container direction="column" className={classes.root}>
            <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                    setRating(newValue);
                }}
            />
            <TextareaAutosize
                className={classes.textarea}
                rowsMin={5}
                placeholder={props.placeholder}
                onChange={onChangeValue(setText)}
                value={text}
            />
            <Container className={classes.submitContainer}>
                <Button
                    onClick={onSubmitReview}
                    variant="contained"
                    color="primary"
                >
                    {props.submitText}
                </Button>
            </Container>
        </Grid>
    );
}
