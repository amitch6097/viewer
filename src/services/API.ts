import { Firestore } from './Firestore';
import { Auth } from './Auth';
import { Functions } from './Functions';

import { Business } from '../lib/Business';
import { Review } from '../lib/Review';
import { Reviews } from '../lib/Reviews';

import { IBusinessListing, IReview } from '../../typings/types';
import { User } from '../lib/User';

export class API {

    static subscribeOnAuthChange(fn: () => void) {
        Auth.subscribeOnAuthChange(async () => {
            fn();
        });
    }

    static async getMyUser() {
        const id = Auth.getCurrentUserId();
        if (id) {
            const user = await Firestore.getUser(id);
            return new User(user);
        }
        return undefined;
    }
    
    static async getBusiness(id: string): Promise<Business> {
        const business = await Firestore.getBusiness(id);
        return new Business(business);
    }

    static async getReviewsForBusiness(
        {
            businessId,
            startAfterId,
            count = 1,
        }: {
            businessId: string;
            startAfterId?: string;
            count?: number;
        }
    ): Promise<Reviews> {
        if(!startAfterId) {
            const {reviews, size, lastId} = await Firestore.getInitialReviewsForBusiness({
                businessId,
                count
            });
            return new Reviews({
                businessId,
                size,
                count,
                lastId,
                reviews: reviews.map((review) => new Review(review)),
            })
        } else {
            const {reviews, lastId} = await Firestore.getNextReviewsForBusiness({
                businessId,
                startAfterId,
                count
            });
            return new Reviews({
                businessId,
                count,
                lastId,
                reviews: reviews.map((review) => new Review(review)),
            })
        }
    }

    static async createBusiness(
        business: IBusinessListing
    ): Promise<{ id: string; business: Business }> {
        const response = await Functions.createBusiness({
            business,
        });
        return {
            id: response.id,
            business: new Business(response.result),
        };
    }

    static async createReview(
        review: IReview
    ): Promise<{ id: string; review: Review }> {
        const response = await Functions.createReview({
            review
        });
        return {
            id: response.id,
            review: new Review({
                ...response.review,
                user: response.user,
            }),
        };
    }

    static async isBusinessFavorited(businessId: string): Promise<boolean> {
        const user = await API.getMyUser();
        const isFavorited  = user.favorites.includes(businessId);
        return isFavorited;
    }

    static async favoriteBusiness(businessId: string): Promise<boolean> {
        const response = await Functions.favoriteBusiness({
            businessId,
        });
        const isFavorited = response.favorites.includes(businessId);
        return isFavorited;
    }

    static async unfavoriteBusiness(businessId: string): Promise<boolean> {
        const response = await Functions.unfavoriteBusiness({
            businessId,
        });
        const isFavorited = response.favorites.includes(businessId);
        return isFavorited;
    }
}


// @ts-ignore
window._API = API