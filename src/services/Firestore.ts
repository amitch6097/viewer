import firebase from '../firebase';
import { Business } from '../lib/Business';
import {
    IBusinessDocument,
    IReviewDocument,
    IUserDocument,
    IReview,
} from '../../typings/types';

const firestore = firebase.firestore();

//@ts-ignore
window.firestore = firestore;

export class Firestore {
    static async getBusiness(id: string): Promise<IBusinessDocument> {
        const ref = await firestore.collection('business').doc(id).get();
        if (!ref.exists) {
            console.warn(`Business with id ${id}, does not exist`);
            return undefined;
        }

        const data = ref.data() as IBusinessDocument;
        return data;
    }

    static async getUser(id: string): Promise<IUserDocument> {
        const userDoc = await firestore.collection('user').doc(id).get();
        if (!userDoc.exists) {
            console.warn(`User document does not exists with id ${id}`);
            return undefined;
        }
        return userDoc.data() as IUserDocument;
    }

    static async getInitialReviewsForBusiness({
        businessId,
        count,
    }: {
        businessId: string;
        count: number;
    }): Promise<{
        reviews: IReview[];
        size?: number;
        lastId?: string;
    }> {
        const ref = await firestore
            .collection('review')
            .where('businessId', '==', businessId)
            .orderBy('createdAt')
            .get();
        const size = ref.size;
        if (size === 0) {
            return { reviews: [], size };
        } else {
            const ref = await firestore
                .collection('review')
                .where('businessId', '==', businessId)
                .orderBy('createdAt')
                .limit(count)
                .get();
            if (ref.empty) {
                return { reviews: [], size };
            }

            const reviews = (
                await Promise.all(ref.docs.map(getReviewForBusiness))
            ).filter((x) => x);
            const lastId = ref.docs[ref.docs.length - 1].id;
            return {
                reviews,
                size,
                lastId,
            };
        }
    }

    static async getNextReviewsForBusiness({
        businessId,
        startAfterId,
        count,
    }: {
        businessId: string;
        startAfterId: string;
        count: number;
    }): Promise<{
        reviews: IReview[];
        lastId?: string;
    }> {
        const startAfter = await firestore
            .collection('review')
            .doc(startAfterId)
            .get();
        const ref = await firestore
            .collection('review')
            .where('businessId', '==', businessId)
            .orderBy('createdAt')
            .startAfter(startAfter)
            .limit(count)
            .get();

        if (ref.empty) {
            return { reviews: [] };
        }

        const reviews = (
            await Promise.all(ref.docs.map(getReviewForBusiness))
        ).filter((x) => x);
        const lastId = ref.docs[ref.docs.length - 1].id;
        return {
            reviews,
            lastId,
        };
    }
}

async function getReviewForBusiness(doc): Promise<IReview> {
    if (!doc.exists) {
        return;
    }
    const data = doc.data();
    if (!data.createdBy) {
        console.warn(
            `While getting reviews for Business, review found without a creator, data: ${data}, doc: ${doc}`,
            data
        );
    }

    const user = await Firestore.getUser(data.createdBy);
    const review: IReview = {
        ...data,
        user,
    };
    return review;
}
