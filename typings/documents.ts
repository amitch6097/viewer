import {IBusinessListing, IBusinessListingUpdateProperties} from './types';

export interface IUserDocument {
    name: string | undefined;
    image?: string;
    email: string | undefined;
    reviews?: string[];
    createdAt?: number;
    favoriteGroups: Record<string, {
        createdAt: number;
    }>;
    businesses: Record<string, {
        createdAt: number;
    }>;
}

export interface IFlagDocument {
    id: string;
    businessId: string;
    type: 'data' | 'inappropriate' | 'closed',
    text: string;
    createdBy: string;
    createdAt?: number;
}

export interface IReviewDocument {
    id: string;
    text: string;
    rating: number;
    businessId: string;
    businessName?: string;
    createdAt?: number;
    createdBy?: string;
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
        ownedBy: string | undefined;
    };
    _geoloc?: {
        lat: number;
        lng: number;
    };
    _tags?: string[];
    reviews?: string[]; //review id list
    reviewsRatingTotal?: number;
    businessUpdateRequests: string[];
    flags: string[];
}

export interface IBusinessUpdateRequestDocument {
    id: string;
    businessId: string;
    data: Partial<IBusinessListingUpdateProperties>;
    createdAt: number;
    createdBy: string;
    approved?: boolean;
    approvedBy?: string;
}