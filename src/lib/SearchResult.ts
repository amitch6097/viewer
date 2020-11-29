import { SearchResponse } from '@algolia/client-search';
import { IBusinessListing } from '../../typings/types';
import { IBusinessDocument } from '../../typings/documents';

export class SearchResult {
    data: SearchResponse<IBusinessDocument>;

    constructor(data: SearchResponse<IBusinessDocument>) {
        this.data = data;
    }

    getResults(): Record<string, IBusinessListing> {
        return this.data.hits.reduce((results, hit) => {
            results[hit.objectID] = hit.data;
            return results;
        }, {});
    }

    getPages(): number {
        return this.data.nbPages;
    }
}
