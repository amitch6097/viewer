import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { generateGUID } from '../../../helpers';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const searchClient = algoliasearch(
    'MQBBVGG94P',
    'd68c847f05c3ef5ddce1b1890080a35b'
);

export interface IBusinessAutocompleteProps {
    onChange?: (value: string) => void;
    onClickSuggestion?: (event: any) => void;
    onClear?: () => void;
    refine: (props: any, searchState?: any, nextValue?: any) => any;
    currentRefinement: any;
    hits: any;
    disable?: boolean;
    value?: string;
}

export class BusinessAutocompleteView extends Component<
    IBusinessAutocompleteProps
> {
    constructor(props: IBusinessAutocompleteProps) {
        super(props);
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (this.props.onChange) {
            this.props.onChange(event.target.value);
        }
    };

    onClickSuggestion = (event: React.ChangeEvent<HTMLInputElement>) => {
        const index = event.currentTarget.value;
        if(index === "" && this.props.onClear) {
            this.onClear();
        }
        if (this.props.onChange && this.props.onClickSuggestion) {
            const suggestion = this.props.hits[index];
            this.props.onClickSuggestion(suggestion);
        }
        return this.props.refine(index);
    };

    onClear = () => {
        if (this.props.onClear) {
            this.props.onClear();
        }
    };

    render() {
        return (
            <div className="bb-business-autocomplete-view">
                <Autocomplete
                    options={this.props.disable ? [] : this.props.hits}
                    value={this.props.currentRefinement || ''}
                    freeSolo
                    onChange={this.onClickSuggestion}
                    getOptionLabel={(option) => {
                        return option?.data?.name || this.props.value;
                    }}
                    renderInput={(params) => (
                        <TextField
                            classes={{
                                root: 'bb-business-autocomplete-view__input',
                            }}
                            onChange={this.onChange}
                            {...params}
                            variant="outlined"
                            value={this.props.value}
                        />
                    )}
                />
            </div>
        );
    }
}
