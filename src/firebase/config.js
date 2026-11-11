import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDZZXtdTF4qfuFsdyLboHUDCH4cyXxhBxY",
  authDomain: "tdm-proyecto-parte2.firebaseapp.com",
  projectId: "tdm-proyecto-parte2",
  storageBucket: "tdm-proyecto-parte2.firebasestorage.app",
  messagingSenderId: "1038358148936",
  appId: "1:1038358148936:web:394659f5572820427a657d"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();