export interface IUserDocument {
    name: string | undefined;
    image?: string;
    email: string | undefined;
    reviews?: string[];
    createdAt?: number;
    favoriteGroups: Record<string, {
        createdAt: number;
    }>;
}

export interface IFavoriteGroupDocument {
    name: string;
    updatedAt: number;
    createdAt: number;
    createdBy: string;
    images: string[];
    access: 'public' | 'private'
    business: Record<string, {
        createdAt: number;
        // createdBy: string;
    }>;
    // authorizedUsers: Record<string, {
    //     createdAt: number;
    //     createdBy: string;
    // }>
}