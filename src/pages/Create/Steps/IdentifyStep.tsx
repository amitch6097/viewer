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

export interface IIdentifyStepProps {
    onChangeIdentitySelected: (identity: EIdentify, selected: boolean) => void;
    onChangeIdentityText: (identity: EIdentify, text: string) => void;
    identify: Record<EIdentify, IIdentify>;
    onNextStep: () => void;
}

export interface IIdentifyStepState {
    errors: Record<EIdentify, string>;
}

export class IdentifyStep extends React.Component<
    IIdentifyStepProps,
    IIdentifyStepState
> {
    static Label(): string {
        return 'Identify your Business';
    }

    state: IIdentifyStepState = {
        errors: {} as Record<EIdentify, string>,
    };

    checkFields = () => {
        let hasErrors = false;
        const errors: Record<EIdentify, string> = Object.keys(
            this.props.identify
        ).reduce(
            (tempErrors, key: EIdentify) => {
                const identity = this.props.identify[key];
                if (identity.selected && !identity.text) {
                    hasErrors = true;
                    tempErrors[key] = 'Please provide more information.';
                }
                return tempErrors;
            },
            {} as Record<EIdentify, string>
        );

        this.setState({
            errors,
        });

        if (!hasErrors) {
            this.props.onNextStep();
        }
    };

    render() {
        const { errors } = this.state;
        return (
            <div className="bb-identify-step">
                <Grid
                    classes={{ root: 'bb-owner-identify-container' }}
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    {Object.keys(this.props.identify).map((key: EIdentify) => {
                        const identity = this.props.identify[key];

                        return (
                            <ExpandCheckbox
                                selected={identity.selected}
                                onChangeSelected={() =>
                                    this.props.onChangeIdentitySelected(
                                        key,
                                        !identity.selected
                                    )
                                }
                                label={strings.create.identify[key].label}
                            >
                                <Grid
                                    container
                                    direction="column"
                                    justify="flex-start"
                                    alignItems="flex-start"
                                >
                                    <h3>Tell us more!</h3>
                                    {errors && errors[key] && (
                                        <Alert severity="error">
                                            {errors[key]}
                                        </Alert>
                                    )}
                                    <TextareaAutosize
                                        style={{ width: '100%' }}
                                        aria-label="empty textarea"
                                        rowsMin={3}
                                        onChange={onChangeValue(v =>
                                            this.props.onChangeIdentityText(
                                                key,
                                                v
                                            )
                                        )}
                                        value={identity.text}
                                    />
                                </Grid>
                            </ExpandCheckbox>
                        );
                    })}
                    <Button
                        onClick={this.checkFields}
                        classes={{
                            root: 'bb-identify-step__continue continue',
                        }}
                        variant="contained"
                        color="primary"
                    >
                        {strings.buttons.continue}
                    </Button>
                </Grid>
            </div>
        );
    }
}
