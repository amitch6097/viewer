import React from 'react';
import './CreateView.less';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { strings } from '../../strings';

import {
    EIdentify,
    IIdentify,
    IOwner,
    IBusinessListing,
} from '../../../typings/types';
import { AppBar } from '../../components/AppBar';
import { Footer } from '../../components/Footer';
import { InfoStep } from './Steps/InfoStep';
import { IdentifyStep } from './Steps/IdentifyStep';
import { DetailsStep } from './Steps/DetailsStep';
import { OwnerStep } from './Steps/OwnerStep';
import { CheckExistsStep } from './Steps/CheckExistsStep';

export interface ICreateViewProps {
    step: number;
    business: IBusinessListing;
    exists: boolean;
    creating: boolean;
    onClickStepLink: (index: number) => void;
    onChangeBusinessValue: (key: string) => (value: string) => void;
    setStep: (index: number) => void;
    onAddOwnerImage: (index) => (e) => void;
    onChangeOwnerValue: (
        index: number
    ) => (key: string) => (value: string) => void;
    removeOwner: (index: number) => () => void;
    addOwner: () => void;
    onChangeIdentityText: (identity: EIdentify, text: string) => void;
    onChangeIdentitySelected: (identity: EIdentify, selected: boolean) => void;
    onChangeOwnerBio: (index: number) => (bio: string) => void;
    onCreateListing: () => void;
    onSetExists: (exists: boolean) => void;
    onStartCreate: (businessName: string) => void;
}

export class CreateView extends React.Component<ICreateViewProps> {
    static StepLabel({ completed, label, onClick }) {
        return completed ? <Link onClick={onClick}>{label}</Link> : label;
    }

    render() {
        const { step, exists } = this.props;

        const {
            category,
            phone,
            email,
            address,
            website,
            identify,
        } = this.props.business;

        return (
            <div className="bb-pages bb-pages-create">
                <div className="bb-pages-create__content">
                    {exists === undefined && (
                        <CheckExistsStep
                            onStartCreate={this.props.onStartCreate}
                        />
                    )}
                    {exists === false && (
                        <>
                            <Stepper activeStep={step}>
                                {[
                                    strings.create.stepLabels.info,
                                    strings.create.stepLabels.owner,
                                    strings.create.stepLabels.identify,
                                    strings.create.stepLabels.details,
                                ].map((stepLabel, index) => {
                                    return (
                                        <Step completed={step > index}>
                                            <StepLabel>
                                                <CreateView.StepLabel
                                                    onClick={this.props.onClickStepLink(
                                                        index
                                                    )}
                                                    completed={step > index}
                                                    label={stepLabel}
                                                />
                                            </StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                            {step === 0 && (
                                <InfoStep
                                    category={category}
                                    phone={phone}
                                    email={email}
                                    address={address}
                                    website={website}
                                    onChangeCategory={this.props.onChangeBusinessValue(
                                        'category'
                                    )}
                                    onChangePhone={this.props.onChangeBusinessValue(
                                        'phone'
                                    )}
                                    onChangeEmail={this.props.onChangeBusinessValue(
                                        'email'
                                    )}
                                    onChangeAddress={this.props.onChangeBusinessValue(
                                        'address'
                                    )}
                                    onChangeWebsite={this.props.onChangeBusinessValue(
                                        'website'
                                    )}
                                    onNextStep={() => this.props.setStep(1)}
                                />
                            )}
                            {step === 1 && (
                                <OwnerStep
                                    onNextStep={() => this.props.setStep(2)}
                                    onChangeOwnerValue={
                                        this.props.onChangeOwnerValue
                                    }
                                    onAddOwnerImage={this.props.onAddOwnerImage}
                                    removeOwner={this.props.removeOwner}
                                    addOwner={this.props.addOwner}
                                    owners={this.props.business.owners}
                                />
                            )}
                            {step === 2 && (
                                <IdentifyStep
                                    identify={identify}
                                    onChangeIdentityText={
                                        this.props.onChangeIdentityText
                                    }
                                    onChangeIdentitySelected={
                                        this.props.onChangeIdentitySelected
                                    }
                                    onNextStep={() => this.props.setStep(3)}
                                />
                            )}
                            {step === 3 && (
                                <DetailsStep
                                    creating={this.props.creating}
                                    business={this.props.business}
                                    onChangeAbout={this.props.onChangeBusinessValue(
                                        'about'
                                    )}
                                    onChangeOwnerBio={
                                        this.props.onChangeOwnerBio
                                    }
                                    onNextStep={this.props.onCreateListing}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        );
    }
}
