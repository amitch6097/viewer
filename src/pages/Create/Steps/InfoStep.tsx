import React from 'react';
import './InfoStep.less';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import { strings } from '../../../strings';
import { onChangeValue } from '../../../helpers';
import { EmailMask, PhoneMask } from '../../../components/Masks';

import { Select } from '../../../components/Select';
import { getCategories } from '../../../helpers';

export interface IInfoStepProps {
    category: string;
    phone: string;
    email: string;
    address: string;
    website: string;
    onChangeCategory: (str: string) => void;
    onChangePhone: (str: string) => void;
    onChangeEmail: (str: string) => void;
    onChangeAddress: (str: string) => void;
    onChangeWebsite: (str: string) => void;
    onNextStep: () => void;
}

export interface IInfoStepState {
    categoryError: string;
    phoneError: string;
    emailError: string;
}

export class InfoStep extends React.Component<IInfoStepProps, IInfoStepState> {
    static Label() {
        return 'Basic Information';
    }

    state: IInfoStepState = {
        categoryError: '',
        phoneError: '',
        emailError: '',
    };

    checkFields = () => {
        const nextErrors: IInfoStepState = {
            categoryError: '',
            phoneError: '',
            emailError: '',
        };
        let hasError = false;

        if (!this.props.category) {
            hasError = true;
            nextErrors.categoryError = strings.create.info.errors.category;
        }
        if (!this.props.phone) {
            hasError = true;
            nextErrors.phoneError = strings.create.info.errors.phone;
        }
        if (!this.props.email) {
            hasError = true;
            nextErrors.emailError = strings.create.info.errors.email;
        }

        this.setState({
            ...nextErrors,
        });

        if (!hasError) {
            this.props.onNextStep();
        }
    };

    render() {
        return (
            <div className="bb-info-step">
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    <Select
                        error={this.state.categoryError}
                        className={'bb-info-step__text-field'}
                        value={this.props.category}
                        label={strings.create.info.labels.category}
                        onChange={this.props.onChangeCategory}
                        options={getCategories()}
                    />
                    <OutlinedInput
                        classes={{
                            root: 'bb-info-step__text-field show-label',
                        }}
                        value={this.props.phone}
                        onChange={onChangeValue(this.props.onChangePhone)}
                        name="phone"
                        error={Boolean(this.state.phoneError)}
                        // helperText={this.state.phoneError}
                        label={strings.create.info.labels.phone + '&nbsp;*'}
                        inputComponent={PhoneMask}
                    />
                    <OutlinedInput
                        classes={{
                            root: 'bb-info-step__text-field show-label',
                        }}
                        error={Boolean(this.state.emailError)}
                        // helperText={this.state.emailError}
                        value={this.props.email}
                        onChange={onChangeValue(this.props.onChangeEmail)}
                        name="email"
                        label={strings.create.info.labels.email + '&nbsp;*'}
                        inputComponent={EmailMask}
                    />
                    <TextField
                        classes={{
                            root: 'bb-info-step__text-field',
                        }}
                        key="address"
                        id="address"
                        label={strings.create.info.labels.address}
                        variant="outlined"
                        value={this.props.address}
                        onChange={onChangeValue(this.props.onChangeAddress)}
                    />
                    <TextField
                        classes={{
                            root: 'bb-info-step__text-field',
                        }}
                        key="website"
                        id="website"
                        label={strings.create.info.labels.website}
                        variant="outlined"
                        value={this.props.website}
                        onChange={onChangeValue(this.props.onChangeWebsite)}
                    />
                    <Button
                        onClick={this.checkFields}
                        classes={{ root: 'bb-info-step__continue continue' }}
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
