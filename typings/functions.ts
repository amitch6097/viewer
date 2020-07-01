import { IBusinessListing, IBusinessDocument } from './types';

export interface ICreateBusinessProps {
    business: IBusinessListing;
}

export interface ICreateBusinessResponse {
    id: string;
    result: IBusinessDocument;
}

export interface IGetBusinessProps {
    id: string;
}

export interface IGetBusinessResponse {
    result: IBusinessDocument;
    fromCache?: boolean;
}
