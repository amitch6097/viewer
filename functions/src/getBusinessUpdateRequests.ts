import * as functions from 'firebase-functions';
import {
    IGetBusinessUpdateRequestsProps,
    IGetBusinessUpdateRequestsResponse
} from '../../typings/functions';
import { BusinessCollection } from './Collections/BusinessCollection';
import { BusinessUpdateRequestCollection } from './Collections/BusinessUpdatedRequestCollection';
import { expectAuthAndData } from './helpers';

export const getBusinessUpdateRequests = functions.https.onCall(
    async (
        data: IGetBusinessUpdateRequestsProps,
        context: functions.https.CallableContext
    ): Promise<IGetBusinessUpdateRequestsResponse> => {
        expectAuthAndData(functions, data, context);
        try {
            const { businessId } = data;
            const businessUpdateRequestCollection = new BusinessUpdateRequestCollection();
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

            const result = await businessUpdateRequestCollection.getAll(businessData.businessUpdateRequests);
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
