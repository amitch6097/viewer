export interface IBusinessDocument {
    data: IBusiness;
    meta: {
        createdAt: string;
        createdBy: string;
    };
}

export interface IBusinessListing {
    category: string;
    phone: string;
    email: string;
    address: string;
    website: string;
    identify: Record<EIdentify, IIdentify>;
    owners: IOwner[];
    name: string;
    about: string;
}

export interface IBusiness {
    bio: string;
    category: string;
    name: string;
    number: string;
    owners: IOwner[]; // ids;
    tags: string[];
    website: string;
    likes: number;
    listing: IBusinessListing;
}

export interface IOwner {
    name: string;
    bio: string;
    position: string;
    image: string;
}

export enum Collections {
    BUSINESS = 'business',
}

export enum EIdentify {
    MINORITY = 'MINORITY',
    FEMALE = 'FEMALE',
}

export interface IIdentify {
    selected: boolean;
    text: string;
}
