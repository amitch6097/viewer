import React from 'react';
import { Business } from '../../lib/Business';
import { CreateReviewView } from './CreateReviewView';
import { Review } from '../../lib/Review';
import { API } from '../../services';

export interface ICreateReviewContainerProps {
    id: string;
}

export interface ICreateReviewContainerState {
    business: Business;
}

export class CreateReviewContainer extends React.Component<
    ICreateReviewContainerProps,
    {}
> {
    state = {
        business: undefined,
    };

    componentDidMount() {
        this.fetchCreateReview();
    }

    fetchCreateReview = async () => {
        const business = await API.getBusiness(this.props.id);
        this.setState({
            business,
        });
    };

    handleReviewSubmitted = async ({
        text,
        rating,
    }: {
        text: string;
        rating: number;
    }) => {
        const review = await API.createReview({
            text,
            rating,
            businessId: this.props.id,
        });
    };

    render() {
        return this.state.business ? (
            <CreateReviewView
                onSubmitReview={this.handleReviewSubmitted}
                businessName={this.state.business.name}
                businessId={this.props.id}
            />
        ) : (
            <div>Loading..</div>
        );
    }
}
