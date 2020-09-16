import React from 'react';

import { strings } from '../../strings';
import { EIdentify, IIdentify, IBusinessListing } from '../../../typings/types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

import { Select } from '../../components/Select';
import { getCategories } from '../../helpers';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

export interface IFilterProps {
    filters: Record<EIdentify, boolean>;
    category: string;
    locationDistance: number;
    onChangeFilterSelected: (key: EIdentify, selected: boolean) => void;
    onChangeLocationDistance: (value: number) => void;
    onChangeCategory: (category: string) => void;
}

const useStyles = makeStyles({
    root: {},
    title: {
        fontWeight: 700,
    },
});

export function Filters(props: IFilterProps) {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <Typography className={classes.title} variant="h5" gutterBottom>
                Filters
            </Typography>
            <Grid container direction="column" justify="flex-start">
                <Grid container direction="column" justify="flex-start">
                    {Object.keys(props.filters).map((key) => {
                        const selected = props.filters[key];
                        return (
                            <FormControlLabel
                                key={key}
                                control={
                                    <Checkbox
                                        checked={selected}
                                        onChange={() =>
                                            props.onChangeFilterSelected(
                                                key as EIdentify,
                                                !selected
                                            )
                                        }
                                        name={key}
                                        color="primary"
                                    />
                                }
                                label={strings.filters[key].label}
                            />
                        );
                    })}
                </Grid>
                <Select
                    withNoSelection={true}
                    value={props.category}
                    label={strings.create.info.labels.category}
                    onChange={props.onChangeCategory}
                    options={getCategories()}
                />

                <Input
                    value={props.locationDistance}
                    onChange={(e) =>
                        props.onChangeLocationDistance(Number(e.target.value))
                    }
                    type="number"
                    endAdornment={
                        <InputAdornment position="end">km</InputAdornment>
                    }
                    inputProps={{
                        'aria-label': 'Distance',
                    }}
                />
            </Grid>
        </Container>
    );
}
