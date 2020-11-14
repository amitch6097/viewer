import React from 'react';
import { UpdateBusinessContainer } from './UpdateBusinessContainer';

export function UpdateBusiness(props) {
    return (
        <UpdateBusinessContainer businessId={props.match.params.businessId} />
    );
}
