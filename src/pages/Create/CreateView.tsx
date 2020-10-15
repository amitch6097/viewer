import React from 'react';
import './CreateView.less';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import { strings } from '../../strings';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';

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
import { IAlgoliaLocationSearchEvent } from 'typings/algolia';
import { Business } from '../../lib/Business';
import { CheckExists } from '../CheckExists/CheckExists';

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
    onChangeAddress: (value: IAlgoliaLocationSearchEvent) => void;

    businessClass: Business;
    onChangeBusiness: (business: Business) => void;
    onClickResult: (id: string) => void;
}

const useStyles = makeStyles({
    root: {
        minHeight: 'var(--page-height)',
        paddingTop: 'var(--page-padding)',
        paddingBottom: 'var(--page-padding)',
    },
});

export function CreateView(props: ICreateViewProps) {
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = (e) => {
        const form = new FormData(e.target);
        e.preventDefault();
        //@ts-ignore
        for(var pair of form.entries()) {
            console.log(pair[0]+ ', '+ pair[1]); 
         }
    };

    function CheckExistsStepLabel({ completed, label, onClick }) {
        return completed ? <Link onClick={onClick}>{label}</Link> : label;
    }

    const classes = useStyles();
    const { step, exists } = props;

    const {
        category,
        phone,
        email,
        address,
        website,
        identify,
    } = props.business;

    return (
        <Container className={classes.root}>
            <form onSubmit={onSubmit}>
                {exists === undefined && (
                    <CheckExists
                        onClickResult={props.onClickResult}
                        onClickContinue={props.onStartCreate}
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
                                            <CheckExistsStepLabel
                                                onClick={props.onClickStepLink(
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
                                onNextStep={() => props.setStep(1)}
                            />
                        )}
                        {step === 1 && (
                            <OwnerStep
                                onNextStep={() => props.setStep(2)}
                                onChangeOwnerValue={props.onChangeOwnerValue}
                                onAddOwnerImage={props.onAddOwnerImage}
                                removeOwner={props.removeOwner}
                                addOwner={props.addOwner}
                                owners={props.business.owners}
                            />
                        )}
                        {step === 2 && (
                            <IdentifyStep
                                identify={identify}
                                onChangeIdentityText={
                                    props.onChangeIdentityText
                                }
                                onChangeIdentitySelected={
                                    props.onChangeIdentitySelected
                                }
                                onNextStep={() => props.setStep(3)}
                            />
                        )}
                        {step === 3 && (
                            <DetailsStep
                                creating={props.creating}
                                business={props.business}
                                onChangeAbout={props.onChangeBusinessValue(
                                    'about'
                                )}
                                onChangeOwnerBio={props.onChangeOwnerBio}
                                onNextStep={props.onCreateListing}
                            />
                        )}
                    </>
                )}
                <Button type="submit">Submit</Button>
            </form>
        </Container>
    );
}
