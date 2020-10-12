import React from 'react';
import { CheckExistsView } from './CheckExistsView';
import { Search } from '../../lib/Search';
import { SearchResult } from '../../lib/SearchResult';

export interface ICheckExistsContainerProps {
    onClickResult: (id: string) => void;
    onClickContinue: (name: string) => void;
}

export interface ICheckExistsContainerState {
    search: Search;
    result: SearchResult;
}

export class CheckExistsContainer extends React.Component<
    ICheckExistsContainerProps,
    ICheckExistsContainerState
> {

    private timeout: number;

    constructor(props) {
        super(props);
        this.state = {
            result: undefined,
            search: new Search(),
        };
    }

    onChangeLocationSuggestion = (locationSuggestion: any) => {
        this.setState({
            search: this.state.search.onChangeLocationSuggestion(
                locationSuggestion
            ),
        });
        this.onChangeSearch();
    };

    onChangeSearchValue = (searchValue: string) => {
        this.setState({
            search: this.state.search.onChangeSearchValue(searchValue),
        });
        this.onChangeSearch();
    };

    private onChangeSearch() {
        if (this.timeout) {
            clearTimeout(this.timeout)
        }
        const timeout = setTimeout(() => {
            this.onSearch();
        }, 500);
        this.timeout = timeout as any;
    }

    onSearch = async () => {
        const result = await this.state.search.getResult();
        this.setState({
            result,
        });
    };

    onChangeLocationValue = (value: string) => {
        this.setState({
            search: this.state.search.onChangeLocationValue(value),
        })
    }

    render() {
        return (
            <CheckExistsView
                onChangeLocationSuggestion={this.onChangeLocationSuggestion}
                onChangeLocationValue={this.onChangeLocationValue}
                onChangeBusiness={this.onChangeSearchValue}
                onSearch={this.onSearch}
                results={this.state?.result?.getResults() ?? {}}
                locationValue={this.state.search.getLocationValue()}
                businessValue={this.state.search.getSearchValue()}
                onClickResult={this.props.onClickResult}
                onContinueClicked={() => this.props.onClickContinue(this.state.search.data.searchValue)}
            />
        );
    }
}
