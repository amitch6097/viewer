import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import algoliasearch from 'algoliasearch';

// import { Collections } from '../../typings/types';

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
// const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;

const ALGOLIA_INDEX_NAME = 'common-good';
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

// create business
export const createBusiness = functions.https.onCall(async (data, context) => {
    // if (!context.auth) throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    if (!data || typeof data !== 'object')
        throw new functions.https.HttpsError(
            'failed-precondition',
            'The function must be called with a data object.'
        );
    if (!data.business)
        throw new functions.https.HttpsError(
            'failed-precondition',
            'Could not create business without business object.'
        );
    if (!data.business.name)
        throw new functions.https.HttpsError(
            'failed-precondition',
            'Could not create business without business name.'
        );
    try {
        const writeResult = await firestore.collection('business').add({
            data: {
                ...data.business,
            },
            meta: {
                createdAt: Number(new Date()),
                createdBy: null,
            },
        });
        const result = await writeResult.get();
        return {
            id: writeResult.id,
            result: {
                ...result.data(),
            },
        };
    } catch (err) {
        throw new functions.https.HttpsError(
            'failed-precondition',
            `Failed to add business with error ${err}`
        );
    }
});

export const onBusinessCreated = functions.firestore
    .document('business/{id}')
    .onCreate(async (snap, context) => {
        try {
            // Get the note document
            const business = snap.data();
            // Add an 'objectID' field which Algolia requires
            business.objectID = context.params.id;
            return index.saveObject(business);
        } catch (err) {
            throw new functions.https.HttpsError(
                'failed-precondition',
                `Failed to run onBusinessCreated with error ${err}`
            );
        }
    });

// get business
