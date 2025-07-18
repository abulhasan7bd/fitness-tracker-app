import React from "react";
import { AuthContext } from "./AuthContext/";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./../../firebase.init";
import { useEffect } from "react";
import { useState } from "react";

const AuthProvider = ({ children }) => {
  // Define states for user
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to sign in with Google popup
  const googleRegister = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // Function to log in with email and password
  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Function to create an account with email and password
  const accountCreate = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Listen to Firebase auth state changes and update states accordingly
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        currentUser.getIdToken().then((token) => {
          localStorage.setItem("access-token", token);
        });
      } else {
        setUser(null);
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const userInfo = {
    owener: "abulhasan",
    googleRegister,
    user,
    accountCreate,
    userLogin,
    loading,
    setLoading,
  };

  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
