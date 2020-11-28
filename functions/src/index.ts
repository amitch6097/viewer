import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();
firestore.settings({ ignoreUndefinedProperties: true });

import { onBusinessCreated, createBusiness } from './createBusiness';
import { createReview } from './createReview';
import { onUserCreate } from './onUserCreate';
import { getBusinessesForFavoriteGroup } from './getBusinessesForFavoriteGroup';
import { getFavoriteGroups } from './getFavoriteGroups';
import { createFavoriteGroup } from './createFavoriteGroup';
import { setBusinessAsFavorite } from './setBusinessAsFavorite';
import { getFavoriteGroup } from './getFavoriteGroup';
import { createFlag } from './createFlag';
import { createBusinessUpdateRequest } from './createBusinessUpdateRequest';
import { updateBusinessUpdatedRequest } from './updateBusinessUpdatedRequest';
import { getBusinessFlags } from './getBusinessFlags';
import { getBusinessUpdateRequests } from './getBusinessUpdateRequests';
import { getMyBusinesses } from './getMyBusinesses';
import { getMyReviews } from './getMyReviews';

export {
    onBusinessCreated,
    createBusiness,
    createReview,
    onUserCreate,
    getBusinessesForFavoriteGroup,
    getFavoriteGroups,
    createFavoriteGroup,
    setBusinessAsFavorite,
    getFavoriteGroup,
    updateBusinessUpdatedRequest,
    createBusinessUpdateRequest,
    createFlag,
    getBusinessFlags,
    getBusinessUpdateRequests,
    getMyBusinesses,
    getMyReviews,
};
