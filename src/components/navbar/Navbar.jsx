import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { use } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = use(AuthContext);
  console.log(user);

  const navLinks = (
    <>
      <NavLink to="/" className="hover:text-blue-500 text-white">
        Home
      </NavLink>
      <NavLink to="/roommateadd" className="hover:text-blue-500 text-white">
        Add to Find Roommate
      </NavLink>
      <NavLink to="/browse-listings" className="hover:text-blue-500 text-white">
        Browse Listings
      </NavLink>
      <NavLink to="/my-listings" className="hover:text-blue-500 text-white">
        My Listings
      </NavLink>
    </>
  );

  return (
    <nav className="bg-black border sticky top-0 shadow-md w-full z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-white">
          Roommate Finder
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center text-gray-700 font-medium">
          {navLinks}
          {user ? (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login
            </Link>
          ) : (
            <Link
              to="/register"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Sign Up
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 bg-white px-6 py-4 text-gray-800 font-medium">
          {navLinks}

          {/* Dummy mobile login/signup for design */}
          <Link to="/login" className="hover:text-blue-500">
            Login
          </Link>
          <Link to="/register" className="  text-black">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
