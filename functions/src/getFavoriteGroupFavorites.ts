import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {
    IGetFavoriteGroupFavoritesProps,
    IGetFavoriteGroupFavoritesResponse,
} from '../../typings/functions';
import { IBusinessDocument, IFavoriteGroupDocument } from '../../typings/types';
import { expectAuthAndData, paginate } from './helpers';

const firestore = admin.firestore();

export const getFavoriteGroupFavorites = functions.https.onCall(
    async (
        data: IGetFavoriteGroupFavoritesProps,
        context: functions.https.CallableContext
    ): Promise<IGetFavoriteGroupFavoritesResponse> => {
        expectAuthAndData(functions, data, context);
        const { favoriteGroupId, count = 20, page = 0 } = data;

        if (!favoriteGroupId)
            throw new functions.https.HttpsError(
                'invalid-argument',
                `The function must be called with a favoriteGroupId. ${data}`
            );

        try {
            const favoriteGroup = await firestore
                .collection('favorite-group')
                .doc(favoriteGroupId)
                .get();

            const favoriteGroupData = favoriteGroup.data() as IFavoriteGroupDocument;

            if (!favoriteGroup.exists) {
                throw new functions.https.HttpsError(
                    'invalid-argument',
                    `Favorite Group with id does not exist. ${data}`
                );
            }

            const hasAccess =
                favoriteGroupData.createdBy === context.auth.uid ||
                favoriteGroupData.users.includes(context.auth.uid);
            if (!hasAccess) {
                throw new functions.https.HttpsError(
                    'permission-denied',
                    `User does not have access to favorite group ${data}`
                );
            }

            const response = await paginate<IBusinessDocument>({
                firestore,
                collection: firestore.collection('business'),
                arr: favoriteGroupData.favorites,
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
