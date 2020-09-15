import React from 'react';

import { Search } from '../lib/Search';
import { SearchResult } from '../lib/SearchResult';
import { EIdentify, IIdentify } from 'typings/types';
import { withRouter } from 'react-router-dom';

export interface ISearchContextState {
    search: Search;
    result: SearchResult | undefined;

    onChangeSearch: (search: Search) => void;
    onSearch: () => Promise<void>;
    onChangePage: (page: number) => Promise<void>;
}

export const SearchContext = React.createContext({
    search: new Search(),
    result: undefined,
    onChangeSearch: (search: Search) => {},
    onSearch: async () => {},
    onChangePage: async (page: number) => {}
} as ISearchContextState);

export interface ISearchContextProviderProps {
    history?: any;
}

export class SearchContextProvider extends React.Component<
    ISearchContextProviderProps,
    ISearchContextState
> {
    constructor(props) {
        super(props);
        const useSearch = Boolean(location.search);

        const onChangeSearch = (search: Search) => {
            this.setState({
                search,
            });
        };

        const onChangePage = async (page: number) => {
            const search = this.state.search.onChangePage(page);
            const result = await search.getResult();
            this.setState({
                result,
                search
            });
            const url = search.getSearchURL();
            if(this.props.history) {
                this.props.history.push({
                    pathname: '/discover',
                    search: url
                  });
            }
        }

        const onSearch = async () => {
            const result = await this.state.search.getResult();
            this.setState({
                result,
            });
            const url = this.state.search.getSearchURL();
            if(this.props.history) {
                this.props.history.push({
                    pathname: '/discover',
                    search: url
                  });
            }
        };

        this.state = {
            result: undefined,
            search: useSearch
                ? Search.createFromSearchURL(location.search)
                : new Search(),

            onChangeSearch,
            onSearch,
            onChangePage
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

    render() {
        return (
            <SearchContext.Provider value={this.state}>
                {this.props.children}
            </SearchContext.Provider>
        );
    }
}

export default withRouter(SearchContextProvider);
