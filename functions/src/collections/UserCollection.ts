import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Collection } from './Collection';
import { IUserDocument } from '../../../typings/documents';

export class UserCollection extends Collection {
    constructor() {
        super('user');
    }

    async getOrCreateUserData(uid: string): Promise<IUserDocument> {
        const document = await this.getOrCreateUserDocument(uid);
        return document.data() as IUserDocument;
    }

    async getOrCreateUserDocument(
        uid: string
    ): Promise<
        FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
    > {
        let userDoc = await this.collection.doc(uid).get();

        if (!userDoc.exists) {
            await this.createUser({
                uid,
            });
            userDoc = await this.collection.doc(uid).get();
        }
        return userDoc;
    }

    async addReview(uid: string, reviewId: string) {
        const userDoc = await this.getOrCreateUserDocument(uid);
        const writeResult = await userDoc.ref.update({
            reviews: admin.firestore.FieldValue.arrayUnion(
                reviewId
            ),
        });
        return writeResult.writeTime;
    }

    async updateUser({
        uid,
        document,
    }: {
        uid: string;
        document: Partial<IUserDocument>;
    }): Promise<FirebaseFirestore.WriteResult> {
        return await this.collection.doc(uid).update(document);
    }

    async createUser(
        user: admin.auth.UserRecord | { uid: string }
    ): Promise<FirebaseFirestore.WriteResult> {
        const newUser: IUserDocument = {
            name: (user as admin.auth.UserRecord)?.displayName ?? '',
            image: (user as admin.auth.UserRecord)?.photoURL ?? '',
            email: (user as admin.auth.UserRecord)?.email ?? '',
            reviews: [],
            favoriteGroups: {},
            businesses: {},
            createdAt: Number(new Date()),
        };

        const exists = (await this.collection.doc(user.uid).get()).exists;

        if (exists) {
            throw new functions.https.HttpsError(
                'already-exists',
                `Failed to create new user because uid already exists ${user.uid}: ${user}`
            );
        }

        return await this.collection.doc(user.uid).set(newUser);
    }
}
