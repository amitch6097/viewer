import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyABgGXbyhPjO2Hy9mgdGkJO3qABL0V8ZaE',
    authDomain: 'common-good-68b0b.firebaseapp.com',
    databaseURL: 'https://common-good-68b0b.firebaseio.com',
    projectId: 'common-good-68b0b',
    storageBucket: 'common-good-68b0b.appspot.com',
    messagingSenderId: '751114446527',
    appId: '1:751114446527:web:ab04adf231952a85de480a',
    measurementId: 'G-GHD5HXYPFC',
};

const fb = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();


//@ts-ignore
window.__firebase = fb

export default fb;


/**
 * Firebase console helpers
 * - Get UserId
 * fb.auth().currentUser.uid
 * - Get Business Document 
 * fb.database().ref('/business/' + "ux1sAyjkyNoKT7jdMxD5").once('value').then(function(snapshot) { console.log(snapshot.val() && snapshot.val()) })
 */
