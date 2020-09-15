import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { createUser } from './onUserCreate';

import { IReviewDocument, IUserDocument } from '../../typings/types';

import {
    ICreateReviewProps,
    ICreateReviewResponse,
} from '../../typings/functions';

const firestore = admin.firestore();

// create business
export const createReview = functions.https.onCall(
    async (
        data: ICreateReviewProps,
        context: functions.https.CallableContext
    ): Promise<ICreateReviewResponse> => {
        const { review } = data;

        if (!context.auth)
            throw new functions.https.HttpsError(
                'unauthenticated',
                'The function must be called while authenticated.'
            );

        if (!data || typeof data !== 'object')
            throw new functions.https.HttpsError(
                'invalid-argument',
                `The function must be called with a data object. ${data}`
            );

        if (!review.businessId || !review.text || !review.rating)
            throw new functions.https.HttpsError(
                'invalid-argument',
                `Could not create review without invalid data. ${data}`
            );

        const businessDocumentExists = (
            await firestore.collection('business').doc(review.businessId).get()
        ).exists;

        if (!businessDocumentExists) {
            throw new functions.https.HttpsError(
                'failed-precondition',
                `Business does not exist with business id: ${data.review.businessId} ${data}`
            );
        }

        try {
            const reviewDocument: IReviewDocument = {
                rating: review.rating,
                text: review.text,
                businessId: review.businessId,
                createdAt: Number(new Date()),
                createdBy: context?.auth?.uid ?? undefined,
            };

            // write new review
            const newReview = await firestore
                .collection('review')
                .add(reviewDocument);

            if (!newReview.id) {
                throw new functions.https.HttpsError(
                    'internal',
                    `Failed to write review, no id returned ${newReview.id}, with review: ${reviewDocument}`
                );
            }

            // update user
            const doc = await firestore
                .collection('user')
                .doc(context.auth.uid)
                .get();

            if (!doc.exists) {
                await createUser(context.auth);
            }

            await firestore
                .collection('user')
                .doc(context.auth.uid)
                .update({
                    reviews: admin.firestore.FieldValue.arrayUnion(
                        newReview.id
                    ),
                });

            const userDoc = await firestore
                .collection('user')
                .doc(context.auth.uid)
                .get();

            const result = await newReview.get();
            return {
                id: newReview.id,
                review: result.data() as IReviewDocument,
                user: userDoc.data() as IUserDocument,
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
                const businessId = review.businessId;
                const businessRef = await firestore
                    .collection('business')
                    .doc(businessId);

                await businessRef.update({
                    reviews: admin.firestore.FieldValue.arrayUnion(
                        context.params.id
                    ),
                });
            } catch (err) {
                throw new functions.https.HttpsError(
                    'unknown',
                    `Failed to run onReviewCreated with error ${err}, with review ${review}`
                );
            }
        }
    );
