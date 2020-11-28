import {IReview, IUser} from '../../typings/types';

export class Review implements IReview {
    data: Readonly<IReview>;

    constructor(data: IReview) {
        this.data = Object.freeze({
            ...data,
        });
    }

    get user() {
        return this.data.user;
    }

    get createdAt() {
        return this.data.createdAt;
    }

    get rating() {
        return this.data.rating;
    }

    get businessId() {
        return this.data.businessId;
    }

    get text() {
        return this.data.text;
    }

    get businessName() {
        return this.data.businessName;
    }
}
