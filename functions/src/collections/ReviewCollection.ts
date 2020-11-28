import { Collection } from './Collection';
import { IReviewDocument } from '../../../typings/documents';
import { BusinessCollection } from './BusinessCollection';

export class ReviewCollection extends Collection {
    constructor() {
        super('review');
    }

    async getData(id: string): Promise<IReviewDocument> {
        return (await super.getData(id)) as IReviewDocument;
    }

    async getAll(ids: string[]): Promise<IReviewDocument[]> {
        return (await super.getAll(ids)) as IReviewDocument[];
    }

    async addReview({
        text,
        rating,
        businessId,
        uid,
    }: {
        text: string;
        rating: number;
        businessId: string;
        uid: string;
    }): Promise<IReviewDocument | undefined> {
        const businessCollection = new BusinessCollection();
        const businessData = businessCollection.getData(businessId);
        if (businessData) {
            
            const reviewDocument: Omit<IReviewDocument, 'id'> = {
                rating,
                text,
                businessId,
                createdAt: Number(new Date()),
                createdBy: uid
            };
            const ref = await this.collection.add(reviewDocument);
            const doc = await ref.get();
            return {
                id: ref.id,
                ...(doc.data() as Omit<IReviewDocument, 'id'>),
            };
        } else {
            return undefined;
        }
    }   
}
