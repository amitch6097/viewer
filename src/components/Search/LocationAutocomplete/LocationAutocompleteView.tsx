import React, { Component } from 'react';
import places from 'places.js';
import TextField from '@material-ui/core/TextField';

export interface ILocationAutocompleteViewProps {
    refine: (props: any, searchState?: any, nextValue?: any) => any;
    defaultRefinement: any;
    onChange?: (value: string) => void;
    onClickSuggestion?: (event: any) => void;
    onClear?: () => void;
}

export class LocationAutocompleteView extends Component<
    ILocationAutocompleteViewProps
> {
    element: any;

    createRef = (c) => (this.element = c);

    componentDidMount() {
        const { refine, defaultRefinement } = this.props;

        const autocomplete = places({
            container: this.element,
            type: 'address',
        });

        autocomplete.on('change', (event) => {
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
        if (this.props.onChange) {
            this.props.onChange(event.target.value);
        }
    };

    render() {
        return (
            <div className="bb-location-autocomplete-view">
                <input
                    onChange={this.onChange}
                    ref={this.createRef}
                    id="address-input"
                    placeholder="Where are we going?"
                />
            </div>
        );
    }
}
