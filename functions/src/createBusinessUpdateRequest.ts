import * as functions from 'firebase-functions';
import { IBusinessUpdateRequestDocument } from '../../typings/documents';
import {
    ICreateBusinessUpdateRequestProps,
    ICreateBusinessUpdateRequestResponse,
} from '../../typings/functions';
import { BusinessCollection } from './Collections/BusinessCollection';
import { BusinessUpdateRequestCollection } from './Collections/BusinessUpdatedRequestCollection';
import { expectAuthAndData } from './helpers';

export const createBusinessUpdateRequest = functions.https.onCall(
    async (
        data: ICreateBusinessUpdateRequestProps,
        context: functions.https.CallableContext
    ): Promise<ICreateBusinessUpdateRequestResponse> => {
        expectAuthAndData(functions, data, context);
        try {
            const { businessId, updateProperties } = data;
            if (!businessId || !updateProperties) {
                throw new functions.https.HttpsError(
                    'failed-precondition',
                    `Can not create update request with missing parameter: ${{
                        ...data
                    }}`
                );
            }

            const businessCollection = new BusinessCollection();
            const businessUpdateRequestCollection = new BusinessUpdateRequestCollection();
            const businessData = await businessCollection.getData(businessId);

            if (!businessData) {
                throw new functions.https.HttpsError(
                    'not-found',
                    `Could not find business with id: ${data}`
                );
            }

            const document = await businessUpdateRequestCollection.createNewRequest(
                {
                    authId: context.auth.uid,
                    businessId,
                    updateProperties,
                }
            );

            return {
                result: document
            };
        } catch (err) {
            throw new functions.https.HttpsError(
                'unknown',
                `Failed to created business update request: ${err}, data: ${data}`
            );
        }
    }
);

export const onBusinessUpdateRequestCreated = functions.firestore
    .document('businessUpdateRequest/{id}')
    .onCreate(
        async (
            snap: functions.firestore.QueryDocumentSnapshot,
            context: functions.EventContext
        ) => {
            const data = snap.data() as IBusinessUpdateRequestDocument;
            try {
                const businessCollection = new BusinessCollection();
                return await businessCollection.addUpdateRequest(
                    data.businessId,
                    context.params.id
                );
            } catch (err) {
                throw new functions.https.HttpsError(
                    'unknown',
                    `Failed to run onBusinessUpdateRequestCreated with error ${err}, with update request ${data}`
                );
            }
        }
    );
