// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdaiVtbRM3flTbIZXxs8hRaDnrN6_GBA4",
  authDomain: "vite-project-3e774.firebaseapp.com",
  projectId: "vite-project-3e774",
  storageBucket: "vite-project-3e774.appspot.com",
  messagingSenderId: "624902066823",
  appId: "1:624902066823:web:678025437f6c6dcb439e22",
  measurementId: "G-XVYZ85ERD3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// const analytics = getAnalytics(app);