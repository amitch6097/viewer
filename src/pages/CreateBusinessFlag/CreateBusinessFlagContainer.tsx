import React from 'react';
import { IFlagDocument } from 'typings/documents';
import { Business } from '../../lib/Business';
import { API } from '../../services';
import { CreateBusinessFlagView } from './CreateBusinessFlagView';

export interface ICreateBusinessFlagContainerProps {
    id: string;
    goToBusiness?: () => void;
}

export interface ICreateBusinessFlagContainerState {
    business: Business;
}

export class CreateBusinessFlagContainer extends React.Component<
    ICreateBusinessFlagContainerProps,
    ICreateBusinessFlagContainerState
> {
    state = {
        business: undefined,
    };

    componentDidMount() {
        this.fetch();
    }

    fetch = async () => {
        const business = await API.getBusiness(this.props.id);
        this.setState({
            business,
        });
    };

    handleSubmit = async ({
        text,
        type,
    }: {
        text: string;
        type: IFlagDocument['type'];
    }) => {
        const flag = await API.createFlag({
            text,
            type,
            businessId: this.props.id,
        });
        this.props.goToBusiness();
    };

    render() {
        return this.state.business ? (
            <CreateBusinessFlagView
                onSubmit={this.handleSubmit}
                businessName={this.state.business.name}
                businessId={this.props.id}
            />
        ) : (
            <div>Loading..</div>
        );
    }
}
