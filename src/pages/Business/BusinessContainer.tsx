import React from 'react';
import { Business } from '../../lib/Business';
import { BusinessView } from './BusinessView';
import { IBusinessListing } from '../../../typings/types';
export interface IBusinessContainerProps {
    id: string;
}

export interface IBusinessContainerState {
    business: string;
}

export class BusinessContainer extends React.Component<
    IBusinessContainerProps,
    {}
> {
    state = {
        business: undefined,
    };

    componentDidMount() {
        this.fetchBusiness();
    }

    fetchBusiness = async () => {
        const businessDoc = await Business.getBusiness({ id: this.props.id });
        this.setState({
            business: businessDoc.data,
        });
    };

    render() {
        return this.state.business ? (
            <BusinessView business={this.state.business} />
        ) : (
            <div></div>
        );
    }
}
