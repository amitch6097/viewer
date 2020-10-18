import * as admin from 'firebase-admin';

export abstract class Collection {
    protected collection: FirebaseFirestore.CollectionReference<
        FirebaseFirestore.DocumentData
    >;

    constructor(collectionId: string) {
        const firestore = admin.firestore();
        this.collection = firestore.collection(collectionId);
    }

    async delete(id: string) {
        await this.collection.doc(id).delete();
    }

    async getData(id: string) {
        const document = await this.getDocument(id);
        return document
            ? {
                  id: document.id,
                  ...document.data(),
              }
            : undefined;
    }

    async deleteDocument(id: string) {
        return await this.collection.doc(id).delete();
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
                return {
                    id: snapshot.id,
                    ...snapshot.data(),
                };
            }
        );
        return favoriteGroups;
    }
}
