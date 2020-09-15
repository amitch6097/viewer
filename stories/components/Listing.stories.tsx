import React from 'react';
import {
    Listing,
    ListingTitleCard,
    ListingAbout,
    ListingOwners,
    ListingActions,
    ListingReviews,
} from '../../src/components/Listing';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { BUSINESS_DATA } from '../../__mock__/business-data';
import { REVIEWS_DATA } from '../../__mock__/reviews-data';
export default {
    title: 'Components|Listing',
    component: Listing,
    decorators: [withKnobs],
};

export const ListingStory = () => (
    <Listing
        isFavorited={false}
        onToggleFavorite={console.log}
        id={'1'}
        onLoadMoreReviews={console.log}
        business={BUSINESS_DATA}
        reviews={{
            businessId: '1',
            reviews: REVIEWS_DATA,
            count: 3,
        }}
    />
);

export const ListingTitleCardStory = () => (
    <ListingTitleCard id={'1'} business={BUSINESS_DATA} />
);

export const ListingAboutStory = () => (
    <ListingAbout business={BUSINESS_DATA} />
);

export const ListingOwnersStory = () => (
    <ListingOwners business={BUSINESS_DATA} />
);

export const ListingActionsStory = () => (
    <ListingActions business={BUSINESS_DATA} />
);

export const ListingReviewsStory = () => (
    <ListingReviews
        onLoadMoreReviews={console.log}
        reviews={{
            businessId: '1',
            reviews: REVIEWS_DATA,
            count: 3,
        }}
    />
);
