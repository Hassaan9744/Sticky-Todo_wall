// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// import { getDatabase } from "firebase/database";
// import {db} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbkFzBon4Tq5ctw471pO4lJLZY0wA44oA",
  authDomain: "sticky-todo-wall.firebaseapp.com",
  projectId: "sticky-todo-wall",
  storageBucket: "sticky-todo-wall.appspot.com",
  messagingSenderId: "772328671920",
  appId: "1:772328671920:web:97ecc3ddaca04e5cc40975",
  measurementId: "G-1Z2C0VW9GJ"

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);


