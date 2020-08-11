import React, { Component } from 'react';
import places from 'places.js';
import TextField from '@material-ui/core/TextField';
import { IAlgoliaLocationSearchEvent } from '../../../../typings/algolia';

export interface ILocationAutocompleteViewProps {
    refine: (props: any, searchState?: any, nextValue?: any) => any;
    defaultRefinement: any;
    onChange?: (value: string) => void;
    onClickSuggestion?: (event: IAlgoliaLocationSearchEvent) => void;
    onClear?: () => void;
    useTextField?: boolean;
    label?: string;
    placeholder?: string;

    value?:string;
}

export class LocationAutocompleteView extends Component<
    ILocationAutocompleteViewProps
> {
    element: any;
    timeout: number;

    createRef = (c) => (this.element = c);

    componentDidMount() {
        const { refine, defaultRefinement } = this.props;

        const autocomplete = places({
            container: this.element,
            type: 'address',
        });

        autocomplete.on('change', (event: IAlgoliaLocationSearchEvent) => {
            if (this.props.onClickSuggestion) {
                this.props.onClickSuggestion(event);
            }
            refine(event.suggestion.latlng);
        });

        autocomplete.on('clear', () => {
            if (this.props.onClear) {
                this.props.onClear();
            }
            refine(defaultRefinement);
        });
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (this.props.onChange) {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            //@ts-ignore
            this.timeout = setTimeout(() => {
                this.props.onChange(value);
            }, 500);
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
