import * as functions from 'firebase-functions';
import {
    IGetMyBusinessesProps,
    IGetMyBusinessesResponse
} from '../../typings/functions';
import { BusinessCollection } from './Collections/BusinessCollection';
import { UserCollection } from './Collections/UserCollection';
import { expectAuthAndData } from './helpers';

export const getMyBusinesses = functions.https.onCall(
    async (
        data: IGetMyBusinessesProps,
        context: functions.https.CallableContext
    ): Promise<IGetMyBusinessesResponse> => {
        expectAuthAndData(functions, data, context);
        try {
            const userCollection = new UserCollection();
            const businessCollection  = new BusinessCollection();
            const user = await userCollection.getOrCreateUserData(context.auth.uid);
            if(!user.businesses) {
                return {
                    result: []
                }
            }
            const businessIds = Object.keys(user.businesses);
            const businesses =  await businessCollection.getAll(businessIds);
            return {
                result: businesses,
            };
        } catch (err) {
            throw new functions.https.HttpsError(
                'unknown',
                `Failed to get businesses for user with error: ${err}, data: ${data}`
            );
        }
    }
);
