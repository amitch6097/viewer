import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const firestore = admin.firestore();
import { IUserDocument } from '../../typings/types';

export const onUserCreate = functions.auth.user().onCreate(async (user) => {
    return await createUser(user);
});

export async function getOrCreateUserDocument(uid: string): Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>> {
    let userDoc = await firestore
        .collection('user')
        .doc(uid).get();

    if (!userDoc.exists) {
        await createUser({
            uid
        });
        userDoc = await firestore
            .collection('user')
            .doc(uid)
            .get()
    }
    return userDoc;
}

export async function createUser(
    user: admin.auth.UserRecord | { uid: string }
) {
    const newUser: IUserDocument = {
        name: (user as admin.auth.UserRecord)?.displayName ?? '',
        image: (user as admin.auth.UserRecord)?.photoURL ?? '',
        email: (user as admin.auth.UserRecord)?.email ?? '',
        reviews: [],
        favorites: [],
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
