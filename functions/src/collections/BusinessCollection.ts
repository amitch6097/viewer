import { Collection } from './Collection';
import { IBusinessDocument } from '../../../typings/types';

export class BusinessCollection extends Collection {
    constructor() {
        super('business');
    }

    async getData(id: string): Promise<IBusinessDocument> {
        return await super.getData(id) as IBusinessDocument;
    }

    async getAll(ids: string[]): Promise<IBusinessDocument[]> {
        return await super.getAll(ids) as IBusinessDocument[];
    }
}