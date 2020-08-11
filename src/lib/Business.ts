import { FBStorage } from '../services/FBStorage';
import { Functions } from '../services/Functions';
import {
    IBusinessListing,
    IOwner,
    IBusinessDocument,
    EIdentify,
} from '../../typings/types';
import { IGetBusinessResponse } from '../../typings/functions';
import { localURLtoBlob, generateGUID } from '../helpers';

export class Business {

    static async getBusiness({
        id,
    }: {
        id: string;
    }): Promise<IBusinessDocument> {
        const response: IGetBusinessResponse = await Functions.getBusiness({
            id,
        });
        return response.result;
    }

    public data: Readonly<IBusinessDocument>;

    constructor(data?: IBusinessDocument) {
        this.data = Object.freeze(
            data || {
                data: {
                    guid: generateGUID(),
                    about: '',
                    name: '',
                    category: '',
                    phone: '',
                    email: '',
                    address: undefined,
                    website: '',
                    identify: {
                        [EIdentify.MINORITY]: {
                            selected: false,
                            text: '',
                        },
                        [EIdentify.FEMALE]: {
                            selected: false,
                            text: '',
                        },
                    },
                    owners: [
                        {
                            name: '',
                            bio: '',
                            position: '',
                        },
                    ],
                },
            }
        );
    }

    public getData(): IBusinessListing {
        return this.data.data;
    }

    onAddImage = (url: string) => {
        return new Business({
            ...this.data,
            data: {
                ...this.data.data,
                image: {
                    id: generateGUID(),
                    url
                }
            }
        })
    }

    onAddOwner = () => {
        const { owners } = this.data.data;

        return new Business({
            ...this.data,
            data: {
                ...this.data.data,
                owners: [
                    ...owners,
                    {
                        name: '',
                        bio: '',
                        position: '',
                        image: undefined,
                    },
                ],
            },
        });
    };

    onRemoveOwner = (index: number) => {
        const { owners } = this.data.data;
        const ownersCopy = [...owners];
        ownersCopy.splice(index, 1);
        return new Business({
            ...this.data,
            data: {
                ...this.data.data,
                owners: ownersCopy,
            },
        });
    };

    onAddOwnerImage = (index: number, url: string) => {
        const { owners } = this.data.data;

        owners[index] = {
            ...owners[index],
            image: {
                id: generateGUID(),
                url,
            },
        };

        return new Business({
            ...this.data,
            data: {
                ...this.data.data,
                owners: [...owners],
            },
        });
    };

    onChangeBusinessValue = (key: keyof IBusinessListing, value: IBusinessListing[keyof IBusinessListing]) => {
        return new Business({
            ...this.data,
            data: {
                ...this.data.data,
                [key]: value,
            },
        });
    };

    onChangeOwnerValue = (index: number, key: keyof IOwner, value: string) => {
        const { owners } = this.data.data;
        owners[index] = {
            ...owners[index],
            [key]: value,
        };
        return new Business({
            ...this.data,
            data: {
                ...this.data.data,
                owners: [...owners],
            },
        });
    };

    onChangeIdentitySelected = (identity: EIdentify, selected: boolean) => {
        return new Business({
            ...this.data.data,
            data: {
                ...this.data.data,
                identify: {
                    ...this.data.data.identify,
                    [identity]: {
                        ...this.data.data.identify[identity],
                        selected,
                    },
                },
            },
        });
    };


    onChangeIdentityText = (identity: EIdentify, text: string) => {
        return new Business({
            ...this.data.data,
            data: {
                ...this.data.data,
                identify: {
                    ...this.data.data.identify,
                    [identity]: {
                        ...this.data.data.identify[identity],
                        text,
                    },
                },
            },
        });
    };


    onCreateListing = async () => {
        const owners: IOwner[] = await Promise.all(
            this.data.data.owners.map((owner, index) => {
                return new Promise(async (resolve) => {
                    if (!owner.image) {
                        resolve(owner);
                    } else {
                        const blob = await localURLtoBlob(owner.image.url);
                        const url = await FBStorage.uploadImage({
                            blob,
                            businessGUID: this.data.data.guid,
                            id: owner.image.id,
                        });

                        resolve({
                            ...owner,
                            image: {
                                ...owner.image,
                                url,
                            },
                        });
                    }
                }) as Promise<IOwner>;
            })
        );

        let image;
        if (this.data.data.image) {
            const blob = await localURLtoBlob(this.data.data.image.url);
            const id = generateGUID();
            const url = await FBStorage.uploadImage({
                blob,
                businessGUID: this.data.data.guid,
                id,
            });
            image = {
                ...this.data.data.image,
                url,
            };
        }

        return await Functions.createBusiness({
            business: {
                ...this.data.data,
                owners,
                image,
            },
        });
    };
}
