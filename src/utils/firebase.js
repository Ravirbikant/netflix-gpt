// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5U0FY4sVGHR_jvLIT1C_hh9va_Ks7x44",
  authDomain: "netflixgpt-47258.firebaseapp.com",
  projectId: "netflixgpt-47258",
  storageBucket: "netflixgpt-47258.appspot.com",
  messagingSenderId: "783872268497",
  appId: "1:783872268497:web:0c27e9b29d763f11fecdf0",
  measurementId: "G-MWW76EBF05",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
