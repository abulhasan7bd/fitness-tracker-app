import React from "react";
import { Link } from "react-router-dom";

const RoommateCard = ({ roommate }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-2">{roommate.name}</h2>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Contact:</span> {roommate.contactInfo}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Room Type:</span> {roommate.roomType}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Location:</span> {roommate.location}
      </p>
   <div className="flex justify-between items-center mt-4">
  <p className="text-sm">
    <span
      className={`font-semibold ${
        roommate.availability ? "text-green-600" : "text-red-500"
      }`}
    >
      {roommate.availability ? "Available" : "Not Available"}
    </span>
  </p>

 <Link to={`/details/${roommate._id}`}> <button  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 cursor-pointer">
    See More
  </button></Link>
</div>

    </div>
  );
};

export default RoommateCard;
