import * as functions from 'firebase-functions';
import {
    ICreateReviewProps,
    ICreateReviewResponse
} from '../../typings/functions';
import { IReviewDocument } from '../../typings/types';
import { BusinessCollection } from './Collections/BusinessCollection';
import { ReviewCollection } from './Collections/ReviewCollection';
import { UserCollection } from './Collections/UserCollection';
import { expectAuthAndData } from './helpers';


// create business
export const createReview = functions.https.onCall(
    async (
        data: ICreateReviewProps,
        context: functions.https.CallableContext
    ): Promise<ICreateReviewResponse> => {
        expectAuthAndData(functions, data, context);
        try {
            const { text, rating, businessId } = data;

            if (!text || !rating || !businessId) {
                throw new functions.https.HttpsError(
                    'failed-precondition',
                    `Could not create review, all arguments to function are required: ${data}`
                );
            }

            const reviewCollection = new ReviewCollection();
            const userCollection = new UserCollection();

            const reviewDocument = await reviewCollection.addReview({
                text,
                rating,
                businessId,
                uid: context.auth.uid,
            });
            if (!reviewDocument || !reviewDocument.id) {
                throw new functions.https.HttpsError(
                    'internal',
                    `Failed to write review, no id returned ${reviewDocument}, with review: ${data}`
                );
            }
            // update user
            await userCollection.addReview(context.auth.uid, reviewDocument.id);
            return {
                id: reviewDocument.id,
                review: reviewDocument,
            };
        } catch (err) {
            throw new functions.https.HttpsError(
                'unknown',
                `Failed to add business with error ${err}`
            );
        }
    }
);

export const onReviewCreated = functions.firestore
    .document('review/{id}')
    .onCreate(
        async (
            snap: functions.firestore.QueryDocumentSnapshot,
            context: functions.EventContext
        ) => {
            const review = snap.data() as IReviewDocument;
            try {
                // Get the review document
                const businessCollection = new BusinessCollection();
                const businessId = review.businessId;
                await businessCollection.addReview({
                    businessId,
                    reviewId: context.params.id,
                    rating: review.rating
                });
            } catch (err) {
                throw new functions.https.HttpsError(
                    'unknown',
                    `Failed to run onReviewCreated with error ${err}, with review ${review}`
                );
            }
        }
    );
