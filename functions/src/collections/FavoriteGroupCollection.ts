import { Collection } from './Collection';
import { IFavoriteGroupDocument } from '../../../typings/documents';

export class FavoriteGroupCollection extends Collection {
    constructor() {
        super('favoriteGroup');
    }

    async getData(id: string): Promise<IFavoriteGroupDocument> {
        return (await super.getData(id)) as IFavoriteGroupDocument;
    }

    async setBusinessAsFavorite({
        favoriteGroupId,
        businessId,
        add,
        uid,
    }: {
        favoriteGroupId: string;
        businessId: string;
        add: boolean;
        uid: string;
    }): Promise<string | undefined> {
        const favoriteGroup = await this.getData(favoriteGroupId);
        if (!favoriteGroup) {
            return `Could not add favorite to group with id ${favoriteGroupId}, because it does not exist`;
        }
        const isOwnedByThisUser = favoriteGroup.createdBy === uid;
        if (!isOwnedByThisUser) {
            return `Could not add favorite to group with id ${favoriteGroupId}, because the user does not have write access`;
        }
        const business = favoriteGroup.business || {};
        if (add) {
            await this.collection.doc(favoriteGroupId).update({
                business: {
                    ...business,
                    [businessId]: {
                        createdAt: Number(new Date()),
                    },
                },
            });
        } else {
            // remove
            delete business[businessId];
            await this.collection.doc(favoriteGroupId).update({
                business: {
                    ...business,
                },
            });
        }
        return 'success';
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
            ...(doc.data() as Omit<IFavoriteGroupDocument, 'id'>),
        };
    }

    async getAll(ids: string[]): Promise<IFavoriteGroupDocument[]> {
        return (await super.getAll(ids)) as IFavoriteGroupDocument[];
    }
}
