import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const TrainerBooking = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const slot = queryParams.get("slot");

  // Dummy trainer data (would usually be fetched by ID)
  const trainer = {
    id,
    name: "John Doe",
  };

  const [selectedPlan, setSelectedPlan] = useState("basic");

  const handleJoinNow = () => {
    navigate(
      `/payment?trainer=${trainer.id}&slot=${encodeURIComponent(
        slot
      )}&plan=${selectedPlan}`
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Trainer Booking</h2>

      <div className="mb-6">
        <p className="text-lg">
          <strong>Trainer:</strong> {trainer.name}
        </p>
        <p className="text-lg">
          <strong>Selected Slot:</strong> {slot}
        </p>
      </div>

      <h3 className="text-2xl font-semibold mb-4">Choose Your Package</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Basic Plan */}
        <label className="border rounded-2xl p-4 cursor-pointer shadow-md hover:shadow-lg transition">
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
        <label className="border rounded-2xl p-4 cursor-pointer shadow-md hover:shadow-lg transition">
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
            <li>Group fitness classes (yoga, spinning, Zumba)</li>
            <li>Locker room and showers access</li>
          </ul>
          <p className="font-bold mt-2">Price: $50</p>
        </label>

        {/* Premium Plan */}
        <label className="border rounded-2xl p-4 cursor-pointer shadow-md hover:shadow-lg transition">
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
            <li>Sauna, steam room access</li>
            <li>Discounts on massages/nutrition</li>
          </ul>
          <p className="font-bold mt-2">Price: $100</p>
        </label>
      </div>

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
