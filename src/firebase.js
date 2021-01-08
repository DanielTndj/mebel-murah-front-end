import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFkK_PQGYhziHBKaORVHoXb_C0k7E_LQg",
  authDomain: "ecommerce-ba87c.firebaseapp.com",
  projectId: "ecommerce-ba87c",
  storageBucket: "ecommerce-ba87c.appspot.com",
  messagingSenderId: "681070230009",
  appId: "1:681070230009:web:92bdb1ee62ac8683512528",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
