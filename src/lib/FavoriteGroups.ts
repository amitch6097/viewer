import { API } from '../services';
import { IFavoriteGroups } from '../../typings/base';
import {FavoriteGroup} from './FavoriteGroup'

export class FavoriteGroups implements IFavoriteGroups {

    constructor(readonly data: FavoriteGroup[]) {}

    get length() {
        return this.data.length;
    }

    getInOrder() {
        return this.data.sort((group1, group2) => {
            return group2.updatedAt - group1.updatedAt;
        });
    }

    getSelected(businessId): Record<string, boolean> {
        return this.data.reduce((__, favoriteGroup) => {
            __[favoriteGroup.id] = favoriteGroup.isFavorited(businessId);
            return __;
        }, {})
    }

    async createFavoriteGroup(label: string): Promise<FavoriteGroups> {
        const newFavoriteGroup = await API.createFavoriteGroup(label);
        return new FavoriteGroups([
            newFavoriteGroup,
            ...this.data,
        ]);
    }
}
