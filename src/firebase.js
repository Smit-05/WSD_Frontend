// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQkuQ0nuNwg5u0znnUQqN5EIKTq0S0WwU",
  authDomain: "invmgmt-f366c.firebaseapp.com",
  projectId: "invmgmt-f366c",
  storageBucket: "invmgmt-f366c.appspot.com",
  messagingSenderId: "574163135352",
  appId: "1:574163135352:web:2021911f218151e2f1368d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);