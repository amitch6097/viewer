import * as functions from 'firebase-functions';
import {
    ISetBusinessAsFavoriteProps,
    ISetBusinessAsFavoriteResponse
} from '../../typings/functions';
import { FavoriteGroupCollection } from './Collections/FavoriteGroupCollection';
import { expectAuthAndData } from './helpers';

export const setBusinessAsFavorite = functions.https.onCall(
    async (
        data: ISetBusinessAsFavoriteProps,
        context: functions.https.CallableContext
    ): Promise<ISetBusinessAsFavoriteResponse> => {
        expectAuthAndData(functions, data, context);
        try {
            const { businessId, setByFavoriteGroupId } = data;
            const favoirteGroupCollection = new FavoriteGroupCollection();

            const messages = await Promise.all(
                Object.keys(setByFavoriteGroupId).map(
                    (favoriteGroupId: string) => {
                        const add = setByFavoriteGroupId[favoriteGroupId];
                        return favoirteGroupCollection.setBusinessAsFavorite({
                            businessId,
                            favoriteGroupId,
                            add,
                            uid: context.auth.uid,
                        });
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
