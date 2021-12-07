import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuEQ8P9mUkdZhilGtIvMWExFh6-cB2pCo",
  authDomain: "authentication-38c19.firebaseapp.com",
  projectId: "authentication-38c19",
  storageBucket: "authentication-38c19.appspot.com",
  messagingSenderId: "816903384378",
  appId: "1:816903384378:web:da8f2b286904aaf01bb403",
  measurementId: "G-YD6NTZNYDS"
};

// Initialize Firebase
let firebaseApp;
try {
  firebaseApp = getApp();
} catch (e) {
  firebaseApp = initializeApp(firebaseConfig);
}

const db = getFirestore(firebaseApp, {});
export { db, firebaseApp };
