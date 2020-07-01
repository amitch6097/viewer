import { Store, get, set } from 'idb-keyval';
import { IBusinessDocument } from 'typings/types';

const BBStore = new Store('bb-business-db', 'bb-business-store');

export class IndexDB {
    static setBusinessInCache({
        id,
        business,
    }: {
        id: string;
        business: IBusinessDocument;
    }) {
        if (!id) {
            console.warn(
                'Can not set index db value with no id.',
                id,
                business
            );
        }
        set(id, business, BBStore).catch((err) =>
            console.warn('Failed to set index db value', err, id, business)
        );
    }

    static async getBusinessFromCache({
        id,
    }: {
        id: string;
    }): Promise<IBusinessDocument> {
        return await get(id, BBStore);
    }
}
