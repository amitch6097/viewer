import firebase from '../firebase';

import {
    ICreateBusinessProps,
    ICreateBusinessResponse,
    ICreateReviewProps,
    ICreateReviewResponse,
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
