import React, { Component } from 'react';
import './Search.less';

import { BusinessAutocomplete } from './BusinessAutocomplete';
import { LocationAutocomplete } from './LocationAutocomplete';

import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

export interface ISearchProps {
    onClick?: () => void;
}

export interface ISearchState {
    businessSuggestion: any;
    business: string;
    locationSuggestion: any;
    location: string;
}

export class Search extends Component {
    searchRef: React.RefObject<unknown>;

    constructor(props) {
        super(props);
        this.searchRef = React.createRef();
    }

    onChangeLocation = (location: string) => {
        this.setState({
            location,
        });
    };

    onChangeLocationSuggestion = (locationSuggestion: any) => {
        this.setState({
            locationSuggestion,
        });
    };

    onChangeBusiness = (business: string) => {
        this.setState({
            business,
        });
    };

    onChangeBusinessSuggestion = (businessSuggestion: string) => {
        this.setState({
            businessSuggestion,
        });
    };

    render() {
        return (
            <div className="bb-search">
                <div className="bb-search__inputs">
                    <div className="bb-search__inputs-find">
                        <label className="bb-search__inputs-label">Find</label>
                        <BusinessAutocomplete
                            onChange={this.onChangeBusiness}
                            onClickSuggestion={this.onChangeBusinessSuggestion}
                        />
                    </div>
                    <div className="bb-search__inputs-location">
                        <label className="bb-search__inputs-label">Near</label>
                        <LocationAutocomplete
                            onChange={this.onChangeLocation}
                            onClickSuggestion={this.onChangeLocationSuggestion}
                        />
                    </div>
                </div>
                <div className="bb-search__button">
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className="bb-search__button-icon-button"
                        classes={{
                            startIcon:
                                'bb-search__button-icon-button-search-icon',
                        }}
                        startIcon={<SearchIcon />}
                    ></Button>
                </div>
            </div>
        );
    }
}
