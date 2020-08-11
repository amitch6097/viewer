import {
    EIdentify,
    IIdentify,
    IBusinessDocument,
    BusinessTagDescriptors,
} from 'typings/types';
import { RequestOptions } from '@algolia/transporter';
import { SearchOptions } from '@algolia/client-search';
import { SearchResponse } from '@algolia/client-search';
import algoliasearch from 'algoliasearch/lite';
import { SearchResult } from './SearchResult';
import queryString from 'query-string';

const searchClient = algoliasearch(
    'MQBBVGG94P',
    'd68c847f05c3ef5ddce1b1890080a35b'
);

const index = searchClient.initIndex('common-good');

type SearchAttributes = RequestOptions & SearchOptions;

export interface ISearch {
    searchValue: string;
    locationSuggestion: {
        lat: number;
        lng: number;
    };
    locationValue: string;
    filters: Record<EIdentify, boolean>;
    category: string;
}

export class Search {
    data: ISearch;

    static InitialState: ISearch = {
        searchValue: '',
        locationSuggestion: undefined,
        locationValue: '',
        category: undefined,
        filters: {
            [EIdentify.MINORITY]: false,
            [EIdentify.FEMALE]: false,
        },
    }

    static createFromSearchURL(url: string) {
        const json = queryString.parse(url, {parseBooleans: true, parseNumbers: true});
        const data = Object.keys(json).reduce((_, key) => {
            const value = json[key];
            if (key === 'lat' || key === 'lng') {
                _.locationSuggestion = _.locationSuggestion || {};
                _.locationSuggestion[key] = value;
            } else if(key.includes(BusinessTagDescriptors.IDENTITY)) {
                const filterKey = key.split(":")[1];
                _.filters = _.filters || {};
                _.filters[filterKey] = value;
            } else {
                _[key] = value;
            }
            return _;
        }, {} as any);
        return new Search({
            ...Search.InitialState,
            ...data
        });
    }

    constructor(data?: ISearch) {
        this.data = Object.freeze(
            data || Search.InitialState);
    }

    /** Actions */

    onChangeLocationValue = (locationValue: string): Search => {
        return new Search({
            ...this.data,
            locationValue,
        });
    };

    onChangeLocationSuggestion = (locationSuggestion: any): Search => {
        return new Search({
            ...this.data,
            locationSuggestion: locationSuggestion?.suggestion?.latlng ?? {},
            locationValue: locationSuggestion?.suggestion?.value ?? ''
        });
    };

    onChangeSearchValue = (searchValue: string): Search => {
        return new Search({
            ...this.data,
            searchValue,
        });
    };

    onChangeCategory = (category: string): Search => {
        return new Search({
            ...this.data,
            category,
        });
    };

    onChangeFilterSelected = (key: EIdentify, selected: boolean): Search => {
        return new Search({
            ...this.data,
            filters: {
                ...this.data.filters,
                [key]: selected,
            },
        });
    };

    /** Getters */

    getSearchValue() {
        return this.data.searchValue;
    }

    getLocationValue() {
        return this.data.locationValue;
    }

    getCategory() {
        return this.data.category;
    }

    getFilters() {
        return this.data.filters;
    }

    getSearchURL() {
        const filters = Object.keys(this.data.filters).reduce((_, key) => {
            _[`${BusinessTagDescriptors.IDENTITY}:${key}`] = this.data.filters[key];
            return _;
        }, {});

        let json = {
            searchValue: this.data.searchValue,
            locationValue: this.data.locationValue,
            category: this.data.category,
            ...filters
        }

        if (this.data.locationSuggestion) {
            json = {
                ...json,
                ...this.data.locationSuggestion
            }
        }

        const url = queryString.stringify(json)
        return url;
    }



    async getResult(): Promise<SearchResult> {
        const searchValue = this.data.searchValue;
        const searchAttributes: RequestOptions &
            SearchOptions = this.getSearchAttributes();
        const response: SearchResponse<IBusinessDocument> = await index.search(
            searchValue,
            searchAttributes
        );
        return new SearchResult(response);
    }

    private getSearchAttributes(): SearchAttributes {
        let searchAttributes: any = {};

        // add location
        if (this.data.locationSuggestion) {
            const {lat, lng} = this.data.locationSuggestion;
            searchAttributes.aroundLatLng = `${lat}, ${lng}`;
            searchAttributes.aroundRadius = 100000; // 100 km
        }

        // add tags
        let tags = Object.keys(this.data.filters)
            .filter((key) => {
                return Boolean(this.data.filters[key]);
            })
            .map((key) => {
                return `${BusinessTagDescriptors.IDENTITY}:${key}`;
            });

        if (this.data.category) {
            tags.push(
                `${BusinessTagDescriptors.CATEGORY}:${this.data.category}`
            );
        }

        searchAttributes.tagFilters = tags;

        return searchAttributes as SearchAttributes;
    }
}
