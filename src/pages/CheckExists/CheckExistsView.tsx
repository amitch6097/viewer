import React from 'react';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { strings } from '../../strings';
import {
    LocationAutocomplete,
    BusinessAutocomplete,
} from '../../components/Search';
import { Results } from '../../components/Result';
import { IBusinessListing } from '../../../typings/types';

export interface ICheckExistsViewProps {
    onContinueClicked: () => void;
    onSearch?: () => void;
    onChangeBusiness: (value: string) => void;
    onChangeLocationValue: (value: string) => void;
    onChangeLocationSuggestion: (suggestion: any) => void;
    onClickResult: (key: string) => void;
    locationValue?: string;
    businessValue?: string;
    results: Record<string, IBusinessListing>;
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        minHeight: 'calc(var(--page-height) - var(--page-padding) - var(--page-padding))'
    },
    content: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap'
    },
    inputs: {
        padding: '10px'
    },
    item: {
        width: '100%',
    },
    results: {
        padding: '10px',
        maxHeight: '500px',
        overflowY: 'auto'
    },
    continue: {
        alignSelf: 'flex-end'
    }
});

export function CheckExistsView({
    onChangeBusiness,
    onChangeLocationSuggestion,
    onChangeLocationValue,
    onClickResult,
    onSearch,
    locationValue,
    businessValue,
    results,
    onContinueClicked,
}: ICheckExistsViewProps) {
    const classes = useStyles();
    return (
        <Grid
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            className={classes.root}
        >
            <Typography variant="h4" gutterBottom>
                Let's Check if a Listing already exists for your Business
            </Typography>
            <Grid
                className={classes.content}
                direction="row"
                justify="space-between"
                alignItems="flex-start"
            >
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                    className={classes.inputs}
                    spacing={3}
                    sm={12} md={6}
                >
                    <Grid item className={classes.item}>
                        <BusinessAutocomplete
                            onChange={onChangeBusiness}
                            onClear={() => onChangeBusiness('')}
                            disable={true}
                            value={businessValue}
                        />
                    </Grid>
                    <Grid item className={classes.item}>
                        <LocationAutocomplete
                            cityResultsOnly={true}
                            onChange={onChangeLocationValue}
                            onClear={() =>
                                onChangeLocationSuggestion(undefined)
                            }
                            onClickSuggestion={onChangeLocationSuggestion}
                            placeholder={'Enter the City of your Business'}
                            useTextField={true}
                            value={locationValue}
                        />
                    </Grid>
                </Grid>
                <Grid sm={12} md={6} className={classes.results}>
                    <Results
                        businesses={results}
                        minimal={true}
                        onClick={onClickResult}
                    />
                </Grid>
            </Grid>
            <Button
                variant="contained"
                color="primary"
                onClick={onContinueClicked}
                className={classes.continue}
            >
                {strings.buttons.continue}
            </Button>
        </Grid>
    );
}
