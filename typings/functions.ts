import {
    IBusinessDocument,
    IBusinessListing,
    IFavoriteDocument,
    IFavoriteGroupDocument,
    IReviewDocument,
    IUserDocument,
} from './types';

export interface ICreateFavoriteGroupProps {
    label: string;
}

export interface ICreateFavoriteGroupResponse {
    id: string;
    favoriteGroup: IFavoriteGroupDocument;
}

export interface IGetFavoriteGroupFavoritesProps {
    count?: number;
    page?: number;
    favoriteGroupId: string;
}

export interface IGetFavoriteGroupFavoritesResponse {
    results: Array<{
        id: string;
        data: IBusinessDocument;
    }>;
    page: number;
    pages: number;
    lastId: string;
}

export interface IGetUserFavoritesProps {
    count?: number;
    page?: number;
}

export interface IGetUserFavoritesResponse {
    results: Array<{
        id: string;
        data: IFavoriteGroupDocument;
    }>;
    page: number;
    pages: number;
    lastId: string;
}

export interface IFavoriteBusinessProps {
    businessId: string;
    favoriteGroupId: string;
    newFavoriteGroupLabel: string;
}

export interface IFavoriteBusinessResponse {
    favorites: string[];
}

export interface IUnfavoriteBusinessProps {
    businessId: string;
}

export interface IUnfavoriteBusinessResponse {
    favorites: string[];
}

export interface ICreateReviewProps {
    review: IReviewDocument;
}

export interface ICreateReviewResponse {
    id: string;
    review: IReviewDocument;
    user: IUserDocument;
}

export interface ICreateBusinessProps {
    business: IBusinessListing;
}

export interface ICreateBusinessResponse {
    id: string;
    result: IBusinessDocument;
}
