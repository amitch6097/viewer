export interface IFavoriteGroup {
    label: string;
    updatedAt?: number;
    createdAt?: number;
    length: number;
    favoriteIds: string[];
    images?: string[];
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