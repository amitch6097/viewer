import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ResultActions } from 'src/components/Result/Result';
import { API } from '../../services';
import { MyBusinessesView } from './MyBusinessesView';

export interface IMyBusinessesContainerProps {}

async function fetchMyBusinesses(setMyBusinesses) {
    const businesses = await API.getMyBusinesses({});
    setMyBusinesses(businesses);
}

export function MyBusinessesContainer(props: IMyBusinessesContainerProps) {
    const history = useHistory();
    const [businesses, setMyBusinesses] = React.useState(undefined);
    useEffect(() => {
        fetchMyBusinesses(setMyBusinesses);
    }, []);

    async function onClickBusiness(businessId: string) {
        history.push(`/business/${businessId}`);
    }

    function onClickAction(action: keyof ResultActions, businessId: string) {
        if (action === 'flags') {
            history.push(`/business/${businessId}/flags`);
        } else if (action === 'updateRequests') {
            history.push(`/business/${businessId}/update-requests`);
        }
    }

    return (
        <MyBusinessesView
            businesses={businesses}
            onClickBusiness={onClickBusiness}
            onClickAction={onClickAction}
        />
    );
}
