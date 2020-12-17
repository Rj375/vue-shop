import firebase from '@firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-auth'
import 'firebase/storage'

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var config = {
    apiKey: "AIzaSyDW62mKUP1HRt2BkpqBw9majgB511G_nuI",
    authDomain: "vue-shop-41136.firebaseapp.com",
    databaseURL: "https://vue-shop-41136.firebaseio.com",
    projectId: "vue-shop-41136",
    storageBucket: "vue-shop-41136.appspot.com",
    messagingSenderId: "514634060513",
    appId: "1:514634060513:web:e47681e9c1621bd77b9da0",
    measurementId: "G-P120VDHW26"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(config);
  const db = firebase.firestore();
  

  export {fb, db}

  