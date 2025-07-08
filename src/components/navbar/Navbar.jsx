import React from "react";
import { Link } from "react-router-dom";
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../../../firebase.init";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";

const Navbar = () => {
  const { user } = UseAuth();
  console.log(user);

  // user logout
  const handleLogout = () => {
    firebaseSignOut(auth)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Sign-out successful",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className="bg-white text-black sticky top-0 shadow-md w-full z-50">
      <div className="navbar max-w-7xl mx-auto px-4 py-3 flex justify-between items-center font-Roboto">
        {/* Left: Logo */}
        <div className="flex-1">
          <Link to="/" className="text-2xl font-bold text-primary">
            FitTrack
          </Link>
        </div>

        {/* Middle: Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-primary transition-all">
            Home
          </Link>
          <Link to="/trainers" className="hover:text-primary transition-all">
            All Trainers
          </Link>
          <Link to="/classes" className="hover:text-primary transition-all">
            All Classes
          </Link>
          <Link to="/community" className="hover:text-primary transition-all">
            Community
          </Link>

          {user && (
            <Link to="/dashboard" className="hover:text-primary transition-all">
              Dashboard
            </Link>
          )}
        </div>

        {/* Right: Auth + Profile */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-sm rounded-2xl bg-black text-white px-4 ml-2"
              >
                Logout
              </button>
              <div className="w-16 h-16 rounded-full  p-1 shadow-md">
                <img
                  src={user?.photoURL}
                  alt="User-Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-outline btn-sm rounded-2xl bg-black text-white px-6 ml-2 font-bold"
              >
                Login
              </Link>
             
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
