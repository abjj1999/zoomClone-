// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { collection ,getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqN8VuRBUe18u8R1jItjqNL7lntWE9R58",
  authDomain: "zoom-clone-520e9.firebaseapp.com",
  projectId: "zoom-clone-520e9",
  storageBucket: "zoom-clone-520e9.appspot.com",
  messagingSenderId: "369304300535",
  appId: "1:369304300535:web:301151eda2407d80a0dcf2",
  measurementId: "G-4GSWZVGQFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app)
export const firestoneDB = getFirestore(app)


export const userRef = collection(firestoneDB, "users")