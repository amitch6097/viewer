import firebase from '../firebase';

import {
    ICreateBusinessProps,
    ICreateBusinessResponse,
    IFavoriteBusinessProps,
    IFavoriteBusinessResponse,
    ICreateReviewProps,
    ICreateReviewResponse,
    IUnfavoriteBusinessResponse,
    IUnfavoriteBusinessProps,
} from '../../typings/functions';

export class Functions {
    static async createBusiness(
        props: ICreateBusinessProps
    ): Promise<ICreateBusinessResponse> {
        const createBusiness = firebase
            .functions()
            .httpsCallable('createBusiness');
        const response = await createBusiness(props);
        return response.data;
    }

    static async favoriteBusiness(
        props: IFavoriteBusinessProps
    ): Promise<IFavoriteBusinessResponse> {
        const favoriteBusiness = firebase
            .functions()
            .httpsCallable('favoriteBusiness');
        const response = await favoriteBusiness(props);
        return response.data as IFavoriteBusinessResponse;
    }

    static async unfavoriteBusiness(
        props: IUnfavoriteBusinessProps
    ): Promise<IUnfavoriteBusinessResponse> {
        const unfavoriteBusiness = firebase
            .functions()
            .httpsCallable('unfavoriteBusiness');
        const response = await unfavoriteBusiness(props);
        return response.data as IUnfavoriteBusinessResponse;
    }

    static async createReview(
        props: ICreateReviewProps
    ): Promise<ICreateReviewResponse> {
        const createReview = firebase
            .functions()
            .httpsCallable('createReview');
        const response = await createReview(props);
        return response.data as ICreateReviewResponse;
    }

}
