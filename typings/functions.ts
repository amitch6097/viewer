import { IFavoriteGroupDocument, IReviewDocument } from './documents';
import {
    IBusinessDocument, IBusinessListing,

    IUserDocument
} from './types';

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

export interface IGetFavoriteGroupProps {
    id: string;
}

export interface IGetFavoriteGroupResponse {
    favoriteGroup: IFavoriteGroupDocument;
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

export interface ICreateReviewProps {
    text: string;
    rating: number;
    businessId: string;
}

export interface ICreateReviewResponse {
    id: string;
    review: IReviewDocument;
}

export interface ICreateBusinessProps {
    business: IBusinessListing;
}

export interface ICreateBusinessResponse {
    id: string;
    result: IBusinessDocument;
}
