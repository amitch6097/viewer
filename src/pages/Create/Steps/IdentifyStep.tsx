import React from 'react';
import './IdentifyStep.less';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

import { ExpandCheckbox } from '../../../components/ExpandCheckbox';
import { EIdentify, IIdentify } from '../../../../typings/types';
import { onChangeValue } from '../../../helpers';
import { strings } from '../../../strings';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

export interface IIdentifyStepProps {
    onChangeIdentitySelected: (identity: EIdentify, selected: boolean) => void;
    onChangeIdentityText: (identity: EIdentify, text: string) => void;
    identify: Record<EIdentify, IIdentify>;
    onNextStep: () => void;
}

export interface IIdentifyStepState {
    errors: Record<EIdentify, string>;
}

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

export function IdentifyStep(props: IIdentifyStepProps) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        errors: {} as Record<EIdentify, string>,
    });

    function checkFields() {
        let hasErrors = false;
        const errors: Record<EIdentify, string> = Object.keys(
            props.identify
        ).reduce((tempErrors, key: EIdentify) => {
            const identity = props.identify[key];
            if (identity.selected && !identity.text) {
                hasErrors = true;
                tempErrors[key] = 'Please provide more information.';
            }
            return tempErrors;
        }, {} as Record<EIdentify, string>);

        setState({
            errors,
        });

        if (!hasErrors) {
            props.onNextStep();
        }
    }

    const { errors } = state;
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
                {Object.keys(props.identify).map((key: EIdentify) => {
                    const identity = props.identify[key];

                    return (
                        <ExpandCheckbox
                            selected={identity.selected}
                            onChangeSelected={() =>
                                props.onChangeIdentitySelected(
                                    key,
                                    !identity.selected
                                )
                            }
                            label={strings.create.identify[key].label}
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
                                {errors && errors[key] && (
                                    <Alert severity="error">
                                        {errors[key]}
                                    </Alert>
                                )}
                                <TextareaAutosize
                                    style={{ width: '100%' }}
                                    aria-label="empty textarea"
                                    rowsMin={3}
                                    onChange={onChangeValue((v) =>
                                        props.onChangeIdentityText(key, v)
                                    )}
                                    value={identity.text}
                                />
                            </Grid>
                        </ExpandCheckbox>
                    );
                })}
            </Grid>
            <Button
                onClick={checkFields}
                className={classes.continue}
                variant="contained"
                color="primary"
            >
                {strings.buttons.continue}
            </Button>
        </Grid>
    );
}
