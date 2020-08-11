import * as firebase from 'firebase';

export class FBStorage {
    static async uploadImage({
        blob,
        businessGUID,
        id,
    }: {
        blob: Blob;
        businessGUID: string;
        id: string;
    }) {
        const response = await firebase
            .storage()
            .ref()
            .child('images')
            .child(businessGUID)
            .child(id)
            .put(blob);

        const url = await response.ref.getDownloadURL();
        return url;
    }
}
