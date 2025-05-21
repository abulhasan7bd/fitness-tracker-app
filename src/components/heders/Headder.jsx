import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <div
      className="h-screen bg-cover bg-center text-white flex items-center  px-6 text-xl font-medium"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('https://img.freepik.com/premium-photo/man-white-shirt-websurfing-with-laptop-home-kitchen_96649-943.jpg?ga=GA1.1.1322734213.1735572178&semt=ais_hybrid&w=740')`,
      }}
    >
      <div className="">
        <h2 className="text-[4rem] font-[700] text-left font-poppins">
          Find Your Perfect <br />
          Roommate Anywhere, Anytime
        </h2>
        <div className="mt-[1rem] relative w-[90%]">
          <input
            className="py-[2rem] w-full pl-[2rem] border-none rounded-xl bg-white text-black"
            type="text"
            placeholder="Search your perfect roommate"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2 bg-white p-2 rounded shadow">
            <FaMapMarkerAlt className="text-black text-xl" />
            <select className="select select-bordered w-full max-w-xs text-black">
              <option disabled selected>
                Choose location
              </option>
              <option>New York</option>
              <option>Los Angeles</option>
              <option>Chicago</option>
              <option>Dhaka</option>
              <option>London</option>
              <option>Toronto</option>
            </select>
          </div>

          <button className="absolute right-[-7rem] top-1/2 transform -translate-y-1/2 bg-red-500 cursor-pointer hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow-lg flex items-center gap-2 transition duration-300">
            <FaSearch className="text-white" />
            Find
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
