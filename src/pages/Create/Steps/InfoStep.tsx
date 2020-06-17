import React from 'react';
import './InfoStep.less';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import { onChangeValue } from '../../../helpers';

import ExploreIcon from '@material-ui/icons/Explore';
import RoomIcon from '@material-ui/icons/Room';
import CallIcon from '@material-ui/icons/Call';

import ButtonGroup from '@material-ui/core/ButtonGroup';

import { EmailMask, PhoneMask } from '../../../components/Masks';

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
            nextErrors.categoryError = 'Please provide a category';
        }
        if (!this.props.phone) {
            hasError = true;
            nextErrors.phoneError = 'Please provide a phone number';
        }
        if (!this.props.email) {
            hasError = true;
            nextErrors.emailError = 'Please provide a email';
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
                    <TextField
                        classes={{
                            root: 'bb-info-step__text-field',
                        }}
                        required
                        id="category"
                        key="category"
                        label="Category"
                        variant="outlined"
                        error={Boolean(this.state.categoryError)}
                        value={this.props.category}
                        onChange={onChangeValue(this.props.onChangeCategory)}
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
                        label="Business Phone&nbsp;*"
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
                        label="Business Email&nbsp;*"
                        inputComponent={EmailMask}
                    />
                    <TextField
                        classes={{
                            root: 'bb-info-step__text-field',
                        }}
                        key="address"
                        id="address"
                        label="Address"
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
                        label="Website"
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
                        Continue
                    </Button>
                </Grid>
            </div>
        );
    }
}
