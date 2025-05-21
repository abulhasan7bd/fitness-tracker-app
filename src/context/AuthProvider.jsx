import React from "react";
import { AuthContext } from "./AuthContext/";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./../../firebase.init";
import { useEffect } from "react";
import { useState } from "react";
const AuthProvider = ({ children }) => {
  // state defined
  const [user, setUser] = useState(null);
  const [loading,setLoading]=useState(true)

  //  SIGN IN GOOGLE
  const googleRegister = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  //   REAL TIME USER HANDELING
  useEffect(() => {
    const currentUser = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          console.log(user);
        } else {
          console.log("Current User Signout");
          setUser(null)
        }
      });
    };
    return () => {
      currentUser();
    };
  }, []);

  const userInfo = { name: "abulhasan", googleRegister, user };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
