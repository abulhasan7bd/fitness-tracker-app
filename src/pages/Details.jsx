import React from "react";
import { useLoaderData } from "react-router-dom";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

const Details = () => {
  const roommate = useLoaderData();

  if (!roommate) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="mx-auto p-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-6 mb-6">
        <div className="relative">
          <img
            src={roommate.img || "https://via.placeholder.com/100"}
            alt={roommate.userName}
            className="w-20 h-20 rounded-full border-4 border-blue-500 object-cover"
          />
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-blue-700">{roommate.userName}</h1>
          <p className="text-gray-600">{roommate.description}</p>
        </div>
      </div>

      {/* Room Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((num) => (
          <img
            key={num}
            src="https://img.freepik.com/premium-photo/luxury-classic-interior-home-library-sitting-room-with-bookshelf-books-arm-chair-sofa-fireplace_80942-1256.jpg?w=740"
            alt={`Room ${num}`}
            className="rounded-lg h-60 w-full object-cover shadow"
          />
        ))}
      </div>

      {/* Description */}
      <div className="bg-white shadow rounded p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Room Details</h2>
        <p className="text-gray-700 mb-4">{roommate.description}</p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
          <li><strong>Location:</strong> {roommate.location}</li>
          <li><strong>Age:</strong> {roommate.age || "N/A"}</li>
          <li><strong>Room Type:</strong> {roommate.roomType}</li>
          <li><strong>Rent Amount:</strong> ${roommate.rentAmount}</li>
          <li><strong>Budget:</strong> {roommate.budget || "N/A"}</li>
          <li><strong>Availability:</strong> {roommate.availability ? "Available" : "Not Available"}</li>
        </ul>
      </div>

      {/* Lifestyle Preferences */}
      <div className="bg-gray-100 p-6 rounded shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Lifestyle Preferences</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Pets: {roommate.lifestylePreferences?.pets ? "Allowed" : "Not allowed"}</li>
          <li>Smoking: {roommate.lifestylePreferences?.smoking ? "Allowed" : "Not allowed"}</li>
          <li>Night Owl: {roommate.lifestylePreferences?.nightOwl ? "Yes" : "No"}</li>
        </ul>
      </div>

      {/* Contact Info */}
      <div className="bg-white p-6 shadow rounded mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Contact Information</h2>
        <p><strong>Phone:</strong> {roommate.contactInfo || "N/A"}</p>
        <p><strong>Email:</strong> {roommate.userEmail}</p>
      </div>

      {/* Extra Services (Static Demo) */}
      <div className="bg-blue-50 p-6 rounded shadow mb-6">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">Services & Facilities</h2>
        <ul className="list-disc list-inside text-blue-700 space-y-1">
          <li>Online food delivery</li>
          <li>Clothes ironing service</li>
          <li>Freezer and AC available</li>
          <li>Peaceful environment</li>
        </ul>
      </div>

      {/* Floating Chat Button */}
      <div className="fixed right-8 bottom-20 z-50">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg focus:outline-none"
          aria-label="Open chat"
        >
          <IoChatbubbleEllipsesSharp size={24} />
        </button>
      </div>
    </div>
  );
};

export default Details;
