import React from 'react';
import { Business } from '../../lib/Business';
import { BusinessView } from './BusinessView';
import { API } from '../../services';

export interface IBusinessContainerProps {
    id: string;
}

export interface IBusinessContainerState {
    business: Business;
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
        const business = await API.getBusiness(this.props.id);
        this.setState({
            business,
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
