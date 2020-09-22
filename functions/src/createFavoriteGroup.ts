import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { createUser, getOrCreateUserDocument } from './onUserCreate';

import { IFavoriteGroupDocument } from '../../typings/types';

import {
    ICreateFavoriteGroupProps,
    ICreateFavoriteGroupResponse,
} from '../../typings/functions';
import { expectAuthAndData } from './helpers';

const firestore = admin.firestore();

// create business
export const createFavoriteGroup = functions.https.onCall(
    async (
        data: ICreateFavoriteGroupProps,
        context: functions.https.CallableContext
    ): Promise<ICreateFavoriteGroupResponse> => {
        expectAuthAndData(functions, data, context);
        const { label } = data;
        if (!label)
            throw new functions.https.HttpsError(
                'invalid-argument',
                `Could not create review without invalid data. ${data}`
            );

        try {
            const favoriteGroupDocument: IFavoriteGroupDocument = {
                label,
                favorites: [],
                users: [],
                updatedAt: Number(new Date()),
                createdAt: Number(new Date()),
                createdBy: context?.auth?.uid ?? undefined,
            };

            // write new group
            const newFavoriteGroupDocument = await firestore
                .collection('favorite-group')
                .add(favoriteGroupDocument);

            if (!newFavoriteGroupDocument.id) {
                throw new functions.https.HttpsError(
                    'internal',
                    `Failed to write review, no id returned ${newFavoriteGroupDocument.id}, with review: ${newFavoriteGroupDocument}`
                );
            }

            // update user
            const userDoc = await getOrCreateUserDocument(context.auth.uid);
            await userDoc.ref.update({
                favorites: admin.firestore.FieldValue.arrayUnion(
                    newFavoriteGroupDocument.id
                ),
            });

            const favoriteGroup = (
                await newFavoriteGroupDocument.get()
            ).data() as IFavoriteGroupDocument;
            return {
                id: newFavoriteGroupDocument.id,
                favoriteGroup,
            };
        } catch (err) {
            throw new functions.https.HttpsError(
                'unknown',
                `Failed to add business with error ${err}`
            );
        }
    }
);
