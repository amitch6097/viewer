import * as functions from 'firebase-functions';
import {
    IGetBusinessFlagsProps,
    IGetBusinessFlagsResponse
} from '../../typings/functions';
import { BusinessCollection } from './Collections/BusinessCollection';
import { FlagCollection } from './Collections/FlagCollection';
import { expectAuthAndData } from './helpers';

export const getBusinessFlags = functions.https.onCall(
    async (
        data: IGetBusinessFlagsProps,
        context: functions.https.CallableContext
    ): Promise<IGetBusinessFlagsResponse> => {
        expectAuthAndData(functions, data, context);
        try {
            const { businessId } = data;
            const flagCollection = new FlagCollection();
            const businessCollection = new BusinessCollection();

            const businessData = await businessCollection.getData(businessId);
            if (!businessData) {
                throw new functions.https.HttpsError(
                    'not-found',
                    `Business with id ${businessData} does not exist`
                );
            }
            const isOwnedByThisUser =
                businessData.meta.ownedBy === context.auth.uid;

            if (!isOwnedByThisUser) {
                throw new functions.https.HttpsError(
                    'permission-denied',
                    `User does not have access to this favorite group with id ${businessData.id}`
                );
            }

            const result = await flagCollection.getAll(businessData.businessUpdateRequests);
            return {
                result,
            };

        } catch (err) {
            throw new functions.https.HttpsError(
                'unknown',
                `Failed to get businesses for favorite group with error: ${err}, data: ${data}`
            );
        }
    }
);
