import {IBusinessListing} from './types';

export interface IUserDocument {
    name: string | undefined;
    image?: string;
    email: string | undefined;
    reviews?: string[];
    createdAt?: number;
    favoriteGroups: Record<string, {
        createdAt: number;
    }>;
}

export interface IFavoriteGroupDocument {
    id: string;
    name: string;
    updatedAt: number;
    createdAt: number;
    createdBy: string;
    images: string[];
    access: 'public' | 'private'
    business: Record<string, {
        createdAt: number;
        // createdBy: string;
    }>;
    // authorizedUsers: Record<string, {
    //     createdAt: number;
    //     createdBy: string;
    // }>
}

export interface IBusinessDocument {
    id: string;
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