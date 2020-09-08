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
    reviews?: string[]; //review id list
}

export interface IUserDocument extends IUser {
    reviews?: string[];
    favorites?: string[];
    createdAt?: number;
}

export interface IReviewDocument {
    text: string;
    rating: number;
    businessId: string;
    createdAt?: number;
    createdBy?: string;
}

export interface IReview {
    text: string;
    rating: number;
    businessId: string;
    createdAt?: number;
    user?: IUserDocument;
}

export interface IUser {
    name: string;
    image?: string;
    email: string;
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
    bio?: string;
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
