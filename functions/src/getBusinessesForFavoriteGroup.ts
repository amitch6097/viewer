import * as functions from 'firebase-functions';
import {
    IGetBusinessesForFavoriteGroupsProps,
    IGetBusinessesForFavoriteGroupsResponse
} from '../../typings/functions';
import { BusinessCollection } from './Collections/BusinessCollection';
import { FavoriteGroupCollection } from './Collections/FavoriteGroupCollection';
import { paginate } from './helpers';

export const getBusinessesForFavoriteGroup = functions.https.onCall(
    async (
        data: IGetBusinessesForFavoriteGroupsProps,
        context: functions.https.CallableContext
    ): Promise<IGetBusinessesForFavoriteGroupsResponse> => {
        try {
            const { count = 100, page = 0, favoriteGroupId } = data;
            const favoriteGroupCollection = new FavoriteGroupCollection();
            const businessCollection = new BusinessCollection();

            const favoriteGroup = await favoriteGroupCollection.getData(favoriteGroupId);
            if (!data) {
                throw new functions.https.HttpsError(
                    'not-found',
                    `Favorite group with id ${favoriteGroupId} does not exist`
                );
            }
            const isOwnedByThisUser =
                favoriteGroup.createdBy === context.auth.uid;
            const isPrivate = favoriteGroup.access === 'private';

            if (isPrivate && !isOwnedByThisUser) {
                throw new functions.https.HttpsError(
                    'permission-denied',
                    `User does not have access to this favorite group with id ${favoriteGroupId}`
                );
            }

            const businessIds = paginate({
                data: favoriteGroup.business,
                page,
                count,
            });
            const businesses = await businessCollection.getAll(businessIds);
            
            return {
                businesses,
            };
        } catch (err) {
            throw new functions.https.HttpsError(
                'unknown',
                `Failed to get businesses for favorite group with error: ${err}, data: ${data}`
            );
        }
    }
);
