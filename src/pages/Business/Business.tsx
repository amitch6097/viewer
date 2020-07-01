import React from 'react';
import { BusinessContainer } from './BusinessContainer';

export function Business(props) {
    return <BusinessContainer id={props.match.params.id} />;
}
