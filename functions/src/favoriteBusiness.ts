import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { createUser } from './onUserCreate';
import { IFavoriteDocument } from '../../typings/types';
import {
    IFavoriteBusinessProps,
    IFavoriteBusinessResponse,
} from '../../typings/functions';

const firestore = admin.firestore();

// create business
export const favoriteBusiness = functions.https.onCall(
    async (
        data: IFavoriteBusinessProps,
        context: functions.https.CallableContext
    ): Promise<IFavoriteBusinessResponse> => {

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

        const { businessId } = data;

        if (!businessId)
            throw new functions.https.HttpsError(
                'invalid-argument',
                `The function must be called with a businessId. ${data}`
            );

        try {

            const favoriteDocument: IFavoriteDocument = {
                businessId: businessId,
                createdAt: Number(new Date()),
                createdBy: context?.auth?.uid ?? undefined,
            };

            // update user
            const userDoc = await firestore
                .collection('user')
                .doc(context.auth.uid)
                .get();

            if (!userDoc.exists) {
                await createUser(context.auth);
            }

            await firestore
                .collection('user')
                .doc(context.auth.uid)
                .update({
                    favorites: admin.firestore.FieldValue.arrayUnion(
                        businessId
                    ),
                });

        

            const user = await firestore
                .collection('user')
                .doc(context.auth.uid)
                .get();
            return {
                favorites: user.data()?.favorites,
            };
        } catch (err) {
            throw new functions.https.HttpsError(
                'unknown',
                `Failed to unfavorite business with error: ${err}`
            );
        }
    }
);
