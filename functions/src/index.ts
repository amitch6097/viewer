import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

import { onBusinessCreated, createBusiness } from './createBusiness';
import { getBusiness } from './getBusiness';

export { getBusiness, onBusinessCreated, createBusiness };

export const x = () => {};
