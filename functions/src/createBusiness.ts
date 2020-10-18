import algoliasearch from 'algoliasearch';
import * as functions from 'firebase-functions';
import {
    ICreateBusinessProps,
    ICreateBusinessResponse
} from '../../typings/functions';
import { BusinessCollection } from './Collections/BusinessCollection';

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_INDEX_NAME = 'common-good';
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

// create business
export const createBusiness = functions.https.onCall(
    async (
        data: ICreateBusinessProps,
        context
    ): Promise<ICreateBusinessResponse> => {
        if (!context.auth)
            throw new functions.https.HttpsError(
                'unauthenticated',
                'The function must be called while authenticated.'
            );
        if (!data || typeof data !== 'object')
            throw new functions.https.HttpsError(
                'invalid-argument',
                `The function must be called with a data object. ${data}`
            );
        if (!data.business)
            throw new functions.https.HttpsError(
                'invalid-argument',
                `Could not create business without business object. ${data}`
            );
        if (!data.business.name)
            throw new functions.https.HttpsError(
                'invalid-argument',
                `Could not create business without business name. ${data}`
            );
        try {
            const businessCollection = new BusinessCollection();
            const result = await businessCollection.add(context.auth.uid, data.business);
            return {
                result
            };
        } catch (err) {
            throw new functions.https.HttpsError(
                'unknown',
                `Failed to add business with error ${err}`
            );
        }
    }
);

export const onBusinessCreated = functions.firestore
    .document('business/{id}')
    .onCreate(async (snap, context) => {
        try {
            const business = snap.data();
            // Add an 'objectID' field which Algolia requires
            business.objectID = context.params.id;
            return index.saveObject(business);
        } catch (err) {
            throw new functions.https.HttpsError(
                'unknown',
                `Failed to run onBusinessCreated with error ${err}`
            );
        }
    });
