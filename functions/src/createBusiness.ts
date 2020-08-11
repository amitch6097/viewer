import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import algoliasearch from 'algoliasearch';

import {
    IBusinessDocument,
    EIdentify,
    BusinessTagDescriptors,
} from '../../typings/types';

import {
    ICreateBusinessProps,
    ICreateBusinessResponse,
} from '../../typings/functions';

const firestore = admin.firestore();

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
// const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;

const ALGOLIA_INDEX_NAME = 'common-good';
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

// create business
export const createBusiness = functions.https.onCall(
    async (
        data: ICreateBusinessProps,
        context
    ): Promise<ICreateBusinessResponse> => {
        // if (!context.auth) throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
        if (!data || typeof data !== 'object')
            throw new functions.https.HttpsError(
                'failed-precondition',
                `The function must be called with a data object. ${data}`
            );
        if (!data.business)
            throw new functions.https.HttpsError(
                'failed-precondition',
                `Could not create business without business object. ${data}`
            );
        if (!data.business.name)
            throw new functions.https.HttpsError(
                'failed-precondition',
                `Could not create business without business name. ${data}`
            );
        try {
            let businessDocument: IBusinessDocument = {
                data: {
                    ...data.business,
                },
                meta: {
                    createdAt: Number(new Date()),
                    createdBy: context?.auth?.uid ?? undefined,
                },
            };

            if (data?.business?.address?.latlng) {
                businessDocument = {
                    ...businessDocument,
                    _geoloc: {
                        lat: data.business.address.latlng.lat,
                        lng: data.business.address.latlng.lng,
                    },
                };
            }

            let tags = Object.keys(data.business.identify)
                .filter((key) => {
                    // only the selected identities
                    return data.business.identify[key as EIdentify].selected;
                })
                .map((key) => {
                    return `${BusinessTagDescriptors.IDENTITY}:${key}`;
                });

            if (data.business.category) {
                tags.push(
                    `${BusinessTagDescriptors.CATEGORY}:${data.business.category}`
                );
            }

            if (data.business.hashtags) {
                data.business.hashtags.forEach((tag) => {
                    tags.push(`${BusinessTagDescriptors.HASHTAG}:${tag}`);
                });
            }

            businessDocument = {
                ...businessDocument,
                _tags: tags,
            };

            const writeResult = await firestore
                .collection('business')
                .add(businessDocument);
            const result = await writeResult.get();
            return {
                id: writeResult.id,
                result: {
                    ...(result.data() as IBusinessDocument),
                },
            };
        } catch (err) {
            throw new functions.https.HttpsError(
                'failed-precondition',
                `Failed to add business with error ${err}`
            );
        }
    }
);

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

// async function createOwner(owner: IOwner): Promise<{ id: string }> {
//     if (!owner || typeof owner !== 'object') {
//         throw new functions.https.HttpsError(
//             'failed-precondition',
//             'The function must be called with a data object.'
//         );
//     }
//     const result = await firestore.collection('owner').add({
//         name: owner.name,
//         bio: owner.bio,
//         position: owner.position,
//         imageId: owner.imageId,
//     });

//     return { id: result.id };
// }
