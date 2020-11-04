import * as functions from 'firebase-functions';
import { ICreateFlagProps, ICreateFlagResponse } from '../../typings/functions';
import { BusinessCollection } from './Collections/BusinessCollection';
import { FlagCollection } from './Collections/FlagCollection';
import { expectAuthAndData } from './helpers';

export const createFlag = functions.https.onCall(
    async (
        data: ICreateFlagProps,
        context: functions.https.CallableContext
    ): Promise<ICreateFlagResponse> => {
        expectAuthAndData(functions, data, context);
        try {
            const { type, text, businessId } = data;
            if (
                !businessId ||
                !type ||
                !text ||
                !['data', 'inappropriate', 'closed'].includes(type)
            ) {
                throw new functions.https.HttpsError(
                    'failed-precondition',
                    `Can not create flag with data: ${data}`
                );
            }

            const flagCollection = new FlagCollection();
            const flagDocument = await flagCollection.addFlag({
                type,
                text,
                businessId,
                authId: context.auth.uid,
            });

            const businessCollection = new BusinessCollection();
            await businessCollection.addFlag(
                businessId,
                flagDocument.id
            );

            return {
                result: flagDocument,
            };
        } catch (err) {
            throw new functions.https.HttpsError(
                'unknown',
                `Failed to create flag: ${err}, data: ${data}`
            );
        }
    }
);