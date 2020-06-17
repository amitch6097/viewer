import React from 'react';
import {
    EIdentify,
    IIdentify,
    IOwner,
    IBusinessListing,
} from '../../../typings/types';

import { CreateView } from './CreateView';

export interface ICreateContainerState {
    step: number;
    business: IBusinessListing;
}

function getLocalStorageState(): ICreateContainerState | undefined{
    if (window?.localStorage) {
        const stateString = window.localStorage.getItem(CreateContainer.LocalStorageId);
        const state = stateString && JSON.parse(stateString);
        return state;
    }
}

export class CreateContainer extends React.Component<
    {},
    ICreateContainerState
> {

    static LocalStorageId = 'bb-create-state'

    constructor(props) {
        super(props);
        
        const localStorageState = getLocalStorageState();
        this.state = localStorageState || {
            step: 0,
            business: {
                about: '',
                name: '',
                category: '',
                phone: '',
                email: '',
                address: '',
                website: '',
                identify: {
                    [EIdentify.MINORITY]: {
                        selected: false,
                        text: '',
                    },
                    [EIdentify.FEMALE]: {
                        selected: false,
                        text: '',
                    },
                },
                owners: [
                    {
                        name: '',
                        bio: '',
                        position: '',
                        image: undefined,
                    },
                ],
            },
        };
    }

    addOwner = () => {
        const { owners } = this.state.business;

        this.setState({
            business: {
                ...this.state.business,
                owners: [
                    ...owners,
                    {
                        name: '',
                        bio: '',
                        position: '',
                        image: undefined,
                    },
                ],
            },
        });
    };

    removeOwner = index => () => {
        const { owners } = this.state.business;
        const ownersCopy = [...owners];
        ownersCopy.splice(index, 1);

        this.setState({
            business: {
                ...this.state.business,
                owners: ownersCopy,
            },
        });
    };

    onChangeOwnerValue = (index: number) => (key: string) => (
        value: string
    ) => {
        const { owners } = this.state.business;
        owners[index] = {
            ...owners[index],
            [key]: value,
        };
        this.setState({
            business: {
                ...this.state.business,
                owners: [...owners],
            },
        });
    };

    onAddOwnerImage = index => e => {
        const { owners } = this.state.business;

        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        console.log(url);
        owners[index] = {
            ...owners[index],
            image: url,
        };
        this.setState({
            business: {
                ...this.state.business,
                owners: [...owners],
            },
        });
    };

    setStep = (step: number) => {
        if (window?.localStorage) {
            window.localStorage.setItem(CreateContainer.LocalStorageId, JSON.stringify(this.state))
        }
        this.setState({
            step,
        });
    };

    onChangeBusinessValue = (key: string) => (value: string) => {
        this.setState({
            business: {
                ...this.state.business,
                [key]: value,
            },
        });
    };

    onChangeIdentitySelected = (identity: EIdentify, selected: boolean) => {
        this.setState({
            business: {
                ...this.state.business,
                identify: {
                    ...this.state.business.identify,
                    [identity]: {
                        ...this.state.business.identify[identity],
                        selected,
                    },
                },
            },
        });
    };

    onChangeIdentityText = (identity: EIdentify, text: string) => {
        this.setState({
            business: {
                ...this.state.business,
                identify: {
                    ...this.state.business.identify,
                    [identity]: {
                        ...this.state.business.identify[identity],
                        text,
                    },
                },
            },
        });
    };

    onChangeOwnerBio = (index: number) => (bio: string) => {
        const { owners } = this.state.business;
        owners[index].bio = bio;
        this.setState({
            business: {
                ...this.state.business,
                owners: [...owners],
            },
        });
    };

    onClickStepLink = index => e => {
        e.preventDefault();
        this.setStep(index);
    };

    render() {
        return (
            <CreateView
                step={this.state.step}
                business={this.state.business}
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
            />
        );
    }
}