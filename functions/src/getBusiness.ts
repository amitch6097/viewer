import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const firestore = admin.firestore();

import { IBusinessDocument } from '../../typings/types';
import {
    IGetBusinessProps,
    IGetBusinessResponse,
} from '../../typings/functions';

// create business
export const getBusiness = functions.https.onCall(
    async (data: IGetBusinessProps, context): Promise<IGetBusinessResponse> => {
        // if (!context.auth) throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
        if (!data || typeof data !== 'object')
            throw new functions.https.HttpsError(
                'failed-precondition',
                `The function must be called with a data object. ${data}`
            );
        if (!data.id)
            throw new functions.https.HttpsError(
                'failed-precondition',
                `Could not find business without id attribute ${data}`
            );
        try {
            const ref = await firestore.collection('business').doc(data.id);
            const result = await ref.get();
            return {
                result: {
                    ...(result.data() as IBusinessDocument),
                },
            };
        } catch (err) {
            throw new functions.https.HttpsError(
                'failed-precondition',
                `Failed to get business with error ${err}. data: ${data}`
            );
        }
    }
);
