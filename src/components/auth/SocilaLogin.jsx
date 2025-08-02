import React from "react";
import UseAuth from "../../hooks/UseAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxios from "../../hooks/UseAxios";

const SocilaLogin = () => {
  const { googleRegister, setLoading } = UseAuth();
  const location = useLocation();
  const redirect = location.state?.from.pathname || "/";

  const navigate = useNavigate();
  const useAxios = UseAxios();
  const handleGoogleLogin = async () => {
    try {
      const res = await googleRegister();
      const user = res?.user;

      const userToSave = {
        name: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
        //  Admin  Trainer  Member (default)
        // role: "Admin",
        // role: "Trainer",
        role: "member",
      };

      // Save user to server
      await useAxios
        .post("/user", userToSave)
        .then(() => {
          console.log("User saved successfully.");
        })
        .catch((error) => {
          if (error.response?.status === 409) {
            console.log("User already exists, skipping save.");
          } else {
            console.error("Failed to save user:", error.message);
          }
        });

      // Success Login Message
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your account has been logged in",
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(true);
      navigate(redirect);
    } catch (error) {
      console.error("Google login failed:", error.message);
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: error.message,
      });
    }
  };
  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full mb-4"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default SocilaLogin;
