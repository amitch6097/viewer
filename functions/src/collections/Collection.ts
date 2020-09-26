import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const firestore = admin.firestore();

export abstract class Collection {
    protected collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

    constructor(collectionId: string) {
        this.collection = firestore.collection(collectionId);
    }

    async getData(id: string) {
        const document = await this.getDocument(id);
        return document ? document.data() : undefined;
    }

    async getDocument(id: string) {
        const document = await this.collection.doc(id).get();
        if (document.exists) {
            return document;
        } else {
            return undefined;
        }
    }

    async updateDocument(id: string) {
        return this.collection.doc(id).get();
    }

    async getAll(ids: string[]) {
        const favoriteGroupSnapshots = await Promise.all(
            ids.map((id: string) => {
                return this.collection.doc(id).get();
            })
        );
        const favoriteGroups = favoriteGroupSnapshots.map(
            (
                snapshot: FirebaseFirestore.DocumentSnapshot<
                    FirebaseFirestore.DocumentData
                >
            ) => {
                return snapshot.data();
            }
        );
        return favoriteGroups;
    }
}