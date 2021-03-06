import React from 'react';
import { IBusinessListing } from 'typings/types';
import { API } from '../../services';
import { ClaimBusinessView } from './ClaimBusinessView';
import * as firebase from 'firebase';

export interface IClaimBusinessContainerProps {
    businessId: string;
    business?: IBusinessListing;
    goToMyBusiness: () => void;
}

interface IClaimBusinessContainerState {
    canClaimWithEmail: boolean;
    phoneCodeClosure?: (code: string) => Promise<boolean>;
    usePhoneButtonId: string;
    error?: string;
}
interface IClaimBusinessContainerState {
    canClaimWithEmail: boolean;
    canClaimWithPhone: boolean;
    phoneCodeClosure?: (code: string) => Promise<boolean>;
    usePhoneButtonId: string;
    error?: string;
}

async function canUserClaimWithEmail(websiteRoot: string): Promise<boolean> {
    const user = await API.getMyUser();
    return Boolean(websiteRoot && user?.email?.indexOf(websiteRoot) > 0);
}

async function canUserClaimWithPhone(phoneNumber: string): Promise<boolean> {
    const canClaimWithPhone = await API.getUserWithPhoneNumberExists(phoneNumber);
    return canClaimWithPhone;
}


export class ClaimBusinessContainer extends React.Component<IClaimBusinessContainerProps, IClaimBusinessContainerState> {

    constructor(props) {
        super(props);

        this.state = {
            canClaimWithEmail: false,
            canClaimWithPhone: false,
            phoneCodeClosure: undefined,
            usePhoneButtonId: 'use-phone-button',
            error: undefined
        }

        if (props.business){
            canUserClaimWithEmail(props.business.websiteRoot).then(this.setCanClaimWithEmail);
            canUserClaimWithPhone(props.business.phone).then(this.setCanClaimWithPhone);
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.business !== prevProps.business) {
            canUserClaimWithEmail(this.props.business.websiteRoot).then(this.setCanClaimWithEmail);
        }
    }

    setCanClaimWithEmail = (canClaimWithEmail: boolean) => {
        this.setState({
            canClaimWithEmail
        });
    }

    setCanClaimWithPhone = (canClaimWithPhone: boolean) => {
        this.setState({
            canClaimWithPhone
        });
    }

    onClickClaimWithEmail = async () =>  {
        try {
            await API.claimBusiness(this.props.businessId);
            this.props.goToMyBusiness();
        } catch (err) {
            console.warn(err);
        }
    }

    onClickClaimWithPhone = async () => {
        //@ts-ignore
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            this.state.usePhoneButtonId,
            {
                size: 'invisible',
                callback: (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    this.onClickClaimWithPhone();
                },
            }
        );
        const response = await API.linkPhoneNumber('+1' + this.props.business.phone);

        if(response) {
            this.setState({
                phoneCodeClosure: response
            });
        } else {
            console.warn('error using phone code')
        }
    }

    onSubmitPhoneNumberCode = async (code: string) => {
        if (this.state.phoneCodeClosure) {
            const result = await this.state.phoneCodeClosure(code);
            if(result) {
                this.props.goToMyBusiness();
            } else {
                this.setState({
                    error: 'There was an issue confirming the code, please try again later'
                });
            }
        }
    }
    
    render() {
        const readyForPhoneCode = Boolean(this.state.phoneCodeClosure);
        return (
            <ClaimBusinessView
                error={this.state.error}
                usePhoneButtonId={this.state.usePhoneButtonId}
                business={this.props.business}
                readyForPhoneCode={readyForPhoneCode}
                onClickClaimWithPhone={this.onClickClaimWithPhone}
                onSubmitPhoneNumberCode={this.onSubmitPhoneNumberCode}
                canClaimWithEmail={this.state.canClaimWithEmail}
                canClaimWithPhone={this.state.canClaimWithPhone}
                onClickClaimWithEmail={this.onClickClaimWithEmail}
            />
        );
    }
    
}