import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { createUser, getOrCreateUserDocument } from './onUserCreate';

import {
    IGetUserFavoritesProps,
    IGetUserFavoritesResponse,
} from '../../typings/functions';
import { IFavoriteGroupDocument, IUserDocument } from '../../typings/types';
import { expectAuthAndData, paginate } from './helpers';

const firestore = admin.firestore();

export const getUserFavoriteGroups = functions.https.onCall(
    async (
        data: IGetUserFavoritesProps,
        context: functions.https.CallableContext
    ): Promise<IGetUserFavoritesResponse> => {
        expectAuthAndData(functions, data, context);
        const { count = 100, page = 0 } = data;
        try {
            const userDoc = await getOrCreateUserDocument(context.auth.uid);
            const user = userDoc.data() as IUserDocument;
            const response = await paginate<IFavoriteGroupDocument>({
                firestore,
                collection: firestore.collection('favorite-group'),
                arr: user?.favorites,
                page,
                count,
            });
            return response;
        } catch (err) {
            throw new functions.https.HttpsError(
                'unknown',
                `Failed to unfavorite business with error: ${err}`
            );
        }
    }
);
