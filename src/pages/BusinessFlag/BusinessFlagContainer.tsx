import React from 'react';
import { IFlagDocument } from 'typings/documents';
import { Business } from '../../lib/Business';
import { API } from '../../services';
import { BusinessFlagView } from './BusinessFlagView';

export interface IBusinessFlagContainerProps {
    id: string;
    goToBusiness?: () => void;
}

export interface IBusinessFlagContainerState {
    business: Business;
}

export class BusinessFlagContainer extends React.Component<
    IBusinessFlagContainerProps,
    {}
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
            <BusinessFlagView
                onSubmit={this.handleSubmit}
                businessName={this.state.business.name}
                businessId={this.props.id}
            />
        ) : (
            <div>Loading..</div>
        );
    }
}
