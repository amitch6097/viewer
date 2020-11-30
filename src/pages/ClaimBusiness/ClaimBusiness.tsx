import React, { useContext, useEffect } from 'react';
import { ClaimBusinessContainer } from './ClaimBusinessContainer';
import { BusinessContext } from '../../context/BusinessContext';
import { useHistory } from 'react-router-dom';

export function ClaimBusiness(props) {
    const businessId = props.match.params.businessId;
    const history = useHistory();
    const { business, fetchBusinessId } = useContext(BusinessContext);

    useEffect(() => {
        fetchBusinessId(businessId);
    }, [props.businessId]);

    async function goToMyBusiness() {
        history.push(`/#/my-businesses`);
    }

    return (
        <ClaimBusinessContainer
            business={business}
            businessId={businessId}
            goToMyBusiness={goToMyBusiness}
        />
    );
}
