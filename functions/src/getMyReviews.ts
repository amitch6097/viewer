import * as functions from 'firebase-functions';
import {
    IGetMyReviewsProps,
    IGetMyReviewsResponse
} from '../../typings/functions';
import { ReviewCollection } from './Collections/ReviewCollection';
import { UserCollection } from './Collections/UserCollection';

export const getMyReviews = functions.https.onCall(
    async (
        data: IGetMyReviewsProps,
        context: functions.https.CallableContext
    ): Promise<IGetMyReviewsResponse> => {
        if (!context.auth)
        throw new functions.https.HttpsError(
            'unauthenticated',
            'The function must be called while authenticated.'
        );
        try {
            const userCollection = new UserCollection();
            const reviewCollection  = new ReviewCollection();
            const user = await userCollection.getOrCreateUserData(context.auth.uid);
            if(!user.reviews) {
                return {
                    result: []
                }
            }
            const reviewIds = user.reviews;
            const reviews =  await reviewCollection.getAll(reviewIds);
            return {
                result: reviews,
            };
        } catch (err) {
            throw new functions.https.HttpsError(
                'unknown',
                `Failed to get reviews for user with error: ${err}, data: ${data}`
            );
        }
    }
);
