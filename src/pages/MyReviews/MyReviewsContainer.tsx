import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { API } from '../../services';
import { MyReviewsView } from './MyReviewsView';


async function fetchMyReviews(setMyReviews) {
    const businesses = await API.getMyReviews({});
    setMyReviews(businesses);
}

export function MyReviewsContainer() {
    const history = useHistory();
    const [reviews, setMyReviews] = React.useState(undefined);
    useEffect(() => {
        fetchMyReviews(setMyReviews);
    }, []);

    async function handleClickReview(businessId: string) {
        history.push(`/business/${businessId}`);
    }

    async function handleDeleteReview(reviewId: string) {
        const index = reviews?.findIndex((review) => reviewId === review.id);
        if(index >= 0) {
            const nextReviews = [
                ...reviews.slice(0, index),
                ...reviews.slice(index + 1, reviews.length),
            ];
            setMyReviews(nextReviews);
            await API.deleteMyReview(reviewId);
        }
    }

    return (
        <MyReviewsView
            reviews={reviews}
            onClickReview={handleClickReview}
            onDeleteReview={handleDeleteReview}
        />
    );
}
