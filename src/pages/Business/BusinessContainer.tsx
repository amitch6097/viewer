import React from 'react';
import { Business } from '../../lib/Business';
import { BusinessView } from './BusinessView';
import { API } from '../../services';
import { BusinessReviews } from '../../lib/BusinessReviews';

export interface IBusinessContainerProps {
    id: string;
}

export interface IBusinessContainerState {
    business: Business;
    reviews: BusinessReviews;
    isFavorited: boolean;
    favoritesPopupOpen: boolean;
}

export class BusinessContainer extends React.Component<
    IBusinessContainerProps,
    IBusinessContainerState
> {
    state: IBusinessContainerState = {
        business: undefined,
        reviews: undefined,
        isFavorited: false,
        favoritesPopupOpen: false
    };

    componentDidMount() {
        this.fetchBusiness();
        this.fetchReviews();
        this.fetchIsFavorited();
        API.subscribeOnAuthChange(this.handleAuthChanged);
    }

    handleAuthChanged = () => {
        this.fetchIsFavorited();
    }

    fetchIsFavorited = async () => {
        // const isFavorited = await API.isBusinessFavorited(this.props.id);
        // this.setState({
        //     isFavorited,
        // });
    }

    fetchReviews = async () => {
        const reviews = await API.getReviewsForBusiness({
            businessId: this.props.id,
        });
        this.setState({
            reviews,
        });
    };

    fetchBusiness = async () => {
        const business = await API.getBusiness(this.props.id);
        this.setState({
            business,
        });
    };

    handleLoadMoreReviews = async () => {
        const nextReviews = await this.state.reviews.fetchMore();
        this.setState({
            reviews: nextReviews,
        });
    };

    handleToggleFavorited = async () => {
        this.setState({
            favoritesPopupOpen: !this.state.favoritesPopupOpen,
        });
    };

    render() {
        return this.state.business ? (
            <BusinessView
                id={this.props.id}
                business={this.state.business}
                reviews={this.state.reviews?.reviews}
                onLoadMoreReviews={this.handleLoadMoreReviews}
                isFavorited={this.state.isFavorited}
                onToggleFavorite={this.handleToggleFavorited}
                favoritesPopupOpen={this.state.favoritesPopupOpen}
            />
        ) : (
            <div></div>
        );
    }
}
