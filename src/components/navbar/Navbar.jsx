import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../../../firebase.init";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const { user } = UseAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      })
      .catch((error) => console.log(error));
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white text-black sticky top-0 shadow-md w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center font-Roboto">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          FitTrack
        </Link>

        {/* Mobile Toggle Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden px-3 py-2 border rounded text-primary border-primary"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <IoMdClose size={24} /> : <GiHamburgerMenu size={24} />}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>
          <Link to="/trainers" className="hover:text-primary transition">
            All Trainers
          </Link>
          <Link to="/classes" className="hover:text-primary transition">
            All Classes
          </Link>
          <Link to="/forum" className="hover:text-primary transition">
            Forums
          </Link>
          {user && (
            <Link to="/dashboard" className="hover:text-primary transition">
              Dashboard
            </Link>
          )}
          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="btn btn-sm bg-black text-white rounded-2xl px-4"
              >
                Logout
              </button>
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary shadow-md">
                <img
                  src={user.photoURL || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-sm bg-black text-white rounded-2xl px-6 font-bold"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col bg-white h-screen px-4 pt-4">
          {/* Profile */}
          {user && (
            <div className="w-full flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                <img
                  src={user.photoURL || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-col gap-3">
            <Link
              to="/"
              onClick={toggleMenu}
              className="py-2 hover:text-primary"
            >
              Home
            </Link>
            <Link
              to="/trainers"
              onClick={toggleMenu}
              className="py-2 hover:text-primary"
            >
              All Trainers
            </Link>
            <Link
              to="/classes"
              onClick={toggleMenu}
              className="py-2 hover:text-primary"
            >
              All Classes
            </Link>
            <Link
              to="/forum"
              onClick={toggleMenu}
              className="py-2 hover:text-primary"
            >
              Forums
            </Link>
            {user && (
              <Link
                to="/dashboard"
                onClick={toggleMenu}
                className="py-2 hover:text-primary"
              >
                Dashboard
              </Link>
            )}
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="btn btn-sm bg-black text-white rounded-2xl w-full"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={toggleMenu}
                className="btn btn-sm bg-black text-white rounded-2xl w-full text-center font-bold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
