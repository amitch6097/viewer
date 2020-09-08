import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

import { onBusinessCreated, createBusiness } from './createBusiness';
import { onReviewCreated, createReview } from './createReview';
import { favoriteBusiness } from './favoriteBusiness';

export {
    onBusinessCreated,
    createBusiness,
    onReviewCreated,
    createReview,
    favoriteBusiness,
};
