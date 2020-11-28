import * as admin from 'firebase-admin';
import { IBusinessDocument } from '../../../typings/documents';
import { BusinessTagDescriptors, EIdentify, IBusinessListing, IBusinessListingUpdateProperties } from '../../../typings/types';
import { Collection } from './Collection';

/**
 * This does not work for some reason on functions but want to keep for FE
 */
// export const BusinessConverter = {
//     toFirestore(
//         data: Omit<IBusinessDocument, 'id'>
//     ): FirebaseFirestore.DocumentData {
//         console.log(data, 'DATA');
//         return data;
//     },
//     fromFirestore(
//         snapshot: functions.firestore.QueryDocumentSnapshot | IBusinessDocument
//     ): IBusinessDocument {
//         console.log(arguments);
//         if (
//             typeof (snapshot as functions.firestore.QueryDocumentSnapshot)
//                 .data !== 'function'
//         ) {
//             return snapshot as IBusinessDocument;
//         } else {
//             const data = (snapshot as functions.firestore.QueryDocumentSnapshot).data();
//             return {
//                 id: snapshot.id,
//                 ...(data as Omit<IBusinessDocument, 'id'>),
//             };
//         }
//     },
// };

export class BusinessCollection extends Collection {
    constructor() {
        super('business');
    }

    async getData(id: string): Promise<IBusinessDocument> {
        return (await super.getData(id)) as IBusinessDocument;
    }

    async getAll(ids: string[]): Promise<IBusinessDocument[]> {
        return (await super.getAll(ids)) as IBusinessDocument[];
    }

    async addReview({
        businessId,
        reviewId,
        rating,
    }: {
        businessId: string;
        reviewId: string;
        rating: number;
    }) {
        const writeResult = await this.collection.doc(businessId).update({
            reviews: admin.firestore.FieldValue.arrayUnion(reviewId),
            reviewsRatingTotal: admin.firestore.FieldValue.increment(rating),
        });
        return writeResult;
    }

    async deleteReview({
        businessId,
        reviewId,
        rating,
    }: {
        businessId: string;
        reviewId: string;
        rating: number;
    }) {
        const decrement = rating * -1;
        const writeResult = await this.collection.doc(businessId).update({
            reviews: admin.firestore.FieldValue.arrayRemove(reviewId),
            reviewsRatingTotal: admin.firestore.FieldValue.increment(decrement),
        });
        return writeResult;
    }

    async update(
        businessId: string,
        updateProperties: Partial<IBusinessListingUpdateProperties>
    ): Promise<IBusinessDocument> {
        const dotNotation = Object.keys(updateProperties).reduce((__, key) => {
            if (key === 'address') {
                __['data.' + key] = {
                    name: updateProperties.address.name,
                    administrative: updateProperties.address.administrative,
                    county: updateProperties.address.county,
                    city: updateProperties.address.city,
                    country: updateProperties.address.country,
                    countryCode: updateProperties.address.countryCode,
                    type: updateProperties.address.type,
                    latlng: updateProperties.address.latlng,
                    postcode: updateProperties.address.postcode,
                    value: updateProperties.address.value,
                }
                __['_geoloc'] =  {
                    lat: updateProperties?.address?.latlng?.lat,
                    lng: updateProperties?.address?.latlng?.lng,
                };
            } else  {
                __['data.' + key] = updateProperties[key];
            }
            return __;
        }, {});
        dotNotation['_tags'] = getTags(updateProperties as IBusinessListing);
        await this.collection.doc(businessId).update(dotNotation);
        return await this.getData(businessId)
    }

    async addUpdateRequest(businessId: string, updateRequestId: string) {
        return await this.collection.doc(businessId).update({
            businessUpdateRequests:admin.firestore.FieldValue.arrayUnion(updateRequestId),
        });
    }

    async removeUpdateRequest(businessId: string, updateRequestId: string) {
        return await this.collection.doc(businessId).update({
            businessUpdateRequests: admin.firestore.FieldValue.arrayRemove(updateRequestId),
        });
    }

    async addFlag(businessId: string, flagId: string) {
        return await this.collection.doc(businessId).update({
            flags :admin.firestore.FieldValue.arrayUnion(flagId),
        });
    }

    async removeFlag(businessId: string, flagId: string) {
        return await this.collection.doc(businessId).update({
            flags: admin.firestore.FieldValue.arrayRemove(flagId),
        });
    }

    async add(authId: string, business: IBusinessListing): Promise<IBusinessDocument> {
        let businessDocument: Omit<IBusinessDocument, 'id'> = {
            data: {
                ...business,
                address: {
                    name: business.address.name,
                    administrative: business.address.administrative,
                    county: business.address.county,
                    city: business.address.city,
                    country: business.address.country,
                    countryCode: business.address.countryCode,
                    type: business.address.type,
                    latlng: business.address.latlng,
                    postcode: business.address.postcode,
                    value: business.address.value,
                },
            },
            meta: {
                createdAt: Number(new Date()),
                createdBy: authId,
                ownedBy: authId,
            },
            _geoloc: {
                lat: business?.address?.latlng?.lat,
                lng: business?.address?.latlng?.lng,
            },
            _tags: getTags(business),
            reviewsRatingTotal: 0,
            reviews: [],
            businessUpdateRequests: [],
            flags: []
        };
        const writeResult = await this.collection.add(businessDocument);
        const result = await writeResult.get() 
        return {
            id: writeResult.id,
            ...(result.data()) as Omit<IBusinessDocument, 'id'>
        }
    }
}

function getTags(business: IBusinessListing) {
    const tags = Object.keys(business?.identify ?? {})
        .filter((key) => {
            // only the selected identities
            return business.identify[key as EIdentify].selected;
        })
        .map((key) => {
            return `${BusinessTagDescriptors.IDENTITY}:${key}`;
        });

    if (business.category) {
        tags.push(`${BusinessTagDescriptors.CATEGORY}:${business.category}`);
    }

    if (business.hashtags) {
        business.hashtags.forEach((tag) => {
            tags.push(`${BusinessTagDescriptors.HASHTAG}:${tag}`);
        });
    }

    return tags;
}
