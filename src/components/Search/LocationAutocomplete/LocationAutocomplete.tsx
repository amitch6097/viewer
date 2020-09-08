import React, { Component } from 'react';
import './LocationAutocomplete.less';
import { LocationAutocompleteView, ILocationAutocompleteViewProps } from './LocationAutocompleteView';

export interface ILocationAutocompleteProps extends ILocationAutocompleteViewProps {
    className?: string;
}

export function LocationAutocomplete(props: ILocationAutocompleteProps) {
    return (
        <div className={`bb-location-autocomplete ${props.className || ''}`}>
            <LocationAutocompleteView {...props} />
        </div>
    );
}
