import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { createUser } from './onUserCreate';

import {
    IUnfavoriteBusinessProps,
    IUnfavoriteBusinessResponse,
} from '../../typings/functions';

const firestore = admin.firestore();

export const unfavoriteBusiness = functions.https.onCall(
    async (
        data: IUnfavoriteBusinessProps,
        context: functions.https.CallableContext
    ): Promise<IUnfavoriteBusinessResponse> => {
        const { businessId } = data;

        if (!context.auth)
            throw new functions.https.HttpsError(
                'unauthenticated',
                'The function must be called while authenticated.'
            );

        if (!businessId)
            throw new functions.https.HttpsError(
                'invalid-argument',
                `The function must be called with a businessId. ${data}`
            );

        try {
            // update user
            const userDoc = await firestore
                .collection('user')
                .doc(context.auth.uid)
                .get();

            if (userDoc.exists) {
                await firestore
                    .collection('user')
                    .doc(context.auth.uid)
                    .update({
                        favorites: admin.firestore.FieldValue.arrayRemove(
                            businessId
                        ),
                    });
            } else {
                await createUser(context.auth);
            }

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
                `Failed to favorite business with error: ${err}`
            );
        }
    }
);
