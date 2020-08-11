export interface ILatlng {
    lat: number;
    lng: number;
}

export interface IAlgoliaLocationSearchEventSuggestion {
    name: string;
    administrative: string;
    county: string;
    city: string;
    country: string;
    countryCode: string;
    type: string;
    latlng: ILatlng;
    postcode: string;
    postcodes: string[];
    value: string;
}

export interface IAlgoliaLocationSearchEvent {
    query: string;
    suggestion: IAlgoliaLocationSearchEventSuggestion;
    suggestionIndex: number;
}
