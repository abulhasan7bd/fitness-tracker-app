import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import UseAuth from "../../../../hooks/UseAuth";

const PaymentPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const { user } = UseAuth();
  const userEmail = user?.email;
  const trainer = query.get("trainer") || "John Doe";
  const slot = query.get("slot") || "Monday 10:00 AM";
  const packageName = query.get("plan") || "basic";

  const packageDetails = {
    basic: {
      name: "Basic Membership",
      price: 10,
      benefits: [
        "Access to gym facilities during regular hours",
        "Use of cardio and strength training equipment",
      ],
    },
    standard: {
      name: "Standard Membership",
      price: 50,
      benefits: [
        "All benefits of Basic",
        "Access to group fitness classes",
        "Locker rooms and showers",
      ],
    },
    premium: {
      name: "Premium Membership",
      price: 100,
      benefits: [
        "All benefits of Standard",
        "Personal training sessions",
        "Sauna or steam room access",
        "Discounts on massages/nutrition counseling",
      ],
    },
  };

  const selectedPackage = packageDetails[packageName];

  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-2xl">
      <h2 className="text-3xl font-bold mb-6">Trainer Payment Page</h2>

      <div className="mb-6 space-y-2">
        <p>
          <strong>Trainer:</strong> {trainer}
        </p>
        <p>
          <strong>Slot:</strong> {slot}
        </p>
        <p>
          <strong>Package:</strong> {selectedPackage.name}
        </p>
        <p>
          <strong>Price:</strong> ${selectedPackage.price}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Package Includes:</h3>
        <ul className="list-disc list-inside text-gray-700">
          {selectedPackage.benefits.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Your Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border px-4 py-2 rounded"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full border px-4 py-2 rounded"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
      </form>
      {/* Pass data to checkout */}
      <CheckoutForm
        price={selectedPackage.price}
        bookingData={{
          payerName: formData.name,
          payerEmail: formData.email,
          userEmail: userEmail,
          trainer,
          slot,
          packageName: selectedPackage.name,
        }}
      />
    </div>
  );
};

export default PaymentPage;
