import algoliasearch from 'algoliasearch';
import * as functions from 'firebase-functions';
import {
    IUpdateBusinessUpdateRequestProps,
    IUpdateBusinessUpdateRequestResponse,
} from '../../typings/functions';
import { BusinessCollection } from './Collections/BusinessCollection';
import { BusinessUpdateRequestCollection } from './Collections/BusinessUpdatedRequestCollection';
import { expectAuthAndData } from './helpers';

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_INDEX_NAME = 'common-good';
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

export const updateBusinessUpdatedRequest = functions.https.onCall(
    async (
        data: IUpdateBusinessUpdateRequestProps,
        context: functions.https.CallableContext
    ): Promise<IUpdateBusinessUpdateRequestResponse> => {
        expectAuthAndData(functions, data, context);
        try {
            const { businessUpdateRequestId, action } = data;
            if (!businessUpdateRequestId || !action) {
                throw new functions.https.HttpsError(
                    'failed-precondition',
                    `Can not create update request with missing parameter: ${data}`
                );
            }

            const businessUpdateRequestCollection = new BusinessUpdateRequestCollection();
            const businessCollection = new BusinessCollection();
            const businessUpdateRequest = await businessUpdateRequestCollection.getData(
                businessUpdateRequestId
            );
            const businessData = await businessCollection.getData(
                businessUpdateRequest.businessId
            );

            if (!businessData || !businessUpdateRequest) {
                throw new functions.https.HttpsError(
                    'not-found',
                    `Could not find business with id: ${data}`
                );
            }







            

            if (
                action === 'approve' &&
                businessData &&
                businessUpdateRequest &&
                businessUpdateRequest.approved &&
                businessUpdateRequest.approvedBy === businessData.meta.ownedBy
            ) {
                const updatedBusinessData = await businessCollection.update(
                    businessUpdateRequest.businessId,
                    businessUpdateRequest.data
                );
                await businessCollection.removeUpdateRequest(
                    businessUpdateRequest.businessId,
                    businessUpdateRequest.id
                );
                // Add an 'objectID' field which Algolia requires
                index.saveObject({
                    objectID: updatedBusinessData.id,
                    ...updatedBusinessData,
                });
            } else if (action === 'delete') {
                await businessCollection.removeUpdateRequest(
                    businessUpdateRequest.businessId,
                    businessUpdateRequest.id
                );
                await businessUpdateRequestCollection.delete(
                    businessUpdateRequest.id
                );
            }
            return {
                action,
            };
        } catch (err) {
            throw new functions.https.HttpsError(
                'unknown',
                `Failed to created favorite group with error: ${err}, data: ${data}`
            );
        }
    }
);
