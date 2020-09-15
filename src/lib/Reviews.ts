import { API } from '../services/API';
import { IReview, IReviews } from 'typings/types';

export class Reviews implements IReviews {
    private data: Readonly<IReviews>;

    constructor(data: IReviews) {
        this.data = Object.freeze({
            reviews: [],
            count: 1,
            ...data,
        });
    }

    get businessId() {
        return this.data.businessId;
    }

    get size() {
        return this.data.size;
    }

    get count() {
        return this.data.count;
    }

    get reviews() {
        return this.data.reviews;
    }

    get lastId() {
        return this.data.lastId;
    }

    concat(reviews: Reviews): Reviews {
        return new Reviews({
            ...this.data,
            reviews: this.reviews.concat(reviews.reviews),
            lastId: reviews.lastId,
        });
    }

    async fetchMore(): Promise<Reviews> {
        const moreReviews = await API.getReviewsForBusiness({
            businessId: this.businessId,
            startAfterId: this.lastId,
        });
        return this.concat(moreReviews);
    }
}
