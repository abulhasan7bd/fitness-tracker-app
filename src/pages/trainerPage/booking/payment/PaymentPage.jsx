import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe("pk_test_YOUR_STRIPE_PUBLISHABLE_KEY");

const Paymentpage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePayNow = async () => {
    if (!formData.name || !formData.email) {
      alert("Please enter your name and email.");
      return;
    }

    try {
      const stripe = await stripePromise;

      // Send request to backend to create Stripe session
      const response = await axios.post(
        "http://localhost:5000/create-checkout-session",
        {
          trainer,
          slot,
          packageName,
          price: selectedPackage.price,
          ...formData,
        }
      );

      const session = response.data;

      // Redirect to Stripe checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-2xl">
      <h2 className="text-3xl font-bold mb-6">Trainer Payment Page</h2>

      {/* Booking Summary */}
      <div className="mb-6 space-y-2">
        <p>
          <strong>Trainer Name:</strong> {trainer}
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

      {/* Package Benefits */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">What's included:</h3>
        <ul className="list-disc list-inside text-gray-700">
          {selectedPackage.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>

      {/* User Info Form */}
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Your Name</label>
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
          <label className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full border px-4 py-2 rounded"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <button
          type="button"
          onClick={handlePayNow}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Paymentpage;
