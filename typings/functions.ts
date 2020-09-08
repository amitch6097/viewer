import { IBusinessListing, IBusinessDocument, IReviewDocument, IUser, IUserDocument } from './types';

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
    user: IUser;
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