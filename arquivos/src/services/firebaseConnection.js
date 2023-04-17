import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyA9g1JdgAdfLf4mk6vJlq3qinYhU7YUSac",
    authDomain: "meuapp-3354a.firebaseapp.com",
    databaseURL: "https://meuapp-3354a.firebaseio.com",
    projectId: "meuapp-3354a",
    storageBucket: "meuapp-3354a.appspot.com",
    messagingSenderId: "842683957873",
    appId: "1:842683957873:web:1c1e69c05124d5de4b91d0",
    measurementId: "G-GFJBH5JB9B"
  };

 if(!firebase.apps.length){
     firebase.initializeApp(firebaseConfig);
 }

 export default firebase;