import { Collection } from './Collection';
import { IFavoriteGroupDocument } from '../../../typings/documents';

export class FavoriteGroupCollection extends Collection {
    constructor() {
        super('favoriteGroup');
    }

    async getData(id: string): Promise<IFavoriteGroupDocument> {
        return (await super.getData(id)) as IFavoriteGroupDocument;
    }

    async addFavoriteGroup({
        label,
        uid,
    }: {
        label: string;
        uid: string;
    }): Promise<IFavoriteGroupDocument> {
        const favoriteGroup: Omit<IFavoriteGroupDocument, 'id'> = {
            name: label,
            updatedAt: Number(new Date()),
            createdAt: Number(new Date()),
            createdBy: uid,
            access: 'private',
            business: {},
            images: [],
        };

        const ref = await this.collection.add(favoriteGroup);
        const doc = await ref.get();
        return {
            id: ref.id,
            ...doc.data() as Omit<IFavoriteGroupDocument, 'id'>,
        };
    }

    async getAll(ids: string[]): Promise<IFavoriteGroupDocument[]> {
        return (await super.getAll(ids)) as IFavoriteGroupDocument[];
    }
}
