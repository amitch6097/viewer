import React from 'react';
import { BusinessFlag } from 'src/lib/BusinessFlag';
import { IFlagDocument } from 'typings/documents';
import { Business } from '../../lib/Business';
import { API } from '../../services';
import { BusinessFlagsView } from './BusinessFlagsView';

export interface IBusinessFlagsContainerProps {
    id: string;
}

export interface IBusinessFlagsContainerState {
    business: Business;
    flags: Array<BusinessFlag>;
}

export class BusinessFlagsContainer extends React.Component<
    IBusinessFlagsContainerProps,
    IBusinessFlagsContainerState
> {
    state = {
        business: undefined,
        flags: undefined,
    };

    componentDidMount() {
        this.fetch();
    }

    fetch = async () => {
        const business = await API.getBusiness(this.props.id);
        const flags = await API.getFlagsForBusiness(this.props.id);
        this.setState({
            business,
            flags,
        });
    };

    handleDeleteFlag = (flagId: string) => {
        console.log(flagId);
    };

    render() {
        return this.state.business ? (
            <BusinessFlagsView
                businessName={this.state.business.name}
                businessId={this.props.id}
                flags={this.state.flags}
                onDeleteFlag={this.handleDeleteFlag}
            />
        ) : (
            <div>Loading..</div>
        );
    }
}
