import React from 'react';
import { useBusiness } from '../hooks/useBusiness';
import { Business } from '../lib/Business';

export const BusinessContext = React.createContext({
    business: undefined,
    fetchBusinessId: (businessId: string) => {},
} as {
    business: Business;
    fetchBusinessId: (businessId: string) => void;
});

export interface IBusinessContextProvider {
    children: any;
}

export function BusinessContextProvider(props: IBusinessContextProvider) {
    const [businessIdState, setBusinessId] = React.useState(undefined);
    const business = useBusiness(businessIdState);

    function fetchBusinessId(businessId: string) {
        if (businessIdState !== businessId) {
            setBusinessId(businessId)
        }
    }

    return (
        <BusinessContext.Provider
            value={{ business, fetchBusinessId }}
        >
            {props.children}
        </BusinessContext.Provider>
    );
}
