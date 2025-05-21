import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvQXEsEmobZcwIMXgoPqRBjXyhwZTo644",
  authDomain: "modern-app-edab0.firebaseapp.com",
  projectId: "modern-app-edab0",
  storageBucket: "modern-app-edab0.firebasestorage.app",
  messagingSenderId: "1007329929673",
  appId: "1:1007329929673:web:60adfc38edc6b28a882018",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
