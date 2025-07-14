
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import UseAuth from "../../../../hooks/UseAuth";
import CheckoutForm from "./CheckoutForm";

const PaymentPage = () => {
  const { user } = UseAuth();
  const userEmail = user?.email || "";
  const [searchParams] = useSearchParams();

  const trainer = searchParams.get("trainer");
  const slot = searchParams.get("slot");
  const plan = searchParams.get("plan");

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: userEmail,
  });

  const planPrices = {
  basic: 10,
  standard: 50,
  premium: 100,
};

const price = planPrices[plan] || 0;
  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-2xl">
      <h2 className="text-3xl font-bold mb-6">Trainer Payment Page</h2>

      {/* Show trainer and slot info */}
      <div className="mb-6 space-y-2">
        <p><strong>Trainer:</strong> {trainer}</p>
        <p><strong>Slot:</strong> {slot}</p>
        <p><strong>Selected Plan:</strong> {plan}</p>
      </div>

      {/* Input form */}
      <form className="space-y-4 mb-8">
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
          <label className="block text-sm font-medium mb-1">Email</label>
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

      {/* Checkout Form */}
      <CheckoutForm
        price={price}
        bookingData={{
          payerName: formData.name,
          payerEmail: formData.email,
          userEmail,
          trainer,
          slot,
          plan,
        }}
      />
    </div>
  );
};

export default PaymentPage;
