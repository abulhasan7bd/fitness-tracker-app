import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
const Header = ({setValue}) => {

  const [search, setSerch] = useState("");
  const handleDone = () => {
    console.log(`Done after 5 loops!`);
  };
  const handleSearch = () => {
    setValue(search)
  };

  return (
   <div
  className="h-screen bg-cover bg-center text-white flex items-center px-6 text-xl font-medium"
  style={{
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url('https://img.freepik.com/premium-photo/man-white-shirt-websurfing-with-laptop-home-kitchen_96649-943.jpg?ga=GA1.1.1322734213.1735572178&semt=ais_hybrid&w=740')`,
  }}
>
  <div className="max-w-3xl w-full  text-white   dark:bg-transparent dark:text-white p-6 rounded-lg shadow">
    <h2 className="text-5xl md:text-6xl font-bold text-left font-poppins">
      Find Your Perfect Roommate <br />
      <span className="text-red-400">
        <Typewriter
          words={[
            "Anytime, Anywhere",
            "The Smarter Way ",
            "Just a Click Away!",
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
        placeholder="Choose your location"
        className="py-6 w-full pl-5 pr-[12rem] rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-300 border-none outline-none"
        value={search}
        onChange={(e) => setSerch(e.target.value)}
      />

      {/* Select Dropdown */}
      <div className="absolute right-[9rem] top-1/2 transform -translate-y-1/2 flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-xl shadow-md">
        <FaMapMarkerAlt className="text-black dark:text-white text-xl" />
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 cursor-pointer hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition duration-300"
      >
        <FaSearch className="text-white" />
        Find
      </button>
    </div>
  </div>
</div>

  );
};

export default Header;
