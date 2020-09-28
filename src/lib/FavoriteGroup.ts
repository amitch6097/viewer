import { IFavoriteGroup } from '../../typings/base';
import { IFavoriteGroupDocument } from '../../typings/documents';


export class FavoriteGroup implements IFavoriteGroup {
    static fromDocument(document: IFavoriteGroupDocument): FavoriteGroup {
        const favoriteIds =
            (document.business && Object.keys(document.business)) || [];
        return new FavoriteGroup({
            id: document.id,
            label: document.name,
            updatedAt: document.updatedAt,
            createdAt: document.createdAt,
            length: favoriteIds.length,
            favoriteIds: favoriteIds,
            images: document.images,
        });
    }

    constructor(readonly data: IFavoriteGroup) {}

    get id() {
        return this.data.id;
    }
    get label() {
        return this.data.label;
    }
    get updatedAt() {
        return this.data.updatedAt;
    }
    get createdAt() {
        return this.data.createdAt;
    }
    get length() {
        return this.data.length;
    }
    get favoriteIds() {
        return this.data.favoriteIds;
    }
    get images() {
        return this.data.images;
    }
    isFavorited(businessId: string) {
        return this.favoriteIds.includes(businessId);
    }
}
