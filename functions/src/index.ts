import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();
firestore.settings({ ignoreUndefinedProperties: true });

import { onBusinessCreated, createBusiness } from './createBusiness';
import { onReviewCreated, createReview } from './createReview';
import { onUserCreate } from './onUserCreate';
import { getBusinessesForFavoriteGroup } from './getBusinessesForFavoriteGroup';
import { getFavoriteGroups } from './getFavoriteGroups';
import { createFavoriteGroup } from './createFavoriteGroup';
import { setBusinessAsFavorite } from './setBusinessAsFavorite';
import { getFavoriteGroup } from './getFavoriteGroup';
import { onFlagCreated, createFlag } from './createFlag';
import {
    createBusinessUpdateRequest,
    onBusinessUpdateRequestCreated,
} from './createBusinessUpdateRequest';
import { updateBusinessUpdatedRequest } from './updateBusinessUpdatedRequest';

export {
    onBusinessCreated,
    createBusiness,
    onReviewCreated,
    createReview,
    onUserCreate,
    getBusinessesForFavoriteGroup,
    getFavoriteGroups,
    createFavoriteGroup,
    setBusinessAsFavorite,
    getFavoriteGroup,
    updateBusinessUpdatedRequest,
    createBusinessUpdateRequest,
    onBusinessUpdateRequestCreated,
    onFlagCreated,
    createFlag,
};
