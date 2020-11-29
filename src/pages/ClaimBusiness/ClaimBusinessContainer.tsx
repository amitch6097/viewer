import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { BusinessContext } from '../../context/BusinessContext';
import { API } from '../../services';
import { ClaimBusinessView } from './ClaimBusinessView';

export interface IClaimBusinessContainerProps {
    businessId: string;
}

async function canUserClaimWithEmail(websiteRoot: string) {
    const user = await API.getMyUser();
    return Boolean(websiteRoot && user?.email?.indexOf(websiteRoot) > 0);
}

export function ClaimBusinessContainer(props: IClaimBusinessContainerProps) {
    const [canClaimWithEmail, setCanClaimWithEmail] = React.useState(false);
    const { business, fetchBusinessId } = useContext(BusinessContext);

    useEffect(() => {
        fetchBusinessId(props.businessId);
    }, [props.businessId]);

    useEffect(() => {
        if (business){
            canUserClaimWithEmail(business.websiteRoot).then((value: boolean) => {
                setCanClaimWithEmail(value);
            });
        }
    }, [business]);

    async function onClaimWithPhone() {
        await API.linkPhone();
    }

    async function onClaimWithEmail() {
        try {
            API.claimBusiness(props.businessId);
        } catch (err) {
            console.warn(err);
        }
    }

    return (
        <ClaimBusinessView
            business={business}
            onClaimWithPhone={onClaimWithPhone}
            canClaimWithEmail={canClaimWithEmail}
            onClaimWithEmail={onClaimWithEmail}
        />
    );
}
