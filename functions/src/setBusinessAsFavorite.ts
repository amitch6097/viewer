import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {
    ISetBusinessAsFavoriteProps,
    ISetBusinessAsFavoriteResponse,
} from '../../typings/functions';
import { expectAuthAndData } from './helpers';
import { IFavoriteGroupDocument } from '../../typings/documents';

const firestore = admin.firestore();

export const setBusinessAsFavorite = functions.https.onCall(
    async (
        data: ISetBusinessAsFavoriteProps,
        context: functions.https.CallableContext
    ): Promise<ISetBusinessAsFavoriteResponse> => {
        expectAuthAndData(functions, data, context);
        try {
            const { businessId, setByFavoriteGroupId } = data;
            const messages = [];

            async function set(id: string, add: boolean) {
                const favoriteGroupDoc = firestore
                    .collection('favoriteGroup')
                    .doc(id);
                const favoriteGroupSnapshot = await favoriteGroupDoc.get();
                if (!favoriteGroupSnapshot.exists) {
                    messages.push(
                        `Could not add favorite to group with id ${id}, because it does not exist`
                    );
                    return;
                }
                const favoriteGroup = favoriteGroupSnapshot.data() as IFavoriteGroupDocument;
                const isOwnedByThisUser =
                    favoriteGroup.createdBy === context.auth.uid;
                if (!isOwnedByThisUser) {
                    messages.push(
                        `Could not add favorite to group with id ${id}, because the user does not have write access`
                    );
                    return;
                }
                const business = favoriteGroup.business || {};
                if (add) {
                    await favoriteGroupDoc.update({
                        business: {
                            ...business,
                            [businessId]: {
                                createdAt: Number(new Date()),
                            },
                        },
                    });
                } else {
                    // remove
                    delete business[businessId];
                    await favoriteGroupDoc.update({
                        business: {
                            ...business,
                        },
                    });
                }
            }

            await Promise.all(
                Object.keys(setByFavoriteGroupId).map(
                    (favoriteGroupId: string) => {
                        const add = setByFavoriteGroupId[favoriteGroupId];
                        return set(favoriteGroupId, add);
                    }
                )
            );

            return {
                messages,
            };
        } catch (err) {
            throw new functions.https.HttpsError(
                'unknown',
                `Failed to set business as a favorite with error: ${err}, data: ${data}`
            );
        }
    }
);
