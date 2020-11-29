import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { IUserDocument } from '../../typings/documents';
import { UserCollection } from './Collections/UserCollection';

const firestore = admin.firestore();

export const onUserCreate = functions.auth.user().onCreate(async (user) => {
    const userCollection = new UserCollection();
    return await userCollection.createUser(user);
});

export async function createUser(
    user: admin.auth.UserRecord | { uid: string }
) {
    const newUser: IUserDocument = {
        name: (user as admin.auth.UserRecord)?.displayName ?? '',
        image: (user as admin.auth.UserRecord)?.photoURL ?? '',
        email: (user as admin.auth.UserRecord)?.email ?? '',
        reviews: [],
        favoriteGroups: {},
        businesses: {},
        createdAt: Number(new Date()),
    };

    const exists = (await firestore.collection('user').doc(user.uid).get())
        .exists;

    if (exists) {
        throw new functions.https.HttpsError(
            'already-exists',
            `Failed to create new user because uid already exists ${user.uid}: ${user}`
        );
    }

    return await firestore.collection('user').doc(user.uid).set(newUser);
}
