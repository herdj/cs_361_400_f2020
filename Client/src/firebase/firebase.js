import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const app = firebase.initializeApp({
    apiKey: "AIzaSyA88mr4D29tAeSgzRzMU-dl13bUQf7vRtU",
    authDomain: "expert-finder-293204.firebaseapp.com",
    databaseURL: "https://expert-finder-293204.firebaseio.com",
    projectId: "expert-finder-293204",
    storageBucket: "expert-finder-293204.appspot.com",
    messagingSenderId: "347191174905",
    appId: "1:347191174905:web:33e25969cb3cea02602428"
  })

  export const auth = app.auth();
  export const firestore = firebase.firestore();

  export default app;