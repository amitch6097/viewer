import { IBusinessListingUpdateProperties } from '../../typings/types';
import { IBusinessUpdateRequestDocument } from '../../typings/documents';
import { API } from '../services';

export interface IBusinessUpdateRequest {
    id: string;
    businessId: string;
    updateData: Partial<IBusinessListingUpdateProperties>;
    createdAt: number;
    createdBy: string;
    approved?: boolean;
    approvedBy?: string;
}

interface IBusinessUpdateRequestData {
    document: IBusinessUpdateRequestDocument;
}

export class BusinessUpdateRequest implements IBusinessUpdateRequest {
    constructor(readonly data: IBusinessUpdateRequestData) {}

    get id() {
        return this.data.document.id;
    }
    get businessId() {
        return this.data.document.businessId;
    }
    get createdAt() {
        return this.data.document.createdAt;
    }
    get createdBy() {
        return this.data.document.createdBy;
    }
    get approved() {
        return this.data.document.approved;
    }
    get approvedBy() {
        return this.data.document.approvedBy;
    }
    get updateData() {
        return this.data.document.data;
    }

    async delete() {
        await API.updateBusinessUpdatedRequest({
            businessUpdateRequestId: this.id,
            action: 'delete'
        });
    }

    async approve() {
        await API.updateBusinessUpdatedRequest({
            businessUpdateRequestId: this.id,
            action: 'approve'
        });
    }
}
