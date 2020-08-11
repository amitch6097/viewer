import React from 'react';
import './Discover.less';
import { strings } from '../../strings';

import { Search } from '../../components/Search';
import { EIdentify, IIdentify, IBusinessListing } from 'typings/types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Select } from '../../components/Select';
import { getCategories } from '../../helpers';

import { Result } from '../../components/Result';

export interface IDiscoverViewProps {
    onChangeFilterSelected: (key: EIdentify, selected: boolean) => void;
    onChangeLocationSuggestion: (locationSuggestion: any) => void;
    onChangeSearchValue: (value: string) => void;
    onSearch: () => void;
    onChangeCategory: (category: string) => void;
    onClickBusiness: (id: string) => void;

    results: Record<string, IBusinessListing>;
    filters: Record<EIdentify, boolean>;
    category: string;
    locationValue: string;
    businessValue: string;
}

export function DiscoverView(props: IDiscoverViewProps) {
    return (
        <div className="bb-pages bb-pages-discover">
            <div className="bb-pages-discover__header">
                <Search
                    onChangeBusiness={props.onChangeSearchValue}
                    onChangeLocationSuggestion={
                        props.onChangeLocationSuggestion
                    }
                    onSearch={props.onSearch}
                    businessValue={props.businessValue}
                    locationValue={props.locationValue}
                />
            </div>
            <div className="bb-pages-discover__content">
                <div className="bb-pages-discover__content__filter">
                    <h2>Filters</h2>
                    <div className="bb-pages-discover__content__filters">
                        {Object.keys(props.filters).map((key) => {
                            const selected = props.filters[key];
                            return (
                                <div
                                    key={key}
                                    className="bb-pages-discover__content__filter__filters__filter"
                                >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selected}
                                                onChange={() =>
                                                    props.onChangeFilterSelected(
                                                        key as EIdentify,
                                                        !selected
                                                    )
                                                }
                                                name={key}
                                                color="primary"
                                            />
                                        }
                                        label={strings.filters[key].label}
                                    />
                                </div>
                            );
                        })}
                        <Select
                            className={
                                'bb-pages-discover__content__filters__category'
                            }
                            withNoSelection={true}
                            value={props.category}
                            label={strings.create.info.labels.category}
                            onChange={props.onChangeCategory}
                            options={getCategories()}
                        />
                    </div>
                </div>
                <div className="bb-pages-discover__content__results">
                    {Object.keys(props.results).map((id) => {
                        return (
                            <div
                                key={id}
                                className="bb-pages-discover__content__results"
                            >
                                <Result
                                    onClick={() => props.onClickBusiness(id)}
                                    business={props.results[id]}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
