import * as functions from 'firebase-functions';
import {
    IGetFavoriteGroupsProps,
    IGetFavoriteGroupsResponse
} from '../../typings/functions';
import { FavoriteGroupCollection } from './Collections/FavoriteGroupCollection';
import { UserCollection } from './Collections/UserCollection';
import { expectAuthAndData, paginate } from './helpers';

export const getFavoriteGroups = functions.https.onCall(
    async (
        data: IGetFavoriteGroupsProps,
        context: functions.https.CallableContext
    ): Promise<IGetFavoriteGroupsResponse> => {
        expectAuthAndData(functions, data, context);
        try {
            const { count = 100, page = 0 } = data;
            const userCollection = new UserCollection();
            const favoriteGroupCollection  = new FavoriteGroupCollection();
            const user = await userCollection.getOrCreateUserData(context.auth.uid);
            const favoriteGroupIds = paginate({
                data: user.favoriteGroups,
                count,
                page,
            });
            const favoriteGroups =  await favoriteGroupCollection.getAll(favoriteGroupIds);
            return {
                favoriteGroups,
            };
        } catch (err) {
            throw new functions.https.HttpsError(
                'unknown',
                `Failed to get favorite group with error: ${err}, data: ${data}`
            );
        }
    }
);
