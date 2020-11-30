import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import {
    IGetUserWithPhoneNumberExistsProps,
    IGetUserWithPhoneNumberExistsResponse
} from '../../typings/functions';

export const getUserWithPhoneNumberExists = functions.https.onCall(
    async (
        data: IGetUserWithPhoneNumberExistsProps,
    ): Promise<IGetUserWithPhoneNumberExistsResponse> => {
        try {
            if (!data.phoneNumber) {
                throw new functions.https.HttpsError(
                    'failed-precondition',
                    `Failed to check if user with phone number exists: no phone number provided, data: ${data}`
                );
            }
            const user = await admin
                .auth()
                .getUserByPhoneNumber(data.phoneNumber);
            return {
                result: Boolean(user),
            };
        } catch (err) {
            throw new functions.https.HttpsError(
                'unknown',
                `Failed to check if user with phone number exists: ${err}, data: ${data}`
            );
        }
    }
);
