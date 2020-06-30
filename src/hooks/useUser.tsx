import React from 'react';
import * as firebase from 'firebase';

export function useUser(): firebase.User {
    const [user, setUser] = React.useState(firebase.auth().currentUser);

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
        });
    }, []);

    return user;
}
