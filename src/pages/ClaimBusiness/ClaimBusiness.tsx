import React from 'react';
import { ClaimBusinessContainer } from './ClaimBusinessContainer';

export function ClaimBusiness(props) {
    return (
        <ClaimBusinessContainer businessId={props.match.params.businessId} />
    );
}
