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
  // state defined
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  SIGN IN GOOGLE
  const googleRegister = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // LOGIN GMAIL & PASSWORD
  const userLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  //   ACCOUNT CREATE EMAIL & PASSWORD
  const accountCreate = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        localStorage.setItem("user", JSON.stringify(false));
        setLogin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const [login, setLogin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLogin(JSON.parse(storedUser));
    } else {
      setLogin(false);
    }
  }, []);

  const userInfo = {
    name: "abulhasan",
    googleRegister,
    user,
    accountCreate,
    userLogin,
    loading,
    setLoading,
    login,
    setLogin,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
