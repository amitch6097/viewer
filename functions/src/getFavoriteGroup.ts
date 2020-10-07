import * as functions from 'firebase-functions';
import { IFavoriteGroupDocument, IUserDocument } from '../../typings/documents';
import {
    IGetFavoriteGroupProps,
    IGetFavoriteGroupResponse
} from '../../typings/functions';
import { FavoriteGroupCollection } from './Collections/FavoriteGroupCollection';
import { UserCollection } from './Collections/UserCollection';
import { expectAuthAndData } from './helpers';

export const getFavoriteGroup = functions.https.onCall(
    async (
        data: IGetFavoriteGroupProps,
        context: functions.https.CallableContext
    ): Promise<IGetFavoriteGroupResponse> => {
        expectAuthAndData(functions, data, context);
        try {
            const { id } = data;
            if (!id) {
                throw new functions.https.HttpsError(
                    'invalid-argument',
                    `The function must be called with an id. ${data}`
                );
            }
            const userCollection = new UserCollection();
            const favoriteGroupCollection = new FavoriteGroupCollection();
            const user = await userCollection.getOrCreateUserData(
                context.auth.uid
            );
            const favoriteGroup = await favoriteGroupCollection.getData(
                id
            );
            const userCanViewFavoriteGroup = canUserViewFavoriteGroup(user, favoriteGroup)
            if (!userCanViewFavoriteGroup) {
                throw new functions.https.HttpsError(
                    'permission-denied',
                    `User does not have access to this favorite group with id ${id}`
                );
            }
            return {
                favoriteGroup,
            };
        } catch (err) {
            throw new functions.https.HttpsError(
                'unknown',
                `Failed to get favorite group with error: ${err}, data: ${data}`
            );
        }
    }
);

function canUserViewFavoriteGroup(
    user: IUserDocument,
    favoriteGroup: IFavoriteGroupDocument
) {
    if (
        (favoriteGroup.id &&
            user.favoriteGroups[favoriteGroup.id] !== undefined) ||
        favoriteGroup.access === 'public'
    ) {
        return true;
    }
    return false;
}
