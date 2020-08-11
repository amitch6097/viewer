import React from 'react';
import './InfoStep.less';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import { strings } from '../../../strings';
import { onChangeValue } from '../../../helpers';
import { EmailMask, PhoneMask } from '../../../components/Masks';

import { LocationAutocomplete } from '../../../components/Search';
import { Select } from '../../../components/Select';
import { getCategories } from '../../../helpers';
import { IAlgoliaLocationSearchEvent } from 'typings/algolia';
import { IImage } from 'typings/types';
import { Business } from 'src/lib/Business';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

export interface IInfoStepProps {
    category: string;
    phone: string;
    email: string;
    address: string;
    website: string;

    onChangeBusiness: (business: Business) => void;
    business: Business;

    onChangeCategory: (str: string) => void;
    onChangePhone: (str: string) => void;
    onChangeEmail: (str: string) => void;
    onChangeAddress: (str: string) => void;
    onChangeWebsite: (str: string) => void;
    onNextStep: () => void;
    onClickAddressSuggestion: (event: IAlgoliaLocationSearchEvent) => void;
}

export interface IInfoStepState {
    categoryError: string;
    phoneError: string;
    emailError: string;
}

export class InfoStep extends React.Component<IInfoStepProps, IInfoStepState> {
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
        const {
            image,
            category,
            phone,
            email,
            address,
            website,
        } = this.props.business.getData();
        return (
            <div className="bb-info-step">
                <Grid
                    container
                    direction="row"
                >
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
                            label={
                                strings.create.info.labels.phone + ' &nbsp;*'
                            }
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
                            label={
                                strings.create.info.labels.email + ' &nbsp;*'
                            }
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

                        <LocationAutocomplete
                            onChange={this.props.onChangeAddress}
                            onClickSuggestion={
                                this.props.onClickAddressSuggestion
                            }
                            label={strings.create.info.labels.address}
                            useTextField={true}
                            className="bb-info-step__text-field"
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
                            classes={{
                                root: 'bb-info-step__continue continue',
                            }}
                            variant="contained"
                            color="primary"
                        >
                            {strings.buttons.continue}
                        </Button>
                    </Grid>

                    <Avatar
                        className={'bb-info-step__image'}
                        src={image?.url}
                    />
                    <div className="bb-info-step__image-upload">
                        <input
                            className={'bb-info-step__image-upload-input'}
                            accept="image/*"
                            id="icon-button-photo"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                const url = URL.createObjectURL(file);
                                this.props.onChangeBusiness(
                                    this.props.business.onAddImage(url)
                                )
                            }}
                            type="file"
                        />
                        <label htmlFor="icon-button-photo">
                            <IconButton color="primary" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                    </div>
                </Grid>
            </div>
        );
    }
}
