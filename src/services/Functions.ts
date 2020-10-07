import {
    ICreateBusinessProps,
    ICreateBusinessResponse,
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
}

interface IResponse {
    createBusiness: ICreateBusinessResponse;
    createReview: ICreateReviewResponse;
    createFavoriteGroup: ICreateFavoriteGroupResponse;
    getBusinessesForFavoriteGroup: IGetBusinessesForFavoriteGroupsResponse;
    getFavoriteGroups: IGetFavoriteGroupsResponse;
    setBusinessAsFavorite: ISetBusinessAsFavoriteResponse;
    getFavoriteGroup: IGetFavoriteGroupResponse;
}

export class Functions {
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
}

async function call<T extends keyof IProps>(
    key: T,
    props: IProps[T]
): Promise<IResponse[T]> {
    const func = firebase.functions().httpsCallable(key);
    const response = await func(props);
    return response.data as IResponse[T];
}
