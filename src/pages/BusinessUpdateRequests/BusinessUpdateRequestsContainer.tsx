import React from 'react';
import { BusinessUpdateRequest } from 'src/lib/BusinessUpdateRequest';
import { Business } from '../../lib/Business';
import { API } from '../../services';
import { BusinessUpdateRequestsView } from './BusinessUpdateRequestsView';

export interface IBusinessUpdateRequestsContainerProps {
    id: string;
}

export interface IBusinessUpdateRequestsContainerState {
    business: Business;
    updateRequests: Array<BusinessUpdateRequest>;
}

export class BusinessUpdateRequestsContainer extends React.Component<
    IBusinessUpdateRequestsContainerProps,
    IBusinessUpdateRequestsContainerState
> {
    state: IBusinessUpdateRequestsContainerState = {
        business: undefined,
        updateRequests: undefined,
    };

    componentDidMount() {
        this.fetch();
    }

    fetch = async () => {
        const business = await API.getBusiness(this.props.id);
        const updateRequests = await API.getUpdateRequestsForBusiness(
            this.props.id
        );
        this.setState({
            business,
            updateRequests,
        });
    };

    handleDelete = async (updateRequestId: string) => {
        const updateRequests = this.state.updateRequests;
        const index = updateRequests.findIndex(
            (updateRequests) => updateRequests.id === updateRequestId
        );
        if(index >= 0) {
            const updateRequest = updateRequests[index];
            const nextUpdateRequests = [
                ...updateRequests.slice(0, index),
                ...updateRequests.slice(index + 1, updateRequests.length),
            ];
            this.setState({
                updateRequests: nextUpdateRequests
            });
            await updateRequest.delete()
        }
    };

    handleAccept = async (updateRequestId: string) => {
        const updateRequests = this.state.updateRequests;
        const index = updateRequests.findIndex(
            (updateRequests) => updateRequests.id === updateRequestId
        );
        if(index >= 0) {
            const updateRequest = updateRequests[index];
            const nextUpdateRequests = [
                ...updateRequests.slice(0, index),
                ...updateRequests.slice(index + 1, updateRequests.length),
            ];
            this.setState({
                updateRequests: nextUpdateRequests
            });
            await updateRequest.approve()
        }
    };

    render() {
        return this.state.business ? (
            <BusinessUpdateRequestsView
                businessName={this.state.business.name}
                businessId={this.props.id}
                updateRequests={this.state.updateRequests}
                onDelete={this.handleDelete}
                onAccept={this.handleAccept}
            />
        ) : (
            <div>Loading..</div>
        );
    }
}
