import React from 'react';
import { Review, CreateReview } from '../../src/components/Review';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

export default {
    title: 'Components|Review',
    component: Review,
    decorators: [withKnobs],
};

export const CreateReviewStory = () => (
    <CreateReview
        submitText={'Submit Review'}
        onSubmitReview={console.log}
        placeholder={'placeholder'}
    />
);

export const ReviewStory = () => (
    <Review
        review={{
            text: 'Review Text',
            rating: 5,
            businessId: '1',
            createdAt: 1599513644401,
            user: {
                name: 'Andrew Mitchell',
                email: 'andrew.mitchell@gmail.com',
            },
        }}
    />
);
