import {
    IBusinessListing,
    IBusinessDocument,
    IReviewDocument,
    IUser,
    IUserDocument,
} from './types';
import { IFavoriteGroupDocument } from './documents';

export interface ICreateFavoriteGroupProps {
    label: string;
}

export interface ICreateFavoriteGroupResponse {
    id: string;
    favoriteGroup: IFavoriteGroupDocument;
}

export interface ISetBusinessAsFavoriteProps {
    businessId: string;
    // what to set each favorite group id indexed by id.
    setByFavoriteGroupId: Record<string, boolean>;
}

export interface ISetBusinessAsFavoriteResponse {
    messages: string[];
}

export interface IGetFavoriteGroupsProps {
    count?: number;
    page?: number;
}

export interface IGetFavoriteGroupsResponse {
    favoriteGroups: IFavoriteGroupDocument[];
}

export interface IGetBusinessesForFavoriteGroupsProps {
    favoriteGroupId: string;
    count?: number;
    page?: number;
}

export interface IGetBusinessesForFavoriteGroupsResponse {
    businesses: IBusinessDocument[];
}

export interface IFavoriteBusinessProps {
    businessId: string;
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
