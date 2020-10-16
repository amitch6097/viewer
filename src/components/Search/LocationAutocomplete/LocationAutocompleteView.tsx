import React, { Component } from 'react';
import places from 'places.js';
import TextField from '@material-ui/core/TextField';
import { IAlgoliaLocationSearchEvent } from '../../../../typings/algolia';

export interface ILocationAutocompleteViewProps {
    onChange?: (value: string) => void;
    onClickSuggestion?: (event: IAlgoliaLocationSearchEvent) => void;
    onClear?: () => void;
    useTextField?: boolean;
    label?: string;
    placeholder?: string;
    value?:string;
    cityResultsOnly?: boolean;
    error?: boolean;
}

export class LocationAutocompleteView extends Component<
    ILocationAutocompleteViewProps
> {
    element: any;

    createRef = (c) => (this.element = c);

    componentDidMount() {
        const autocomplete = places({
            container: this.element,
            type: 'address',
        }).configure({
            countries: ['us'],
            language: 'en',
            postcodeSearch: true,
            type: this.props.cityResultsOnly ? 'city' : 'address'
        });

        autocomplete.on('autocomplete:updated', function(...args) {
            console.log("ARGS", args);
        });

        autocomplete.on('change', (event: IAlgoliaLocationSearchEvent) => {
            if (this.props.onClickSuggestion) {
                this.props.onClickSuggestion(event);
            }
        });

        autocomplete.on('clear', () => {
            if (this.props.onClear) {
                this.props.onClear();
            }
        });
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (this.props.onChange) {
            this.props.onChange(value)
        }
    };

    render() {
        return (
            <div className="bb-location-autocomplete-view">
                {this.props.useTextField ? (
                    <TextField
                        classes={{
                            root: 'bb-location-autocomplete-view__text-field',
                        }}
                        onChange={this.onChange}
                        inputRef={this.createRef}
                        id="address-input"
                        placeholder={this.props.placeholder}
                        label={this.props.label}
                        variant="outlined"
                        error={this.props.error}
                    />
                ) : (
                    <input
                        value={this.props.value}
                        onChange={this.onChange}
                        ref={this.createRef}
                        id="address-input"
                        placeholder={this.props.placeholder}
                    />
                )}
            </div>
        );
    }
}
