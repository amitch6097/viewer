import React from 'react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { CreateReviewView } from '../../src/pages/CreateReview';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

export default {
    title: 'Pages|CreateReviewView',
    component: CreateReviewView,
    decorators: [withKnobs],
};

export const CreateReviewViewStory = () => (
    <CreateReviewView
        onSubmitReview={console.log}
        businessName={'Pizza Hut'}
        businessId={'12345'}
    />
);
