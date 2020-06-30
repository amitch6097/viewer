import { FBStorage } from '../services/FBStorage';
import { Functions } from '../services/Functions';
import { IBusinessListing, IOwner } from '../../typings/types';
import { localURLtoBlob, generateGUID } from '../helpers';

export class Business {
    static async createBusiness({ business }: { business: IBusinessListing }) {
        const owners: IOwner[] = await Promise.all(
            business.owners.map((owner, index) => {
                return new Promise(async (resolve) => {
                    if (!owner.image) {
                        resolve(owner);
                    }

                    const blob = await localURLtoBlob(owner.image);
                    const id = generateGUID();
                    await FBStorage.uploadImage({
                        blob,
                        businessGUID: business.guid,
                        id,
                    });
                    resolve({
                        ...owner,
                        imageId: id,
                    });
                }) as Promise<IOwner>;
            })
        );

        return await Functions.createBusiness({
            business: {
                ...business,
                owners,
            },
        });
    }
}
