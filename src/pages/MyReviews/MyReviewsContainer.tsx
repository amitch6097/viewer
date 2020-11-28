import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { API } from '../../services';
import { MyReviewsView } from './MyReviewsView';

export interface IMyBusinessesContainerProps {}

async function fetchMyReviews(setMyReviews) {
    const businesses = await API.getMyReviews({});
    setMyReviews(businesses);
}

export function MyReviewsContainer(props: IMyBusinessesContainerProps) {
    const history = useHistory();
    const [businesses, setMyReviews] = React.useState(undefined);
    useEffect(() => {
        fetchMyReviews(setMyReviews);
    }, []);

    async function onClickReview(businessId: string) {
        history.push(`/business/${businessId}`);
    }

    return (
        <MyReviewsView
            reviews={businesses}
            onClickReview={onClickReview}
        />
    );
}
