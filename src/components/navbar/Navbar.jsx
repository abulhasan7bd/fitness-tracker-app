import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { use } from "react";
import { AuthContext } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase.init";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, login, setLogin } = use(AuthContext);
  const handlemenu = () => {
    setIsOpen(!isOpen);
  };
  const logout = () => {
    signOut(auth)
      .then(() => {
        localStorage.setItem("user", JSON.stringify(false));
        setLogin(true);
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
  const navLinks = (
    <>
      <NavLink
        to="/"
        className="hover:text-blue-500 text-black"
        onClick={handlemenu}
      >
        Home
      </NavLink>
      <NavLink
        to="/roommateadd"
        className="hover:text-blue-500 text-black"
        onClick={handlemenu}
      >
        Add to Find Roommate
      </NavLink>
      <NavLink
        to="/browse-listings"
        className="hover:text-blue-500 text-black"
        onClick={handlemenu}
      >
        Browse Listings
      </NavLink>
      <NavLink
        to="/my-listings"
        className="hover:text-blue-500 text-black"
        onClick={handlemenu}
      >
        My Listings
      </NavLink>
    </>
  );

  return (
    <nav className="bg-[#FFFFFF] text-black   sticky top-0 shadow-md w-full z-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* left logo  */}
        <Link to="/" className="text-xl font-bold  ">
          <div className=" flex  justify-center items-center gap-[1rem]">
            <img
              className=" w-[60px]"
              src="https://jobko.vercel.app/images/logo.png"
              alt="Navbar_logo"
            />
            <h2 className="font-poppins font-semibold">LiveMate </h2>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center text-gray-700 font-medium">
          {navLinks}

          {/* profile  */}
          {user && (
            <div className="profile relative group w-max ">
              <p className="absolute text-[13px]  text-center  text-white bg-black bg-opacity-80 px-2 py-1 right-[100%] rounded opacity-0 group-hover:opacity-100 transition duration-300 z-10 w-[100px]">
                {user?.displayName || "Nodd dNme"}
              </p>
              <img
                className="rounded-full border-2 border-green-200 cursor-pointer h-[60px] w-[60px] object-cover"
                src={user?.photoURL || "/default-avatar.png"}
                alt="User Avatar"
              />
            </div>
          )}

          {user ? (
            login ? (
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600"
              >
                Login
              </Link>
            )
          ) : (
            <Link
              to="/register"
              className="px-4 py-2 shadow-black border-2 rounded-full w-[140px] text-center cursor-pointer text-black hover:bg-blue-600"
            >
              Signup
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

          {user ? (
            login ? (
              <button
                onClick={() => {
                  logout();
                  handlemenu();
                }}
                className="text-red-500 hover:text-red-600 text-left"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="hover:text-blue-500"
                onClick={handlemenu}
              >
                Login
              </Link>
            )
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-blue-500"
                onClick={handlemenu}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-black hover:text-blue-600"
                onClick={handlemenu}
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
