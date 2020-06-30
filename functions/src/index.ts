import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

export { onBusinessCreated, createBusiness } from './createBusiness';
export { getBusiness } from './getBusiness';
