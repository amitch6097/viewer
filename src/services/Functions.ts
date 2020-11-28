import {
    ICreateBusinessProps,
    ICreateBusinessResponse,
    ICreateBusinessUpdateRequestResponse,
    ICreateFavoriteGroupProps,
    ICreateFavoriteGroupResponse,
    ICreateReviewProps,
    ICreateReviewResponse,
    IGetBusinessesForFavoriteGroupsProps,
    IGetBusinessesForFavoriteGroupsResponse,
    IGetFavoriteGroupProps,
    IGetFavoriteGroupResponse,
    IGetFavoriteGroupsProps,
    IGetFavoriteGroupsResponse,
    ISetBusinessAsFavoriteProps,
    ISetBusinessAsFavoriteResponse,
    ICreateBusinessUpdateRequestProps,
    IUpdateBusinessUpdateRequestProps,
    IUpdateBusinessUpdateRequestResponse,
    ICreateFlagProps,
    ICreateFlagResponse,
    IGetBusinessUpdateRequestsProps,
    IGetBusinessUpdateRequestsResponse,
    IGetBusinessFlagsProps,
    IGetBusinessFlagsResponse,
    IGetMyBusinessesProps,
    IGetMyBusinessesResponse,
    IGetMyReviewsResponse,
    IGetMyReviewsProps,

} from '../../typings/functions';
import firebase from '../firebase';

interface IProps {
    createBusiness: ICreateBusinessProps;
    createReview: ICreateReviewProps;
    createFavoriteGroup: ICreateFavoriteGroupProps;
    getBusinessesForFavoriteGroup: IGetBusinessesForFavoriteGroupsProps;
    getFavoriteGroups: IGetFavoriteGroupsProps;
    setBusinessAsFavorite: ISetBusinessAsFavoriteProps;
    getFavoriteGroup: IGetFavoriteGroupProps;
    createBusinessUpdateRequest: ICreateBusinessUpdateRequestProps;
    updateBusinessUpdatedRequest: IUpdateBusinessUpdateRequestProps;
    createFlag: ICreateFlagProps;
    getBusinessFlags: IGetBusinessFlagsProps;
    getBusinessUpdateRequests: IGetBusinessUpdateRequestsProps;
    getMyBusinesses: IGetMyBusinessesProps;
    getMyReviews: IGetMyReviewsProps;
}

interface IResponse {
    createBusiness: ICreateBusinessResponse;
    createReview: ICreateReviewResponse;
    createFavoriteGroup: ICreateFavoriteGroupResponse;
    getBusinessesForFavoriteGroup: IGetBusinessesForFavoriteGroupsResponse;
    getFavoriteGroups: IGetFavoriteGroupsResponse;
    setBusinessAsFavorite: ISetBusinessAsFavoriteResponse;
    getFavoriteGroup: IGetFavoriteGroupResponse;
    createBusinessUpdateRequest: ICreateBusinessUpdateRequestResponse;
    updateBusinessUpdatedRequest: IUpdateBusinessUpdateRequestResponse;
    createFlag: ICreateFlagResponse;
    getBusinessFlags: IGetBusinessFlagsResponse;
    getBusinessUpdateRequests: IGetBusinessUpdateRequestsResponse;
    getMyBusinesses: IGetMyBusinessesResponse;
    getMyReviews: IGetMyReviewsResponse;
}

export class Functions {

    static async getMyReviews(
        props: IGetMyReviewsProps
    ): Promise<IGetMyReviewsResponse> {
        return await call('getMyReviews', props);
    }

    static async getMyBusinesses(
        props: IGetMyBusinessesProps
    ): Promise<IGetMyBusinessesResponse> {
        return await call('getMyBusinesses', props);
    }

    static async createBusiness(
        props: ICreateBusinessProps
    ): Promise<ICreateBusinessResponse> {
        return await call('createBusiness', props);
    }

    static async createReview(
        props: ICreateReviewProps
    ): Promise<ICreateReviewResponse> {
        return await call('createReview', props);
    }

    static async createFavoriteGroup(
        props: ICreateFavoriteGroupProps
    ): Promise<ICreateFavoriteGroupResponse> {
        return await call('createFavoriteGroup', props);
    }

    static async getBusinessesForFavoriteGroup(
        props: IGetBusinessesForFavoriteGroupsProps
    ): Promise<IGetBusinessesForFavoriteGroupsResponse> {
        return await call('getBusinessesForFavoriteGroup', props);
    }

    static async getFavoriteGroup(
        props: IGetFavoriteGroupProps
    ): Promise<IGetFavoriteGroupResponse> {
        try {
            const response = await call('getFavoriteGroup', props);
            return response;
        } catch (err) {
            return {
                favoriteGroup: undefined,
            };
        }
    }

    static async getFavoriteGroups(
        props: IGetFavoriteGroupsProps
    ): Promise<IGetFavoriteGroupsResponse> {
        try {
            const response = await call('getFavoriteGroups', props);
            if (!response || !response.favoriteGroups) {
                return {
                    favoriteGroups: [],
                };
            }
            return response;
        } catch (err) {
            return {
                favoriteGroups: [],
            };
        }
    }

    static async setBusinessAsFavorite(
        props: ISetBusinessAsFavoriteProps
    ): Promise<ISetBusinessAsFavoriteResponse> {
        return await call('setBusinessAsFavorite', props);
    }

    static async createBusinessUpdateRequest(
        props: ICreateBusinessUpdateRequestProps
    ): Promise<ICreateBusinessUpdateRequestResponse> {
        return await call('createBusinessUpdateRequest', props);
    }

    static async updateBusinessUpdatedRequest(
        props: IUpdateBusinessUpdateRequestProps
    ): Promise<IUpdateBusinessUpdateRequestResponse> {
        return await call('updateBusinessUpdatedRequest', props);
    }

    static async createFlag(
        props: ICreateFlagProps
    ): Promise<ICreateFlagResponse> {
        return await call('createFlag', props);
    }

    static async getBusinessFlags(
        props: IGetBusinessFlagsProps
    ): Promise<IGetBusinessFlagsResponse> {
        return await call('getBusinessFlags', props);
    }

    static async getBusinessUpdateRequests(
        props: IGetBusinessUpdateRequestsProps
    ): Promise<IGetBusinessUpdateRequestsResponse> {
        return await call('getBusinessUpdateRequests', props);
    }
}

async function call<T extends keyof IProps>(
    key: T,
    props: IProps[T]
): Promise<IResponse[T]> {
    const func = firebase.functions().httpsCallable(key);
    const response = await func(props);
    return response.data as IResponse[T];
}
