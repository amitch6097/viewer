import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { EIdentify, IIdentify } from '../../../../typings/types';
import { ExpandCheckbox } from '../../../components/ExpandCheckbox';
import { useForm } from '../../../hooks/useForm';
import { strings } from '../../../strings';
import {config} from '../../../config';

export interface IIdentifyStepProps {
    onNextStep: (state: IdentifyStepState) => void;
}

export type IdentifyStepState = Record<EIdentify, IIdentify>

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight:
            'calc(var(--page-height) - var(--page-padding) - var(--page-padding))',
    },
    content: {
        flex: 1,
    },
    expandContent: {
        width: '100%',
        '& textarea': {
            resize: 'none',
        },
    },
    continue: {
        alignSelf: 'flex-end',
        marginTop: '25px',
    },
}));

const identities = Object.keys(config.identify).filter(key => config.identify[key].enabled);

export function IdentifyStep(props: IIdentifyStepProps) {
    const classes = useStyles();
    const { onSubmit, state, updateValue } = useForm(
        identities.reduce((__, key) => {
            __[key] = {
                label: strings.create.identify[key].label,
                value: {
                    selected: false,
                    text: undefined,
                },
                errorString: 'Please provide more information.',
                hasError: (state) =>
                    state[key].value.selected && !state[key].value.text,
            };
            return __;
        }, {}),
        props.onNextStep
    );

    return (
        <Grid className={classes.root} container direction="column">
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                spacing={5}
                className={classes.content}
            >
                {Object.keys(state).map((key: EIdentify) => {
                    return (
                        <ExpandCheckbox
                            selected={state[key].value.selected}
                            label={state[key].label}
                            onChangeSelected={() =>
                                updateValue(key, {
                                    ...state[key].value,
                                    selected: !state[key].value.selected,
                                })
                            }
                        >
                            <Grid
                                item
                                direction="column"
                                justify="flex-start"
                                alignItems="flex-start"
                                className={classes.expandContent}
                            >
                                <Typography variant="subtitle1">
                                    Tell us more!
                                </Typography>
                                {state[key].error && (
                                    <Alert severity="error">
                                        {state[key].errorString}
                                    </Alert>
                                )}
                                <TextareaAutosize
                                    style={{ width: '100%' }}
                                    aria-label="empty textarea"
                                    rowsMin={3}
                                    onChange={(e) =>
                                        updateValue(key, {
                                            ...state[key].value,
                                            text: e.target.value,
                                        })
                                    }
                                    value={state[key].value.text}
                                />
                            </Grid>
                        </ExpandCheckbox>
                    );
                })}
            </Grid>
            <Button
                onClick={onSubmit}
                className={classes.continue}
                variant="contained"
                color="primary"
            >
                {strings.buttons.continue}
            </Button>
        </Grid>
    );
}
