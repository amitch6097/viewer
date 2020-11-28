import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import {
    IBusinessListing
} from '../../../typings/types';
import { strings } from '../../strings';
import { CheckExists } from '../CheckExists/CheckExists';
import { DetailsStep } from './Steps/DetailsStep';
import { IdentifyStep, IdentifyStepState } from './Steps/IdentifyStep';
import { IInfoStepState, InfoStep } from './Steps/InfoStep';
import { OwnerStep, OwnerStepState } from './Steps/OwnerStep';

export interface ICreateViewProps {
    step: number;
    exists: boolean;
    name: string;
    info: IInfoStepState;
    owner: OwnerStepState;
    identify: IdentifyStepState;
    onStartCreate: (businessName: string) => void;
    onClickResult: (id: string) => void;
    onClickStepLink: (index: number) => (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    onSetInfo: (state: IInfoStepState) => void;
    onSetOwner: (state: OwnerStepState) => void;
    onSetIdentify: (state: IdentifyStepState) => void;
    onCreateListing: (state: IBusinessListing) => void;
}

const useStyles = makeStyles({
    root: {
        minHeight: 'var(--page-height)',
        paddingTop: 'var(--page-padding)',
        paddingBottom: 'var(--page-padding)',
    },
});

export function CreateView(props: ICreateViewProps) {
    const classes = useStyles();

    function CheckExistsStepLabel({ completed, label, onClick }) {
        return completed ? <Link onClick={onClick}>{label}</Link> : label;
    }

    return (
        <Container className={classes.root}>
                {props.exists === undefined && (
                    <CheckExists
                        onClickResult={props.onClickResult}
                        onClickContinue={props.onStartCreate}
                    />
                )}
                {props.exists === false && (
                    <>
                        <Stepper activeStep={props.step}>
                            {[
                                strings.create.stepLabels.info,
                                strings.create.stepLabels.owner,
                                strings.create.stepLabels.identify,
                                strings.create.stepLabels.details,
                            ].map((stepLabel, index) => {
                                return (
                                    <Step completed={props.step > index}>
                                        <StepLabel>
                                            <CheckExistsStepLabel
                                                onClick={props.onClickStepLink(
                                                    index
                                                )}
                                                completed={props.step > index}
                                                label={stepLabel}
                                            />
                                        </StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {props.step === 0 && (
                            <InfoStep
                                withImage={true}
                                onNextStep={props.onSetInfo}
                            />
                        )}
                        {props.step === 1 && (
                            <OwnerStep
                                onNextStep={props.onSetOwner}
                            />
                        )}
                        {props.step === 2 && (
                            <IdentifyStep
                                onNextStep={props.onSetIdentify}
                            />
                        )}
                        {props.step === 3 && (
                            <DetailsStep
                                onCreateListing={props.onCreateListing}
                                name={props.name}
                                info={props.info}
                                owner={props.owner}
                                identify={props.identify}
                            />
                        )}
                    </>
                )}
        </Container>
    );
}
