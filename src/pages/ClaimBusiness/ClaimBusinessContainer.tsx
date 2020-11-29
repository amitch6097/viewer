
import React, { useEffect, useContext } from 'react';
import { API } from '../../services';
import { BusinessContext } from '../../context/BusinessContext';
import { IInfoStepState } from '../Create/Steps/InfoStep';
import { ClaimBusinessView } from './ClaimBusinessView';
import { useHistory } from "react-router-dom";

export interface IClaimBusinessContainerProps {
    businessId: string;
}

export function ClaimBusinessContainer(props: IClaimBusinessContainerProps) {
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

    async function onClaimWithPhone() {
        await API.linkPhone();
        
    }

    return <ClaimBusinessView business={business} onClaimWithPhone={onClaimWithPhone}/>

}