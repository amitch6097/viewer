import { IFavoriteGroup } from 'typings/base';
import { IReview, IUser } from 'typings/types';
import { IReviewDocument, IUserDocument } from '../../typings/documents';

export class User implements IUser {
    private data: Readonly<IUserDocument>;

    constructor(data: IUserDocument) {
        this.data = data;
    }

    get image() {
        return this.data.image;
    }

    get name() {
        return this.data.name;
    }

    get email() {
        return this.data.email;
    }

    get reviews() {
        return this.data.reviews || [];
    }

    get favorites() {
        return this.data.favoriteGroups || [];
    }

    get createdAt() {
        return this.data.createdAt;
    }

    get hasBusinesses() {
        return Boolean(
            this.data.businesses && Object.keys(this.data.businesses).length
        );
    }
}
