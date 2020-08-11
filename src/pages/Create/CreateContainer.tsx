import React from 'react';
import { EIdentify, IIdentify, IOwner, IBusinessListing } from 'typings/types';

import { IAlgoliaLocationSearchEvent } from 'typings/algolia';

import { LocalStorage } from '../../services/LocalStorage';
import { CreateView } from './CreateView';
import { generateGUID } from '../../helpers';
import { Business } from '../../lib/Business';

export interface ICreateContainerProps {
    goToBusiness: (id: string) => void;
}
export interface ICreateContainerState {
    step: number;
    business: Business;
    exists: boolean;
    creating: boolean;
}

export class CreateContainer extends React.Component<
    ICreateContainerProps,
    ICreateContainerState
> {
    static LocalStorageId = 'bb-create-state';

    constructor(props) {
        super(props);
        // const localStorageState = LocalStorage.get(
        //     CreateContainer.LocalStorageId
        // ) as ICreateContainerState;
        this.state =  {
            step: 0,
            exists: undefined,
            creating: false,
            business: new Business()
        };
    }

    onChangeBusiness = (business: Business) => {
        this.setState({
            business
        });
    }

    onSetExists = (exists: boolean) => {
        this.setState({
            exists,
        });
    };

    onCreateListing = async () => {
        this.setState({
            creating: true,
        });
        const response = await this.state.business.onCreateListing();
        this.setState({
            creating: false,
        });
        // LocalStorage.clear(CreateContainer.LocalStorageId);
        this.props.goToBusiness(response.id);
        console.log(response);
    };

    addOwner = () => {
        this.setState({
            business: this.state.business.onAddOwner()
        });
    };

    removeOwner = (index) => () => {
        this.setState({
            business: this.state.business.onRemoveOwner(index)
        });
    };

    onChangeOwnerValue = (index: number) => (key: keyof IOwner) => (
        value: string
    ) => {
        this.setState({
            business: this.state.business.onChangeOwnerValue(index, key, value)
        });
    };

    onAddOwnerImage = (index) => (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        this.setState({
            business: this.state.business.onAddOwnerImage(index, url)
        });
    };

    setStep = (step: number) => {
        // LocalStorage.set(CreateContainer.LocalStorageId, this.state);
        this.setState({
            step,
        });
    };

    onChangeBusinessValue = (key: keyof IBusinessListing) => (value: string) => {
        this.setState({
            business: this.state.business.onChangeBusinessValue(key, value)
        });
    };

    onChangeIdentitySelected = (identity: EIdentify, selected: boolean) => {
        this.setState({
            business: this.state.business.onChangeIdentitySelected(identity, selected)
        });
    };

    onChangeIdentityText = (identity: EIdentify, text: string) => {
        this.setState({
            business: this.state.business.onChangeIdentityText(identity, text)
        });
    };

    onChangeOwnerBio = (index: number) => (bio: string) => {
        this.setState({
            business: this.state.business.onChangeOwnerValue(index, 'bio', bio)

        });
    };

    onClickStepLink = (index) => (e) => {
        e.preventDefault();
        this.setStep(index);
    };

    onStartCreate = (businessName: string) => {
        this.setState({
            exists: false,
            business: this.state.business.onChangeBusinessValue('name', businessName)
        });
    };

    onChangeAddress = (event: IAlgoliaLocationSearchEvent) => {
        const address = event.suggestion;
        this.setState({
            exists: false,
            business: this.state.business.onChangeBusinessValue('address', address)
        });
    };

    render() {
        return (
            <CreateView
                step={this.state.step}
                creating={this.state.creating}
                business={this.state.business.getData()}
                onClickStepLink={this.onClickStepLink}
                onChangeBusinessValue={this.onChangeBusinessValue}
                setStep={this.setStep}
                onAddOwnerImage={this.onAddOwnerImage}
                onChangeOwnerValue={this.onChangeOwnerValue}
                removeOwner={this.removeOwner}
                addOwner={this.addOwner}
                onChangeIdentityText={this.onChangeIdentityText}
                onChangeIdentitySelected={this.onChangeIdentitySelected}
                onChangeOwnerBio={this.onChangeOwnerBio}
                onCreateListing={this.onCreateListing}
                onSetExists={this.onSetExists}
                exists={this.state.exists}
                onStartCreate={this.onStartCreate}
                onChangeAddress={this.onChangeAddress}
                businessClass={this.state.business}
                onChangeBusiness={this.onChangeBusiness}
            />
        );
    }
}
