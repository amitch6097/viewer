import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { UserCollection } from './Collections/UserCollection';
import { FavoriteGroupCollection } from './Collections/FavoriteGroupCollection';

import {
    ICreateFavoriteGroupProps,
    ICreateFavoriteGroupResponse,
} from '../../typings/functions';
import { expectAuthAndData } from './helpers';
import { IUserDocument, IFavoriteGroupDocument } from '../../typings/documents';

const firestore = admin.firestore();

export const createFavoriteGroup = functions.https.onCall(
    async (
        data: ICreateFavoriteGroupProps,
        context: functions.https.CallableContext
    ): Promise<ICreateFavoriteGroupResponse> => {
        expectAuthAndData(functions, data, context);
        try {
            const { label } = data;
            if (!label) {
                throw new functions.https.HttpsError(
                    'failed-precondition',
                    `Can not create favorite group with no label - data: ${data}`
                );
            }

            const userCollection = new UserCollection();
            const favoriteGroupCollection = new FavoriteGroupCollection();
            const ref = await favoriteGroupCollection.addFavoriteGroup({
                label,
                uid: context.auth.uid,
            });
            const id = ref.id;
            const userDoc = await userCollection.getOrCreateUserDocument(
                context.auth.uid
            );
            const currentUserFavoriteGroups = (userDoc.data() as IUserDocument)
                .favoriteGroups;
            await userCollection.updateUser({
                uid: context.auth.uid,
                document: {
                    favoriteGroups: {
                        ...currentUserFavoriteGroups,
                        [id]: {
                            createdAt: Number(new Date()),
                        },
                    },
                },
            });
            const favoriteGroupDoc = await ref.get();
            return {
                id,
                favoriteGroup: favoriteGroupDoc.data() as IFavoriteGroupDocument,
            };
        } catch (err) {
            throw new functions.https.HttpsError(
                'unknown',
                `Failed to created favorite group with error: ${err}, data: ${data}`
            );
        }
    }
);
