import { localURLtoBlob } from '../helpers';
import { Reviews } from '../lib/Reviews';
import {
    IBusinessDocument,
    IBusinessUpdateRequestDocument,
    IFlagDocument,
    IReviewDocument,
} from '../../typings/documents';
import {
    IBusinessListing,
    IBusinessListingUpdateProperties,
    IImage,
    IOwner,
    IReview,
} from '../../typings/types';
import { Business } from '../lib/Business';
import { BusinessFlag } from '../lib/BusinessFlag';
import { BusinessReviews } from '../lib/BusinessReviews';
import { BusinessUpdateRequest } from '../lib/BusinessUpdateRequest';
import { FavoriteGroup } from '../lib/FavoriteGroup';
import { FavoriteGroups } from '../lib/FavoriteGroups';
import { Review } from '../lib/Review';
import { User } from '../lib/User';
import { UserReviews } from '../lib/UserReviews';
import { Auth } from './Auth';
import { FBStorage } from './FBStorage';
import { Firestore } from './Firestore';
import { Functions } from './Functions';

export class API {
    static async getUserWithPhoneNumberExists(phoneNumber: string) {
        return await Functions.getUserWithPhoneNumberExists({ phoneNumber });
    }

    static subscribeOnAuthChange(fn: () => void) {
        Auth.subscribeOnAuthChange(async () => {
            fn();
        });
    }

    static getCurrentUser() {
        return Auth.currentUser();
    }

    static async linkPhoneNumber(number: string) {
        return await Auth.linkPhoneNumber(number);
    }

    static async getMyUser() {
        const id = Auth.getCurrentUserId();
        if (id) {
            const user = await Firestore.getUser(id);
            return new User(user);
        }
        return undefined;
    }

    static async canClaimBusiness(businessId: string): Promise<boolean> {
        const user = await API.getMyUser();
        const business = await API.getBusiness(businessId);
        const hasBusinessEmail = Boolean(
            user.email && user.email.indexOf(business.website) !== -1
        );
        return hasBusinessEmail;
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
        count = 10,
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
                reviews: new Reviews({
                    size,
                    count,
                    lastId,
                    reviews: reviews.map((review) => new Review(review)),
                }),
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
                reviews: new Reviews({
                    count,
                    lastId,
                    reviews: reviews.map((review) => new Review(review)),
                }),
            });
        }
    }

    static async uploadImage({
        image,
        businessGUID,
    }: {
        image: IImage;
        businessGUID: string;
    }): Promise<IImage> {
        const blob = await localURLtoBlob(image.url);
        const url = await FBStorage.uploadImage({
            blob,
            businessGUID,
            id: image.id,
        });
        return {
            id: image.id,
            url,
        };
    }

    static async createBusiness(
        business: IBusinessListing
    ): Promise<{ id: string; business: Business }> {
        const businessCopy = { ...business };

        // upload all owned images
        businessCopy.owners = await Promise.all(
            business.owners.map((owner, index) => {
                return new Promise(async (resolve) => {
                    if (!owner.image) {
                        resolve(owner);
                    } else {
                        const image = await API.uploadImage({
                            image: owner.image,
                            businessGUID: business.guid,
                        });
                        resolve({
                            ...owner,
                            image: image,
                        });
                    }
                }) as Promise<IOwner>;
            })
        );

        //upload business image
        if (business.image) {
            businessCopy.image = await API.uploadImage({
                businessGUID: business.guid,
                image: business.image,
            });
        }

        const response = await Functions.createBusiness({
            business: businessCopy,
        });
        return {
            id: response.result.id,
            business: new Business(response.result),
        };
    }

    static async createReview(review: {
        text: string;
        rating: number;
        businessId: string;
    }): Promise<{ id: string }> {
        const response = await Functions.createReview({
            text: review.text,
            rating: review.rating,
            businessId: review.businessId,
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
    ): Promise<Record<string, Business>> {
        const response = await Functions.getBusinessesForFavoriteGroup({
            favoriteGroupId,
        });
        return response.businesses.reduce((businesses, data) => {
            businesses[data.id] = new Business(data);
            return businesses;
        }, {});
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
        const response = await Functions.getFavoriteGroup({ id });
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
        updateProperties: Partial<IBusinessListingUpdateProperties>;
    }) {
        return await Functions.createBusinessUpdateRequest(args);
    }

    static async updateBusinessUpdatedRequest(args: {
        businessUpdateRequestId: string;
        action: 'delete' | 'approve';
    }) {
        return await Functions.updateBusinessUpdatedRequest(args);
    }

    static async getBusinessFlags(args: {
        businessId: string;
    }): Promise<BusinessFlag[]> {
        const response = await Functions.getBusinessFlags(args);
        const flags: IFlagDocument[] = response.result;
        return flags.map((document) => new BusinessFlag({ document }));
    }

    static async getBusinessUpdateRequests(args: {
        businessId: string;
    }): Promise<BusinessUpdateRequest[]> {
        const response = await Functions.getBusinessUpdateRequests(args);
        const updateRequests: IBusinessUpdateRequestDocument[] =
            response.result;
        return updateRequests.map(
            (document) => new BusinessUpdateRequest({ document })
        );
    }

    static async getMyBusinesses(args: {}): Promise<Record<string, Business>> {
        const response = await Functions.getMyBusinesses(args);
        const businesses: IBusinessDocument[] = response.result;
        return businesses.reduce((businesses, data) => {
            businesses[data.id] = new Business(data);
            return businesses;
        }, {});
    }

    static async getMyReviews(args: {} = {}) {
        const response = await Functions.getMyReviews(args);
        const reviews: IReviewDocument[] = response.result;
        return reviews.map((document) => new Review(document));
    }

    static async deleteMyReview(reviewId: string): Promise<boolean> {
        const response = await Functions.deleteMyReview({ reviewId });
        return response.result;
    }

    static async claimBusiness(businessId: string): Promise<boolean> {
        const response = await Functions.claimBusiness({ businessId });
        return response.result;
    }

    static async linkPhone() {
        await Auth.linkPhone();
    }
}
