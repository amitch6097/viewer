import { IUserDocument } from '../../typings/types';

export class User implements IUserDocument {
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
        return this.data.favorites || [];
    }

    get createdAt() {
        return this.data.createdAt;
    }
}
