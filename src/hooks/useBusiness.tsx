import React, { useEffect } from 'react';
import { Business } from '../lib/Business';
import { API } from '../services';


async function fetchBusiness(businessId: string, setBusiness: (business: Business) => void) {
    const business = await API.getBusiness(businessId);
    setBusiness(business)
}

export function useBusiness(businessId: string) {

    const [business, setBusiness] = React.useState(undefined) 

    useEffect(() => {
        if(businessId) {
            fetchBusiness(businessId, setBusiness);
        } else {
            setBusiness(undefined);
        }
    }, [businessId]);

    return business;

}
