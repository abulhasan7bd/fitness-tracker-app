import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD6oC86BTKnR5DtY4HiyO2KvsFxR-7i030",
  authDomain: "assignmet-12-5e8a8.firebaseapp.com",
  projectId: "assignmet-12-5e8a8",
  storageBucket: "assignmet-12-5e8a8.firebasestorage.app",
  messagingSenderId: "595856405978",
  appId: "1:595856405978:web:9b0d5c19681cbccb773ce3",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
