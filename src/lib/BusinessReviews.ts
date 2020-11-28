import { API } from '../services/API';
import { IBusinessReviews } from '../../typings/types';
import { Reviews } from './Reviews';

export interface BusinessReviewsData {
    reviews: Reviews;
    businessId: string;
}

export class BusinessReviews implements IBusinessReviews {

    constructor(readonly data: BusinessReviewsData) {}

    get businessId() {
        return this.data.businessId;
    }

    get reviews() {
        return this.data.reviews;
    }

    async fetchMore(): Promise<BusinessReviews> {
        const moreReviews = await API.getReviewsForBusiness({
            businessId: this.businessId,
            startAfterId: this.reviews.lastId,
        });
        return new BusinessReviews({
            ...this.data,
            reviews: this.reviews.concat(moreReviews.reviews)
        });
    }
} 
