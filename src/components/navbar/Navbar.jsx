import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../../../firebase.init";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import UseAdmin from "../../hooks/UseAdmin";
const Navbar = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userInfo } = UseAdmin();
  const role_info = userInfo[0];
  console.log(role_info?.role)
   
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
   <nav className="bg-gradient-to-r from-[#239BA7] via-[#7ADAA5] to-[#CADCAE] text-white sticky top-0 shadow-md w-full z-50">
  <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center font-Roboto">
    {/* Logo */}
    <Link to="/" className="text-2xl font-bold text-white">
      FitTrack
    </Link>

    {/* Mobile Toggle Button */}
    <button
      onClick={toggleMenu}
      className="md:hidden px-3 py-2 border rounded text-white border-white"
      aria-label="Toggle menu"
    >
      {isMenuOpen ? <IoMdClose size={24} /> : <GiHamburgerMenu size={24} />}
    </button>

    {/* Desktop Links */}
    <div className="hidden md:flex gap-6 items-center">
      <Link to="/" className="hover:text-[#CADCAE] transition">
        Home
      </Link>
      <Link to="/trainers" className="hover:text-[#CADCAE] transition">
        All Trainers
      </Link>
      <Link to="/classes" className="hover:text-[#CADCAE] transition">
        All Classes
      </Link>
      <Link to="/forum" className="hover:text-[#CADCAE] transition">
        Forums
      </Link>

      {user && (
        <Link to="/dashboard" className="hover:text-[#CADCAE] transition">
          Dashboard
        </Link>
      )}
      {user ? (
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="btn btn-sm bg-[#239BA7] text-white rounded-2xl px-4 hover:bg-[#7ADAA5] transition"
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
          className="btn btn-sm bg-[#239BA7] text-white rounded-2xl px-6 font-bold hover:bg-[#7ADAA5] transition"
        >
          Login
        </Link>
      )}
    </div>
  </div>

  {/* Mobile Menu */}
  {isMenuOpen && (
    <div className="md:hidden flex flex-col bg-gradient-to-b from-[#239BA7] via-[#7ADAA5] to-[#CADCAE] text-white h-screen px-4 pt-4">
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
          className="py-2 hover:text-[#CADCAE]"
        >
          Home
        </Link>
        <Link
          to="/trainers"
          onClick={toggleMenu}
          className="py-2 hover:text-[#CADCAE]"
        >
          All Trainers
        </Link>
        <Link
          to="/classes"
          onClick={toggleMenu}
          className="py-2 hover:text-[#CADCAE]"
        >
          All Classes
        </Link>
        <Link
          to="/forum"
          onClick={toggleMenu}
          className="py-2 hover:text-[#CADCAE]"
        >
          Forums
        </Link>
        {user && (
          <Link
            to="/dashboard"
            onClick={toggleMenu}
            className="py-2 hover:text-[#CADCAE]"
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
            className="btn btn-sm bg-[#239BA7] text-white rounded-2xl w-full hover:bg-[#7ADAA5] transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            onClick={toggleMenu}
            className="btn btn-sm bg-[#239BA7] text-white rounded-2xl w-full text-center font-bold hover:bg-[#7ADAA5] transition"
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
