import { IFlagDocument } from '../../typings/documents';

export interface IBusinessFlag {
    id: string;
    businessId: string;
    type: IFlagDocument['type'];
    text: string;
    createdBy: string;
    createdAt?: number;
}

interface IBusinessFlagData {
    document: IFlagDocument;
}

export class BusinessFlag implements IBusinessFlag {
    constructor(readonly data: IBusinessFlagData) {}

    get id() {
        return this.data.document.id;
    }
    get businessId() {
        return this.data.document.businessId;
    }
    get type() {
        return this.data.document.type;
    }
    get text() {
        return this.data.document.text;
    }
    get createdBy() {
        return this.data.document.createdBy;
    }
    get createdAt() {
        return this.data.document.createdAt;
    }
    
}
