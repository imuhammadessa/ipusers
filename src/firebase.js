// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYUqAw0Z_Ub-kmZuG0hxSeaYroeO0RN7Q",
  authDomain: "ip4thall.firebaseapp.com",
  projectId: "ip4thall",
  storageBucket: "ip4thall.firebasestorage.app",
  messagingSenderId: "928763576091",
  appId: "1:928763576091:web:703599b4cb0bc281945dbe",
  measurementId: "G-TCVP9L7NWP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
