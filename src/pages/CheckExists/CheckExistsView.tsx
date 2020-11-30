import React from 'react';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CheckBox from '@material-ui/core/CheckBox';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { strings } from '../../strings';
import {
    LocationAutocomplete,
    BusinessAutocomplete,
} from '../../components/Search';
import { Results, ResultSkeleton } from '../../components/Result';
import { IBusinessListing } from '../../../typings/types';
import { FormControlLabel } from '@material-ui/core';

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
    searching: boolean;
    onChangeWebBusiness: (webBusiness: boolean) => void;
    webBusiness: boolean;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight:
            'calc(var(--page-height) - var(--page-padding) - var(--page-padding))',
    },
    content: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap',
    },
    inputs: {
        padding: theme.spacing(1),
    },
    input: {
        width: '100%',
        margin: theme.spacing(2),
    },
    results: {
        padding: '10px',
        maxHeight: '500px',
        overflowY: 'auto',
    },
    continue: {
        alignSelf: 'flex-end',
    },
}));

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
    searching,
    onChangeWebBusiness,
    webBusiness,
}: ICheckExistsViewProps) {
    const theme = useTheme();
    const classes = useStyles(theme);
    return (
        <Grid
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            className={classes.root}
            container
        >
            <Typography variant="h4" gutterBottom>
                Let's Check if a Listing already exists for your Business
            </Typography>
            <Grid
                className={classes.content}
                direction="row"
                justify="space-between"
                alignItems="flex-start"
                container
            >
                <Grid item className={classes.inputs} sm={12} md={6}>
                    <Grid item className={classes.input}>
                        <BusinessAutocomplete
                            onChange={onChangeBusiness}
                            onClear={() => onChangeBusiness('')}
                            disable={true}
                            value={businessValue}
                            placeholder="Enter Your Business Name"
                        />
                    </Grid>
                    <Grid item className={classes.input}>
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
                            disabled={webBusiness}
                        />
                    </Grid>
                    <Grid item className={classes.input}>
                        <FormControlLabel
                            control={
                                <CheckBox
                                    name="a"
                                    checked={webBusiness}
                                    onChange={(event) =>
                                        onChangeWebBusiness(
                                            event.target.checked
                                        )
                                    }
                                />
                            }
                            label="This businesses does not have a physical address"
                        />
                    </Grid>
                </Grid>
                <Grid item sm={12} md={6} className={classes.results}>
                    {searching ? (
                        <ResultSkeleton />
                    ) : (
                        <Results
                            businesses={results}
                            minimal={true}
                            onClick={onClickResult}
                            withFavorite={false}
                        />
                    )}
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
