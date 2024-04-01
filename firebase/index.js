// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
// Required for side-effects
import {getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzvqccsYDyDu9bsGcHWIOXw1D0K0p0G7E",
  authDomain: "todo1-851d2.firebaseapp.com",
  projectId: "todo1-851d2",
  storageBucket: "todo1-851d2.appspot.com",
  messagingSenderId: "200545756487",
  appId: "1:200545756487:web:947d1347189dcdc59a5862"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db, getFirestore,collection, addDoc, getDocs, doc, updateDoc, deleteDoc};