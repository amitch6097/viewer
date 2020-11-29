import {
    IFavoriteGroupDocument,
    IReviewDocument,
    IBusinessDocument,
    IBusinessUpdateRequestDocument,
    IFlagDocument,
} from './documents';
import { IBusinessListing, IBusinessListingUpdateProperties } from './types';

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
    isOwner?: boolean;
    business: IBusinessListing;
}

export interface ICreateBusinessResponse {
    result: IBusinessDocument;
}

export interface IUpdateBusinessUpdateRequestProps {
    businessUpdateRequestId: string;
    action: 'delete' | 'approve';
}

export interface IUpdateBusinessUpdateRequestResponse {
    action: 'delete' | 'approve';
}

export interface ICreateBusinessUpdateRequestProps {
    businessId: string;
    updateProperties: Partial<IBusinessListingUpdateProperties>;
}

export interface ICreateBusinessUpdateRequestResponse {
    result: IBusinessUpdateRequestDocument;
}


export interface ICreateFlagProps {
    text: string;
    type: 'data' | 'inappropriate' | 'closed';
    businessId: string;
}

export interface ICreateFlagResponse {
    result: IFlagDocument
}

export interface IGetBusinessUpdateRequestsProps {
    businessId: string;
}

export interface IGetBusinessUpdateRequestsResponse {
    result: IBusinessUpdateRequestDocument[];
}

export interface IGetBusinessFlagsProps {
    businessId: string;
}

export interface IGetBusinessFlagsResponse {
    result: IFlagDocument[];
}

export interface IGetMyBusinessesProps {}

export interface IGetMyBusinessesResponse {
    result: IBusinessDocument[];
}


export interface IGetMyReviewsProps {}
export interface IGetMyReviewsResponse {
    result: IReviewDocument[];
}


export interface IDeleteMyReviewProps {
    reviewId: string;
}
export interface IDeleteMyReviewResponse {
    result: boolean;
}

export interface IClaimBusinessProps {
    businessId: string;
}
export interface IClaimBusinessResponse {
    result: boolean;
}