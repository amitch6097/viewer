import React, { Component } from 'react';
import './Search.less';

import algoliasearch from 'algoliasearch/lite';

import { BusinessAutocomplete } from './BusinessAutocomplete';
import { LocationAutocomplete } from './LocationAutocomplete';

import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, useTheme } from '@material-ui/core/styles';

export interface ISearchProps {
    onSearch?: () => void;
    onChangeBusiness: (value: string) => void;
    onChangeLocationValue: (value: string) => void;
    onChangeLocationSuggestion: (suggestion: any) => void;
    locationValue?: string;
    businessValue?: string;
}

export function Search({
    onChangeBusiness,
    onChangeLocationSuggestion,
    onChangeLocationValue,
    onSearch,
    locationValue,
    businessValue
}: ISearchProps) {
    return (
        <div className="bb-search">
            <div className="bb-search__inputs">
                <div className="bb-search__inputs-find">
                    <label className="bb-search__inputs-label">Find</label>
                    <BusinessAutocomplete
                        onChange={onChangeBusiness}
                        onClear={() => onChangeBusiness('')}
                        disable={true}
                        value={businessValue}
                    />
                </div>
                <div className="bb-search__inputs-location">
                    <label className="bb-search__inputs-label">Near</label>
                    <LocationAutocomplete
                        onChange={onChangeLocationValue}
                        onClear={() => onChangeLocationSuggestion(undefined)}
                        onClickSuggestion={onChangeLocationSuggestion}
                        placeholder={'Where are we going?'}
                        useTextField={false}
                        value={locationValue}
                    />
                </div>
            </div>
            <div className="bb-search__button">
                <Button
                    onClick={onSearch}
                    variant="contained"
                    color="primary"
                    size="large"
                    className="bb-search__button-icon-button"
                    classes={{
                        startIcon: 'bb-search__button-icon-button-search-icon',
                    }}
                    startIcon={<SearchIcon />}
                ></Button>
            </div>
        </div>
    );
}
