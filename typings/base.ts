export interface IFavoriteGroup {
    id: string;
    label: string;
    updatedAt?: number;
    createdAt?: number;
    length: number;
    favoriteIds: string[];
    images?: string[];
}

export interface IFavoriteGroups {
    length: number;
}

export interface IBusiness {
    name: string;
    imageURL?: string;
    locationLabel: string;
    updatedAt?: number;
    createdAt?: number;
    reviewsLength: number;
    reviewsAverage: number;
}