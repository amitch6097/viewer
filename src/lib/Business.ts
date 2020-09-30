import {
    EIdentify, IBusinessDocument, IBusinessListing,
    IOwner
} from '../../typings/types';
import { generateGUID, localURLtoBlob } from '../helpers';
import { FBStorage } from '../services/FBStorage';
import { Functions } from '../services/Functions';

export class Business implements IBusinessListing {
    private data: Readonly<IBusinessDocument>;

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

    get id() {
        return this.guid;
    }

    get name() {
        return this.data.data.name;
    }

    get image() {
        return this.data.data.image;
    }

    get category() {
        return this.data.data.category;
    }

    get phone() {
        return this.data.data.phone;
    }

    get email() {
        return this.data.data.email;
    }

    get address() {
        return this.data.data.address;
    }

    get website() {
        return this.data.data.website;
    }

    get about() {
        return this.data.data.about;
    }

    get identify() {
        return this.data.data.identify;
    }

    get owners() {
        return this.data.data.owners;
    }

    get guid() {
        return this.data.data.guid;
    }

    get hashtags() {
        return this.data.data.hashtags;
    }

    public getData(): IBusinessListing {
        return this.data.data;
    }

    public getListing(): IBusinessListing {
        return this.data.data;
    }

    onAddImage = (url: string) => {
        return new Business({
            ...this.data,
            data: {
                ...this.data.data,
                image: {
                    id: generateGUID(),
                    url,
                },
            },
        });
    };

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

    onChangeBusinessValue = (
        key: keyof IBusinessListing,
        value: IBusinessListing[keyof IBusinessListing]
    ) => {
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

    onAddReview = async () => {};

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
