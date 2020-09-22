import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();
firestore.settings({ ignoreUndefinedProperties: true });

import { onBusinessCreated, createBusiness } from './createBusiness';
import { onReviewCreated, createReview } from './createReview';
import { favoriteBusiness } from './favoriteBusiness';
import { onUserCreate } from './onUserCreate';
import { unfavoriteBusiness } from './unfavoriteBusiness';
import { getUserFavorites } from './getUserFavorites';

export {
    onBusinessCreated,
    createBusiness,
    onReviewCreated,
    createReview,
    favoriteBusiness,
    unfavoriteBusiness,
    onUserCreate,
    getUserFavorites,
};
