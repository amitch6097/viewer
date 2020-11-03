import { Firestore } from './Firestore';
import { Auth } from './Auth';
import { Functions } from './Functions';

import { Business } from '../lib/Business';
import { Review } from '../lib/Review';
import { UserReviews } from '../lib/UserReviews';
import { BusinessReviews } from '../lib/BusinessReviews';
import { FavoriteGroups } from '../lib/FavoriteGroups';

import { IBusinessListing, IReview, IBusinessListingUpdateProperties } from '../../typings/types';
import { User } from '../lib/User';
import { FavoriteGroup } from '../lib/FavoriteGroup';

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

    static async getReviewsForUser({
        userId,
        startAfterId,
        count = 1,
    }: {
        userId: string;
        startAfterId?: string;
        count?: number;
    }): Promise<UserReviews> {
        if (!startAfterId) {
            const {
                reviews,
                size,
                lastId,
            } = await Firestore.getInitialReviewsForUser({
                userId,
                count,
            });
            return new UserReviews({
                userId,
                reviews: {
                    size,
                    count,
                    lastId,
                    reviews: reviews.map((review) => new Review(review)),
                },
            });
        } else {
            const { reviews, lastId } = await Firestore.getNextReviewsForUser({
                userId,
                startAfterId,
                count,
            });
            return new UserReviews({
                userId,
                reviews: {
                    count,
                    lastId,
                    reviews: reviews.map((review) => new Review(review)),
                },
            });
        }
    }

    static async getReviewsForBusiness({
        businessId,
        startAfterId,
        count = 1,
    }: {
        businessId: string;
        startAfterId?: string;
        count?: number;
    }): Promise<BusinessReviews> {
        if (!startAfterId) {
            const {
                reviews,
                size,
                lastId,
            } = await Firestore.getInitialReviewsForBusiness({
                businessId,
                count,
            });
            return new BusinessReviews({
                businessId,
                reviews: {
                    size,
                    count,
                    lastId,
                    reviews: reviews.map((review) => new Review(review)),
                },
            });
        } else {
            const {
                reviews,
                lastId,
            } = await Firestore.getNextReviewsForBusiness({
                businessId,
                startAfterId,
                count,
            });
            return new BusinessReviews({
                businessId,
                reviews: {
                    count,
                    lastId,
                    reviews: reviews.map((review) => new Review(review)),
                },
            });
        }
    }

    static async createBusiness(
        business: IBusinessListing
    ): Promise<{ id: string; business: Business }> {
        const response = await Functions.createBusiness({
            business,
        });
        return {
            id: response.result.id,
            business: new Business(response.result),
        };
    }

    static async createReview(
        review: IReview
    ): Promise<{ id: string }> {
        const response = await Functions.createReview({
            text: review.text,
            rating: review.rating,
            businessId: review.businessId
        });
        return {
            id: response.id,
        };
    }

    static async isBusinessFavorited(businessId: string): Promise<boolean> {
        // const user = await API.getMyUser();
        return false;
    }

    static async favoriteBusiness(businessId: string): Promise<boolean> {
        // empty out old api
        return false;
    }

    static async unfavoriteBusiness(businessId: string): Promise<boolean> {
        // empty out old api
        return false;
    }

    static async getBusinessesForFavoriteGroup(
        favoriteGroupId: string
    ): Promise<Business[]> {
        const response = await Functions.getBusinessesForFavoriteGroup({
            favoriteGroupId,
        });
        return response.businesses.map((data) => new Business(data));
    }

    static async setBusinessAsFavorite(
        businessId: string,
        setByFavoriteGroupId: Record<string, boolean>
    ): Promise<boolean> {
        await Functions.setBusinessAsFavorite({
            businessId,
            setByFavoriteGroupId,
        });
        return true;
    }

    static async getFavoriteGroups(): Promise<FavoriteGroups> {
        const response = await Functions.getFavoriteGroups({});
        return new FavoriteGroups(
            response.favoriteGroups.map((data) =>
                FavoriteGroup.fromDocument(data)
            )
        );
    }

    static async createFavoriteGroup(label: string): Promise<FavoriteGroup> {
        const response = await Functions.createFavoriteGroup({ label });
        return FavoriteGroup.fromDocument(response.favoriteGroup);
    }

    static async getFavoriteGroup(id: string): Promise<FavoriteGroup> {
        const response = await Functions.getFavoriteGroup({id});
        return FavoriteGroup.fromDocument(response.favoriteGroup);
    }

    static async createFlag(args: {
        text: string;
        type: 'data' | 'inappropriate' | 'closed';
        businessId: string;
    }) {
        return await Functions.createFlag(args);
    }

    static async createBusinessUpdateRequest(args: {
        businessId: string;
        updateProperties: Partial<IBusinessListingUpdateProperties>
    }) {
        return await Functions.createBusinessUpdateRequest(args);
    }


    static async updateBusinessUpdatedRequest(args: {
        businessUpdateRequestId: string;
        action: 'delete' | 'approve';
    }) {
        return await Functions.updateBusinessUpdatedRequest(args);
    }

}

if (typeof window !== 'undefined') {
    // @ts-ignore
    window._API = API;
}
