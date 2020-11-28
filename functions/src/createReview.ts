import * as functions from 'firebase-functions';
import {
    ICreateReviewProps,
    ICreateReviewResponse
} from '../../typings/functions';
import { IReviewDocument } from '../../typings/documents';
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
            const businessCollection = new BusinessCollection();


            if (!text || !rating || !businessId ) {
                throw new functions.https.HttpsError(
                    'failed-precondition',
                    `Could not create review, all arguments to function are required: ${data}`
                );
            }

            const businessData = await businessCollection.getData(businessId);
            
            if (!businessData ) {
                throw new functions.https.HttpsError(
                    'failed-precondition',
                    `Could not get business with businessId: ${businessId}`
                );
            }

            const reviewCollection = new ReviewCollection();
            const userCollection = new UserCollection();

            const reviewDocument: IReviewDocument = await reviewCollection.addReview({
                text,
                rating,
                businessId,
                businessName: businessData.data.name,
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

            // update business 
            await businessCollection.addReview({
                businessId,
                reviewId: reviewDocument.id,
                rating: reviewDocument.rating
            });

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
