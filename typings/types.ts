import { IAlgoliaLocationSearchEventSuggestion } from './algolia';

export interface IBusinessDocument {
    id?: string;
    data: IBusinessListing;
    meta?: {
        createdAt: number;
        createdBy: string | undefined;
    };
    _geoloc?: {
        lat: number;
        lng: number;
    };
    _tags?: string[];
}

export enum BusinessTagDescriptors {
    IDENTITY = 'identity',
    CATEGORY = 'category',
    HASHTAG = '#',
}

export interface ICategory {
    id: string;
    label: string;
}

export interface IImage {
    id: string;
    url: string;
}

export interface IBusinessListing {
    image?: IImage;
    imageId?: string;
    category: string;
    phone: string;
    email: string;
    address: IAlgoliaLocationSearchEventSuggestion;
    website: string;
    identify: Record<EIdentify, IIdentify>;
    owners: IOwner[];
    name: string;
    about: string;
    guid: string;
    hashtags?: string[];
}

export interface IOwner {
    name: string;
    bio: string;
    position: string;
    image?: IImage;
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
