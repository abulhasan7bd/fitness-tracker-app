import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TrainerBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Receive trainer and slot from location.state
  const trainer = location.state?.data;
  const slot = location.state?.slot;
  const bookingTrainer = location.state.classItem;

  // Plan state
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const handleJoinNow = () => {
    if (!selectedPlan) {
      alert("Please select a membership plan.");
      return;
    }

    navigate(
      `/payment?trainer=${encodeURIComponent(
        trainer.fullName
      )}&slot=${encodeURIComponent(slot)}&plan=${selectedPlan}`,
      {
        state: bookingTrainer,
      }
    );
  };

  if (!trainer || !slot) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-red-500">
          Invalid booking data
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-3xl font-bold mb-4">Trainer Booking</h2>

      {/* Trainer Info */}
      <div className="mb-6 space-y-2">
        <p className="text-lg">
          <strong>Trainer:</strong> {trainer.fullName}
        </p>
        <p className="text-lg">
          <strong>Selected Slot:</strong> {slot}
        </p>
      </div>

      <h3 className="text-2xl font-semibold mb-4">Choose Your Package</h3>

      {/* Membership Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Basic Plan */}
        <label
          className={`border rounded-2xl p-4 cursor-pointer shadow-md hover:shadow-lg transition ${
            selectedPlan === "basic" && "ring-2 ring-blue-500"
          }`}
        >
          <input
            type="radio"
            name="membership"
            value="basic"
            className="mr-2"
            checked={selectedPlan === "basic"}
            onChange={() => setSelectedPlan("basic")}
          />
          <h4 className="text-xl font-semibold">Basic Membership</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
            <li>Access to gym facilities</li>
            <li>Use of training equipment</li>
          </ul>
          <p className="font-bold mt-2">Price: $10</p>
        </label>

        {/* Standard Plan */}
        <label
          className={`border rounded-2xl p-4 cursor-pointer shadow-md hover:shadow-lg transition ${
            selectedPlan === "standard" && "ring-2 ring-blue-500"
          }`}
        >
          <input
            type="radio"
            name="membership"
            value="standard"
            className="mr-2"
            checked={selectedPlan === "standard"}
            onChange={() => setSelectedPlan("standard")}
          />
          <h4 className="text-xl font-semibold">Standard Membership</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
            <li>All Basic benefits</li>
            <li>Group fitness classes</li>
            <li>Locker room and showers</li>
          </ul>
          <p className="font-bold mt-2">Price: $50</p>
        </label>

        {/* Premium Plan */}
        <label
          className={`border rounded-2xl p-4 cursor-pointer shadow-md hover:shadow-lg transition ${
            selectedPlan === "premium" && "ring-2 ring-blue-500"
          }`}
        >
          <input
            type="radio"
            name="membership"
            value="premium"
            className="mr-2"
            checked={selectedPlan === "premium"}
            onChange={() => setSelectedPlan("premium")}
          />
          <h4 className="text-xl font-semibold">Premium Membership</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
            <li>All Standard benefits</li>
            <li>Personal training sessions</li>
            <li>Sauna & steam room</li>
            <li>Discounts on massage & nutrition</li>
          </ul>
          <p className="font-bold mt-2">Price: $100</p>
        </label>
      </div>

      {/* Join Now Button */}
      <div className="mt-6">
        <button
          onClick={handleJoinNow}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700 transition"
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

export default TrainerBooking;
