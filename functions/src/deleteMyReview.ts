import * as functions from 'firebase-functions';
import {
    IDeleteMyReviewProps,
    IDeleteMyReviewResponse,
} from '../../typings/functions';
import { BusinessCollection } from './Collections/BusinessCollection';
import { ReviewCollection } from './Collections/ReviewCollection';
import { UserCollection } from './Collections/UserCollection';
import { expectAuthAndData } from './helpers';

export const deleteMyReview = functions.https.onCall(
    async (
        data: IDeleteMyReviewProps,
        context: functions.https.CallableContext
    ): Promise<IDeleteMyReviewResponse> => {
        expectAuthAndData(functions, data, context);
        try {
            if (!data.reviewId) {
                throw new functions.https.HttpsError(
                    'failed-precondition',
                    `Data does not include review Id, data: ${data}`
                );
            }

            const userCollection = new UserCollection();
            const businessCollection = new BusinessCollection();
            const reviewCollection = new ReviewCollection();
            const reviewData = await reviewCollection.getData(data.reviewId);

            if (!reviewData) {
                throw new functions.https.HttpsError(
                    'failed-precondition',
                    `Review with reviewId does not exist, data: ${data}`
                );
            }

            const user = await userCollection.getOrCreateUserData(
                context.auth.uid
            );

            if (!user.reviews || !user.reviews.includes(data.reviewId)) {
                throw new functions.https.HttpsError(
                    'unavailable',
                    `User does not have control over this review, data: ${data}`
                );
            }

            await reviewCollection.delete(data.reviewId);
            await userCollection.deleteReview(context.auth.uid, data.reviewId);
            await businessCollection.deleteReview({
                businessId: reviewData.businessId,
                reviewId: data.reviewId,
                rating: reviewData.rating
            });
            return {
                result: true
            };
        } catch (err) {
            throw new functions.https.HttpsError(
                'unknown',
                `Failed to delete review with error: ${err}, data: ${{...data}}`
            );
        }
    }
);
