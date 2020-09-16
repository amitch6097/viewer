import { IUserReviews } from '../../typings/types';
import { API } from '../services/API';
import { Reviews } from './Reviews';

export class UserReviews implements IUserReviews {
    private data: Readonly<IUserReviews>;

    constructor(data: IUserReviews) {
        this.data = Object.freeze({
            reviews: new Reviews({}),
            ...data
        });
    }

    get userId() {
        return this.data.userId;
    }

    get reviews() {
        return this.data.reviews instanceof Reviews ? this.data.reviews : new Reviews(this.data.reviews);
    }

    async fetchMore(): Promise<UserReviews> {
        if (this.reviews.reviews.length < this.reviews.size) {
            const moreReviews = await API.getReviewsForUser({
                userId: this.userId,
                startAfterId: this.reviews.lastId,
            });
            return new UserReviews({
                ...this.data,
                reviews: this.reviews.concat(moreReviews.reviews)
            });
        } else {
            return this;
        }
    }
} 
