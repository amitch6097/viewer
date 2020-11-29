import * as functions from 'firebase-functions';
import {
    IClaimBusinessProps,
    IClaimBusinessResponse,
} from '../../typings/functions';
import { BusinessCollection } from './Collections/BusinessCollection';
import { UserCollection } from './Collections/UserCollection';
import { canUserOwnBusiness, expectAuthAndData } from './helpers';

export const claimBusiness = functions.https.onCall(
    async (
        data: IClaimBusinessProps,
        context: functions.https.CallableContext
    ): Promise<IClaimBusinessResponse> => {
        expectAuthAndData(functions, data, context);
        try {
            const { businessId } = data;
            if (!businessId) {
                throw new functions.https.HttpsError(
                    'failed-precondition',
                    `Could not claim business without a businessId: ${data}`
                );
            }

            const userCollection = new UserCollection();
            const businessCollection = new BusinessCollection();
            const user = await userCollection.getOrCreateUserData(
                context.auth.uid
            );
            const business = await businessCollection.getData(businessId);
            const canBeOwner = canUserOwnBusiness(user, business.data);
            if (canBeOwner) {
                const userResult = await userCollection.addBusiness(
                    context.auth.uid,
                    businessId
                );
                const businessResult: FirebaseFirestore.WriteResult = await businessCollection.updateOwner(
                    businessId,
                    context.auth.uid
                );
                return {
                    result: Boolean(userResult && businessResult),
                };
            }
            return {
                result: false,
            };
        } catch (err) {
            throw new functions.https.HttpsError(
                'unknown',
                `Failed to get reviews for user with error: ${err}, data: ${data}`
            );
        }
    }
);
