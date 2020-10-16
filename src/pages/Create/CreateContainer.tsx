import React from 'react';
import { IBusinessListing } from '../../../typings/types';
import { CreateView } from './CreateView';
import { IdentifyStepState } from './Steps/IdentifyStep';
import { IInfoStepState } from './Steps/InfoStep';
import { OwnerStepState } from './Steps/OwnerStep';



export interface ICreateContainerProps {
    goToBusiness: (id: string) => void;
}
export interface ICreateContainerState {
    step: number;
    exists: boolean;
    name: string;
    info?: IInfoStepState;
    owner?: OwnerStepState;
    identify?: IdentifyStepState;
}

export class CreateContainer extends React.Component<
    ICreateContainerProps,
    ICreateContainerState
> {
    static LocalStorageId = 'bb-create-state';

    constructor(props) {
        super(props);
        this.state =  {
            step: 0,
            exists: undefined,
            name: undefined,
            info: undefined,
            identify: undefined,
            owner: undefined,
        };
    }

    handleSetInfo = (info: IInfoStepState) => {
        this.setState({
            info,
            step: 1
        });
    }

    handleSetOwner = (owner: OwnerStepState) => {
        this.setState({
            owner,
            step: 2
        });
    }

    handleSetIdentify = (identify: IdentifyStepState) => {
        this.setState({
            identify,
            step: 3
        });
    }

    onCreateListing = async (business: IBusinessListing) => {
        // const response = await this.state.business.onCreateListing();
        // // LocalStorage.clear(CreateContainer.LocalStorageId);
        // this.props.goToBusiness(response.id);
        console.log(business);
    };


    onClickStepLink = (index: number) => (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        this.setState({
            step: index
        });
    };

    onStartCreate = (businessName: string) => {
        this.setState({
            exists: false,
            name: businessName
        });
    };

    render() {
        return (
            <CreateView
                step={this.state.step}
                onClickStepLink={this.onClickStepLink}
                onCreateListing={this.onCreateListing}
                exists={this.state.exists}
                onStartCreate={this.onStartCreate}
                onClickResult={this.props.goToBusiness}
                name={this.state.name}
                info={this.state.info}
                owner={this.state.owner}
                identify={this.state.identify}
                onSetInfo={this.handleSetInfo}
                onSetOwner={this.handleSetOwner}
                onSetIdentify={this.handleSetIdentify}
            />
        );
    }
}
