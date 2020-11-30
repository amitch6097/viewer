import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Rating_M from '@material-ui/lab/Rating';
import React from 'react';

export interface IRatingProps {
    average: number;
    reviewCount: number;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'row',
            justify: 'flex-start',
            alignItems: 'flex-start',
        },
        ratingCount: {
            marginLeft: theme.spacing(1),
        },
    })
);

export function Rating(props: IRatingProps) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Rating_M
                precision={0.25}
                name="simple-controlled"
                value={props.average || 0}
                readOnly
            />
            <Typography component="p" className={classes.ratingCount} color='textSecondary'>
                {`${props.reviewCount || 0} reviews`}
            </Typography>
        </div>
    );
}
