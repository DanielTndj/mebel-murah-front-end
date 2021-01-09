import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGlwQNTHjMM6Qgl-1hD5U9Yjyzs4nxybU",
  authDomain: "mebel-murah-ecommerce.firebaseapp.com",
  projectId: "mebel-murah-ecommerce",
  storageBucket: "mebel-murah-ecommerce.appspot.com",
  messagingSenderId: "926842887635",
  appId: "1:926842887635:web:ffd0343bb0dab953bb2326",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
