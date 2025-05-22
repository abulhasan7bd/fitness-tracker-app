import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
const Header = () => {
  const handleDone = () => {
    console.log(`Done after 5 loops!`);
  };

  return (
    <div
      className="h-screen bg-cover bg-center text-white flex items-center px-6 text-xl font-medium"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('https://img.freepik.com/premium-photo/man-white-shirt-websurfing-with-laptop-home-kitchen_96649-943.jpg?ga=GA1.1.1322734213.1735572178&semt=ais_hybrid&w=740')`,
      }}
    >
      <div className="max-w-3xl w-full">
        <h2 className="text-5xl md:text-6xl font-bold text-left font-poppins  ">
          Find Your Perfect Roommate <br />
          <span className="text-red-400">
            <Typewriter
              words={[
                "Anytime, Anywhere",
                "The Smarter Way ",
                "  Just a Click Away!",
              ]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
              onLoopDone={handleDone}
            />
          </span>
        </h2>

        <div className="mt-8 relative">
          <input
            type="text"
            placeholder="Search your perfect roommate"
            className="py-6 w-full pl-5 pr-[12rem] rounded-xl bg-white text-black placeholder:text-gray-500 border-none outline-none"
          />

          {/* Select Dropdown */}
          <div className="absolute right-[9rem] top-1/2 transform -translate-y-1/2 flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-md">
            <FaMapMarkerAlt className="text-black text-xl" />
            <select
              className="bg-transparent focus:outline-none text-black"
              defaultValue=""
            >
              <option value="" disabled>
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

          {/* Search Button */}
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 cursor-pointer hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition duration-300">
            <FaSearch className="text-white" />
            Find
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
