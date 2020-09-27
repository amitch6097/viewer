import * as functions from 'firebase-functions';
import {
    ICreateFavoriteGroupProps,
    ICreateFavoriteGroupResponse
} from '../../typings/functions';
import { FavoriteGroupCollection } from './Collections/FavoriteGroupCollection';
import { UserCollection } from './Collections/UserCollection';
import { expectAuthAndData } from './helpers';


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
            const favoriteGroup = await favoriteGroupCollection.addFavoriteGroup({
                label,
                uid: context.auth.uid,
            });
            const dotNotation = `favoriteGroups.${favoriteGroup.id}`;
            await userCollection.updateUser({
                uid: context.auth.uid,
                document: {
                    [dotNotation]: {
                        createdAt: Number(new Date()),
                    },
                },
            });
            return {
                id: favoriteGroup.id,
                favoriteGroup,
            };
        } catch (err) {
            throw new functions.https.HttpsError(
                'unknown',
                `Failed to created favorite group with error: ${err}, data: ${data}`
            );
        }
    }
);
