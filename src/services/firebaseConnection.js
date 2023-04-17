import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyC1Q7SI3biFGUIHZvaAg1n9_z6emmlbwNs",
    authDomain: "financeapp-9b980.firebaseapp.com",
    projectId: "financeapp-9b980",
    storageBucket: "financeapp-9b980.appspot.com",
    messagingSenderId: "526975788619",
    appId: "1:526975788619:web:efa303bd6d8ad84bd90fce"
};
  

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;