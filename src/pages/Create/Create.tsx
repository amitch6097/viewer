import React from 'react';
import { useHistory } from 'react-router-dom';
import { CreateContainer } from './CreateContainer';
export interface ICreateProps {
    history: any;
}

export function Create() {
    const history = useHistory();

    async function goToBusiness(businessId: string) {
        history.push(`/business/${businessId}`);
    }

    return <CreateContainer goToBusiness={goToBusiness} />;
}
