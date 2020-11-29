import { IAlgoliaLocationSearchEventSuggestion } from './algolia';

export interface IUserDocument extends IUser {
    reviews?: string[];
    favorites?: string[];
    createdAt?: number;
}

export interface IFavoriteGroupDocument {
    label: string;
    favorites: string[]; //favorite document ids
    updatedAt?: number;
    createdAt?: number;
    createdBy?: string;
    users: string[];
}

export interface IReview {
    id: string;
    text: string;
    rating: number;
    businessId: string;
    createdAt?: number;
    user?: IUserDocument;
    businessName?: string;
}

export interface IUserReviews {
    userId: string;
    reviews: IReviews;
}

export interface IBusinessReviews {
    businessId: string;
    reviews: IReviews;
}

export interface IReviews {
    reviews?: IReview[];
    size?: number;
    count?: number;
    lastId?: string;
    businessId?: string; // not sure but I think this was suppose to be here
}

export interface IUser {
    name: string | undefined;
    image?: string;
    email: string | undefined;
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
    id?: string;
    image?: IImage;
    category: string;
    phone: string;
    email: string;
    address?: IAlgoliaLocationSearchEventSuggestion;
    website?: string;
    identify: Record<EIdentify, IIdentify>;
    owners: IOwner[];
    name: string;
    about?: string;
    guid: string;
    hashtags?: string[];
    hasOwner?: boolean;
    averageReview?: number;
    reviewCount?: number;
    hasAbout?: boolean;
}

export interface IBusinessListingUpdateProperties {
    about: string;
    image?: IImage;
    category: string;
    phone: string;
    email: string;
    address: IAlgoliaLocationSearchEventSuggestion;
    website: string;
    identify: Record<EIdentify, IIdentify>;
    owners: IOwner[];
    name: string;
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
