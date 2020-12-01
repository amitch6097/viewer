import {
    IFlagDocument,
    IReviewDocument,
    IUserDocument,
} from '../../typings/documents';
import { IReview } from '../../typings/types';
import { IBusinessDocument } from '../../typings/documents';
import firebase from '../firebase';
import { User } from '../lib/User';

const firestore = firebase.firestore();

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

    static async getInitialReviewsForUser({
        userId,
        count,
    }: {
        userId: string;
        count: number;
    }): Promise<{
        reviews: IReview[];
        size?: number;
        lastId?: string;
    }> {
        const user = await Firestore.getUser(userId);
        const size = user?.reviews?.length || 0;
        if (size === 0) {
            return { reviews: [], size };
        } else {
            const reviewIds = user.reviews.slice(0, count);
            const docs = await Promise.all(
                reviewIds.map((id) =>
                    firestore.collection('review').doc(id).get()
                )
            );
            const reviews = (
                await Promise.all(docs.map(getReviewFromDoc))
            ).filter((x) => x);
            const lastId = docs[docs.length - 1].id;
            return {
                reviews,
                size,
                lastId,
            };
        }
    }

    static async getNextReviewsForUser({
        userId,
        count,
        startAfterId,
    }: {
        userId: string;
        count: number;
        startAfterId: string;
    }): Promise<{
        reviews: IReview[];
        size?: number;
        lastId?: string;
    }> {
        const user = await Firestore.getUser(userId);
        const size = user?.reviews?.length || 0;
        if (size === 0) {
            return { reviews: [], size };
        } else {
            const startAfterIndex = user.reviews.indexOf(startAfterId) + 1;
            const reviewIds = user.reviews.slice(
                startAfterIndex,
                startAfterIndex + count
            );
            const docs = await Promise.all(
                reviewIds.map((id) =>
                    firestore.collection('review').doc(id).get()
                )
            );
            const reviews = (
                await Promise.all(docs.map(getReviewFromDoc))
            ).filter((x) => x);
            const lastId = docs[docs.length - 1].id;
            return {
                reviews,
                size,
                lastId,
            };
        }
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
                await Promise.all(ref.docs.map(getReviewFromDoc))
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
            await Promise.all(ref.docs.map(getReviewFromDoc))
        ).filter((x) => x);
        const lastId = ref.docs[ref.docs.length - 1].id;
        return {
            reviews,
            lastId,
        };
    }

    static async getFlagsForBusiness(
        businessId: string
    ): Promise<Array<IFlagDocument>> {
        const business = await firestore
            .collection('business')
            .doc(businessId)
            .get();

        const businessData = business.data();
        const flagIds = businessData.flags;
        if (flagIds) {
            const flags = await Promise.all(
                flagIds.map((id: string) => {
                    return new Promise(async (resolve) => {
                        const doc = await firestore
                            .collection('flag')
                            .doc(id)
                            .get();
                        resolve({
                            id,
                            ...(doc.data())
                        });
                    });
                })
            );
            return flags as Array<IFlagDocument>;
        }
        return [];
    }
}

async function getReviewFromDoc(
    doc: firebase.firestore.QueryDocumentSnapshot<
        firebase.firestore.DocumentData
    >
): Promise<IReview | undefined> {
    if (!doc.exists) {
        return undefined;
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
        ...(data as IReviewDocument),
        user: new User(user),
    };
    return review;
}
