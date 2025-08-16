import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../../../firebase.init";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import UseAdmin from "../../hooks/UseAdmin";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Navbar = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userInfo } = UseAdmin();
  const role_info = userInfo[0];
  console.log(role_info?.role);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

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
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav
      className="bg-gradient-to-r from-[#239BA7] via-[#7ADAA5] to-[#CADCAE] 
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                    text-white sticky top-0 shadow-md w-full z-50 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center font-Roboto">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-white dark:text-[#7ADAA5]"
        >
          FitTrack
        </Link>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="ml-4 p-2 rounded-full bg-white/20 dark:bg-gray-700 hover:scale-110 transition"
        >
          {theme === "dark" ? (
            <MdLightMode size={22} className="text-yellow-400" />
          ) : (
            <MdDarkMode size={22} className="text-gray-900" />
          )}
        </button>

        {/* Mobile Toggle Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden px-3 py-2 border rounded text-white dark:text-gray-200 border-white"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <IoMdClose size={24} /> : <GiHamburgerMenu size={24} />}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
          <Link
            to="/"
            className="hover:text-[#CADCAE] dark:hover:text-[#7ADAA5] transition"
          >
            Home
          </Link>
          <Link
            to="/trainers"
            className="hover:text-[#CADCAE] dark:hover:text-[#7ADAA5] transition"
          >
            All Trainers
          </Link>
          <Link
            to="/classes"
            className="hover:text-[#CADCAE] dark:hover:text-[#7ADAA5] transition"
          >
            All Classes
          </Link>
          <Link
            to="/forum"
            className="hover:text-[#CADCAE] dark:hover:text-[#7ADAA5] transition"
          >
            Forums
          </Link>

          {user && (
            <Link
              to="/dashboard"
              className="hover:text-[#CADCAE] dark:hover:text-[#7ADAA5] transition"
            >
              Dashboard
            </Link>
          )}
          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="btn btn-sm bg-[#239BA7] dark:bg-gray-700 text-white rounded-2xl px-4 hover:bg-[#7ADAA5] dark:hover:bg-gray-600 transition"
              >
                Logout
              </button>
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
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
              className="btn btn-sm bg-[#239BA7] dark:bg-gray-700 text-white rounded-2xl px-6 font-bold hover:bg-[#7ADAA5] dark:hover:bg-gray-600 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden flex flex-col bg-gradient-to-b from-[#239BA7] via-[#7ADAA5] to-[#CADCAE] 
                        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                        text-white h-screen px-4 pt-4 transition-colors"
        >
          {user && (
            <div className="w-full flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={user.photoURL || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Link
              to="/"
              onClick={toggleMenu}
              className="py-2 hover:text-[#CADCAE] dark:hover:text-[#7ADAA5]"
            >
              Home
            </Link>
            <Link
              to="/trainers"
              onClick={toggleMenu}
              className="py-2 hover:text-[#CADCAE] dark:hover:text-[#7ADAA5]"
            >
              All Trainers
            </Link>
            <Link
              to="/classes"
              onClick={toggleMenu}
              className="py-2 hover:text-[#CADCAE] dark:hover:text-[#7ADAA5]"
            >
              All Classes
            </Link>
            <Link
              to="/forum"
              onClick={toggleMenu}
              className="py-2 hover:text-[#CADCAE] dark:hover:text-[#7ADAA5]"
            >
              Forums
            </Link>
            {user && (
              <Link
                to="/dashboard"
                onClick={toggleMenu}
                className="py-2 hover:text-[#CADCAE] dark:hover:text-[#7ADAA5]"
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
                className="btn btn-sm bg-[#239BA7] dark:bg-gray-700 text-white rounded-2xl w-full hover:bg-[#7ADAA5] dark:hover:bg-gray-600 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={toggleMenu}
                className="btn btn-sm bg-[#239BA7] dark:bg-gray-700 text-white rounded-2xl w-full text-center font-bold hover:bg-[#7ADAA5] dark:hover:bg-gray-600 transition"
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
