import { IFlagDocument } from '../../../typings/documents';
import { Collection } from './Collection';

export class FlagCollection extends Collection {
    constructor() {
        super('flag');
    }

    async getData(id: string): Promise<IFlagDocument> {
        return (await super.getData(id)) as IFlagDocument;
    }

    async getAll(ids: string[]): Promise<IFlagDocument[]> {
        return (await super.getAll(ids)) as IFlagDocument[];
    }

    async addFlag({
        type,
        text,
        businessId,
        authId,
    }: {
        type: 'data' | 'inappropriate' | 'closed';
        text: string;
        authId: string;
        businessId: string;
    }): Promise<IFlagDocument> {
        const flagDocument: Omit<IFlagDocument, 'id'> = {
            type,
            text,
            businessId,
            createdBy: authId,
            createdAt: Number(new Date()),
        };

        const result = await this.collection.add(flagDocument);
        const doc = await result.get();
        return {
            id: result.id,
            ...(doc.data() as Omit<IFlagDocument, 'id'>),
        };
    }
}
