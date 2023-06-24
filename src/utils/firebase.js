// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABB2jebWD-Pr1d4ZJyhx9BKTaTYg4nUFQ",
  authDomain: "journey-sick-390710.firebaseapp.com",
  projectId: "journey-sick-390710",
  storageBucket: "journey-sick-390710.appspot.com",
  messagingSenderId: "763140578495",
  appId: "1:763140578495:web:3f079e38b6121c350dfa0a",
  measurementId: "G-XS5BZHBGWT"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const google = new GoogleAuthProvider();
export const facebook = new FacebookAuthProvider();
export const twitter = new TwitterAuthProvider();