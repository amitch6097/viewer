import * as firebase from 'firebase';

export class Auth {
    static currentUser() {
        return firebase.auth().currentUser;
    }

    static async subscribeOnAuthChange(fn: any) {
        firebase.auth().onAuthStateChanged(fn);
    }

    static async isPhoneNumberAlreadyCredential(phoneNumber) {
        return firebase.auth().getUserByPhoneNumber(phoneNumber)
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

    static async linkPhone() {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        firebase
            .auth()
            .currentUser.linkWithPopup(phoneProvider)
            .then(function (result) {
                console.warn(result);
                // Accounts successfully linked.
                var credential = result.credential;
                var user = result.user;
                // ...
            })
            .catch(function (error) {
                console.warn(error);
                // Handle Errors here.
                // ...
            });
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

    static async linkPhoneNumber(phoneNumber: string) {
        try {
            const prevUser = Auth.currentUser();
            //@ts-ignore
            var appVerifier = window.recaptchaVerifier;
            const confirmationResult = await firebase
                .auth()
                .signInWithPhoneNumber(phoneNumber, appVerifier);

            //@ts-ignore
            window.confirmationResult = confirmationResult
            return async (code: string) => {
                try {
                    //@ts-ignore
                    const credential = firebase.auth.PhoneAuthProvider.credential(window.confirmationResult.verificationId, code);
                    // const result = await window.confirmationResult.confirm(code);
                    const linkResult = await prevUser.linkWithCredential(
                        credential
                    );
                    const signInResult = await firebase
                        .auth()
                        .signInWithCredential(linkResult.credential);
                    console.log(
                        'Confirmed Phone',
                        signInResult,
                        signInResult.user
                    );
                    return true;
                } catch (err) {
                    console.warn(err);
                    return false;
                }
            };
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
}
