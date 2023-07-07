// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwiE0hRd9bq6LwTxlpn-_phK04XngAKoM",
  authDomain: "journeysick-56add.firebaseapp.com",
  projectId: "journeysick-56add",
  storageBucket: "journeysick-56add.appspot.com",
  messagingSenderId: "71436326494",
  appId: "1:71436326494:web:3546f1f91b2c2f170e46cf",
  measurementId: "G-QVLQXKFFB5"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const google = new GoogleAuthProvider();
export const facebook = new FacebookAuthProvider();
export const twitter = new TwitterAuthProvider();