import { Collection } from './Collection';
import { IFavoriteGroupDocument } from '../../../typings/documents';

export class FavoriteGroupCollection extends Collection {
    constructor() {
        super('favoriteGroup');
    }

    async getData(id: string): Promise<IFavoriteGroupDocument> {
        return await super.getData(id) as IFavoriteGroupDocument;
    }

    async addFavoriteGroup({
        label,
        uid,
    }: {
        label: string;
        uid: string;
    }): Promise<
        FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
    > {
        const favoriteGroup: IFavoriteGroupDocument = {
            name: label,
            updatedAt: Number(new Date()),
            createdAt: Number(new Date()),
            createdBy: uid,
            access: 'private',
            business: {},
            images: [],
        };
        return await this.collection.add(favoriteGroup);
    }

    async getAll(ids: string[]): Promise<IFavoriteGroupDocument[]> {
        return await super.getAll(ids) as IFavoriteGroupDocument[];
    }
}
