
import React, { useEffect, useContext } from 'react';
import { API } from '../../services';
import { BusinessContext } from '../../context/BusinessContext';
import { IInfoStepState } from '../Create/Steps/InfoStep';
import { UpdateBusinessView } from './UpdateBusinessView';
import { useHistory } from "react-router-dom";

export interface IUpdateBusinessContainerProps {
    businessId: string;
}

export function UpdateBusinessContainer(props: IUpdateBusinessContainerProps) {
    const history = useHistory();
    const {business, fetchBusinessId} = useContext(BusinessContext);

    useEffect(() => {
        fetchBusinessId(props.businessId);
    }, [props.businessId])

    async function onSubmit(updateProperties: IInfoStepState) {
        await API.createBusinessUpdateRequest({
            businessId: props.businessId,
            updateProperties
        });
        history.push(`/business/${props.businessId}`)
    }

    return <UpdateBusinessView businessName={business.name} onSubmit={onSubmit}/>

}