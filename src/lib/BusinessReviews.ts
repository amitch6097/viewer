import { API } from '../services/API';
import { IBusinessReviews } from '../../typings/types';
import { Reviews } from './Reviews';

export class BusinessReviews implements IBusinessReviews {
    private data: Readonly<IBusinessReviews>;

    constructor(data: IBusinessReviews) {
        this.data = Object.freeze({
            reviews: new Reviews({}),
            ...data
        });
    }

    get businessId() {
        return this.data.businessId;
    }

    get reviews() {
        return new Reviews(this.data.reviews);
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
