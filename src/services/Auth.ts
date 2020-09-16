import * as firebase from 'firebase';

export class Auth {

    static async subscribeOnAuthChange(fn: any) {
        firebase.auth().onAuthStateChanged(fn);
    }

    static async signOut() {
        try {
            await firebase.auth().signOut();
            // history.goToHome();
        } catch (err) {
            console.warn(`Error Login out! ${err}`);
        }
    }

    static getCurrentUserId(): string {
        return firebase.auth()?.currentUser?.uid;
    }

    static async isLoggedIn(): Promise<Boolean> {
        return Boolean(firebase.auth().currentUser);
    }

    static async signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        try {
            const result = await firebase.auth().signInWithPopup(provider);

            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                //@ts-ignore
                const token = result.credential.accessToken;
                // ...
                console.log(token);
            }
            // The signed-in user info.
            const user = result.user;
            console.log(user);
        } catch (err) {
            // Handle Errors here.
            const errorCode = err.code;
            const errorMessage = err.message;
            // The email of the user's account used.
            const email = err.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = err.credential;
            // ...
            console.warn(errorCode, errorMessage, email, credential);
        }
    }
}
