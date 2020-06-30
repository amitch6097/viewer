export interface IBusinessDocument {
    id?: string;
    data: IBusinessListing;
    meta: {
        createdAt: string;
        createdBy: string;
    };
}

export interface ICategory {
    id: string;
    label: string;
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
    guid: string;
}

export interface IOwner {
    name: string;
    bio: string;
    position: string;
    image: string;
    imageId: string;
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
