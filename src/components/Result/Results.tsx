import React from 'react';
import { IBusinessListing } from '../../../typings/types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, GridSpacing, Typography } from '@material-ui/core';
import { Result, ResultActions, ResultSkeleton } from './Result';

export interface IResultsProps {
    businesses: Record<string, IBusinessListing>;
    imageSize?: number;
    onClick: (index: string) => void;
    spacing?: number;
    styles?: {
        root?: object;
        item?: object;
    };
    minimal?: boolean;
    actions?: Partial<ResultActions>;
    onClickAction?: (action: keyof ResultActions, businessId: string) => void;
}

const useStyles = makeStyles({
    root: (props: IResultsProps) => {
        return {
            flex: 1,
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

export function Results(props: IResultsProps) {
    const classes = useStyles(props);
    return (
        <Grid
            container
            spacing={(props.spacing as GridSpacing) || 2}
            direction="column"
            alignItems="center"
            className={classes.root}
        >
            {Object.keys(props.businesses).length ? (
                Object.keys(props.businesses).map((key) => {
                    const business = props.businesses[key];
                    return (
                        <Grid className={classes.item} key={key} item>
                            <Result
                                {...props}
                                onClick={() => props.onClick(key)}
                                business={business}
                                actions={props.actions}
                                onClickAction={(action: keyof ResultActions) =>
                                    props.onClickAction(action, key)
                                }
                            />{' '}
                        </Grid>
                    );
                })
            ) : (
                <Typography>
                    No Results, Lets create one! Click continue below
                </Typography>
            )}
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
