import { IBusinessDocument } from '../../typings/documents';
import { IBusinessListing } from '../../typings/types';

export class Business implements IBusinessListing {

    constructor(readonly data: IBusinessDocument) {}

    get id() {
        return this.guid;
    }

    get name() {
        return this.data.data.name;
    }

    get image() {
        return this.data.data.image;
    }

    get category() {
        return this.data.data.category;
    }

    get phone() {
        return this.data.data.phone;
    }

    get email() {
        return this.data.data.email;
    }

    get address() {
        return this.data.data.address;
    }

    get website() {
        return this.data.data.website;
    }

    get about() {
        return this.data.data.about;
    }

    get identify() {
        return this.data.data.identify;
    }

    get owners() {
        return this.data.data.owners;
    }

    get guid() {
        return this.data.data.guid;
    }

    get hashtags() {
        return this.data.data.hashtags;
    }

    get hasOwner() {
        return Boolean(this.data.meta.ownedBy);
    }

    get websiteRoot() {
        const website = this.data.data.website;
        if(!website) {
            return undefined;
        }
        const headerFinal = ['www.', 'https://', 'http://'].find((header) => {
            return website.indexOf(header) >= 0;
        });
        const root = headerFinal
            ? website.slice(website.indexOf(headerFinal) + headerFinal.length).split('/')[0]
            : website.split('/')[0];
        return root;
    }

    public getData(): IBusinessListing {
        return this.data.data;
    }

    public getListing(): IBusinessListing {
        return this.data.data;
    }

}
