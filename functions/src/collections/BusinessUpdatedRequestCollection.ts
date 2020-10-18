import { Collection } from './Collection';
import { IBusinessUpdateRequestDocument } from '../../../typings/documents';
import { IBusinessListingUpdateProperties } from '../../../typings/types';

export class BusinessUpdateRequestCollection extends Collection {
    constructor() {
        super('businessUpdateRequest');
    }

    async getData(id: string): Promise<IBusinessUpdateRequestDocument> {
        return (await super.getData(id)) as IBusinessUpdateRequestDocument;
    }

    async getAll(ids: string[]): Promise<IBusinessUpdateRequestDocument[]> {
        return (await super.getAll(ids)) as IBusinessUpdateRequestDocument[];
    }

    async createNewRequest({
        authId,
        businessId,
        updateProperties,
    }: {
        businessId: string;
        updateProperties: Partial<IBusinessListingUpdateProperties>;
        authId: string;
    }): Promise<IBusinessUpdateRequestDocument> {
        const document: Omit<IBusinessUpdateRequestDocument, 'id'> = {
            businessId,
            data: {
                about: updateProperties.about,
                image: updateProperties.image,
                category: updateProperties.category,
                phone: updateProperties.phone,
                email: updateProperties.email,
                address: updateProperties.address,
                website: updateProperties.website,
                identify: updateProperties.identify,
                owners: updateProperties.owners,
                name: updateProperties.name,
            },
            createdAt: Number(new Date()),
            createdBy: authId,
        };
        const ref = await this.collection.add(document);
        const doc = await ref.get();

        return {
            id: ref.id,
            ...(doc.data() as Omit<IBusinessUpdateRequestDocument, 'id'>),
        };
    }
}
