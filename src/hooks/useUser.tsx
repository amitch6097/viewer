import React from 'react';
import * as firebase from 'firebase';
import { API } from '../services';
import { IUser } from 'typings/types';

export function useUser(): IUser | undefined {
    const [user, setUser] = React.useState(undefined);

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            API.getMyUser().then(setUser);
        });
        API.getMyUser().then(setUser);
    }, []);

    return user;
}
