import React from 'react';
import { DiscoverView } from './DiscoverView';
import { EIdentify, IIdentify } from 'typings/types';
import { Search } from '../../lib/Search';
import { SearchResult } from '../../lib/SearchResult';
import queryString from 'query-string';

export interface IDiscoverContainerProps {
    goToBusiness: (id: string) => void;
    onUpdateSearchURL: (url: string) => void;
}

export interface IDiscoverContainerState {
    search: Search;
    result: SearchResult;
}

export class DiscoverContainer extends React.Component<
    IDiscoverContainerProps,
    IDiscoverContainerState
> {
    constructor(props) {
        super(props);
        const useSearch = Boolean(location.search);
        this.state = {
            result: undefined,
            search: useSearch
                ? Search.createFromSearchURL(location.search)
                : new Search(),
        };
    }

    componentDidMount() {
        const useSearch = Boolean(location.search);
        if (useSearch) {
            this.state.search.getResult().then((result) => {
                this.setState({
                    result,
                });
            });
        }
    }

    onChangeLocationSuggestion = (locationSuggestion: any) => {
        this.setState({
            search: this.state.search.onChangeLocationSuggestion(
                locationSuggestion
            ),
        });
    };

    onChangeSearchValue = (searchValue: string) => {
        this.setState({
            search: this.state.search.onChangeSearchValue(searchValue),
        });
    };

    onSearch = async () => {
        const result = await this.state.search.getResult();
        this.setState({
            result,
        });
        const url = this.state.search.getSearchURL();
        this.props.onUpdateSearchURL(url);
    };

    onChangeFilterSelected = (key: EIdentify, selected: boolean) => {
        this.setState({
            search: this.state.search.onChangeFilterSelected(key, selected),
        });
    };

    onChangeCategory = (category: string) => {
        this.setState({
            search: this.state.search.onChangeCategory(category),
        });
    };

    render() {
        return (
            <DiscoverView
                onClickBusiness={this.props.goToBusiness}
                onChangeLocationSuggestion={this.onChangeLocationSuggestion}
                onChangeSearchValue={this.onChangeSearchValue}
                onSearch={this.onSearch}
                onChangeFilterSelected={this.onChangeFilterSelected}
                onChangeCategory={this.onChangeCategory}
                results={this.state?.result?.getResults() ?? {}}
                filters={this.state.search.getFilters()}
                category={this.state.search.getCategory()}
                locationValue={this.state.search.getLocationValue()}
                businessValue={this.state.search.getSearchValue()}
            />
        );
    }
}
