import React from 'react';
import { IBusinessListing } from '../../../typings/types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Result, ResultSkeleton } from './Result';

export interface IResultsProps {
    businesses: Record<string, IBusinessListing>;
    minimal?: boolean;
    imageSize?: number;
    onClick: (index: string) => void;
    spacing?: number;
    styles?: {
        root?: object;
        item?: object;
    };
}

const useStyles = makeStyles({
    root: (props: IResultsProps) => {
        return {
            ...(props?.styles?.root || {}),
        };
    },
    item: (props: IResultsProps) => {
        return {
            width: '100%',
            ...(props?.styles?.item || {}),
        };
    },
});

export function Results(props) {
    const classes = useStyles(props);
    return (
        <Grid
            container
            spacing={props.spacing || 2}
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.root}
        >
            {Object.keys(props.businesses).map((key) => {
                const business = props.businesses[key];
                return (
                    <Grid className={classes.item} key={key} item>
                        <Result
                            {...props}
                            onClick={() => props.onClick(key)}
                            business={business}
                        />{' '}
                    </Grid>
                );
            })}
        </Grid>
    );
}

export function ResultsSkeleton() {
    const classes = useStyles({});
    return (
        <Grid
            container
            spacing={2}
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.root}
        >
            {new Array(3).fill(undefined).map((__, index) => {
                return (
                    <Grid className={classes.item} key={index} item>
                        <ResultSkeleton />
                    </Grid>
                );
            })}
        </Grid>
    );
}
