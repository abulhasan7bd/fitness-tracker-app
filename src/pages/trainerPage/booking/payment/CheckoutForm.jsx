import React, { useState } from "react";
import UseAxios from "../../../../hooks/UseAxios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import  Swal  from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, bookingData }) => {
  const navigate = useNavigate();
  console.log(bookingData);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const useAxios = UseAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    const card = elements.getElement(CardElement);

    const { error: methodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (methodError) {
      setError(methodError.message);
      setProcessing(false);
      return;
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
        receipt_email: bookingData.email,
      });

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
      return;
    }

    console.log(paymentIntent);
    if (paymentIntent.status === "succeeded") {
      setSuccess("Payment successful");

      // Show success alert
      Swal.fire({
        title: "Payment Successful!",
        text: "Thank you for your purchase. Your payment has been processed successfully.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      }).then(async () => {
        try {
          // Save payment to server
          await useAxios.post("/payment", {
            ...bookingData,
            transactionId: paymentIntent.id,
            price,
            date: new Date(),
          });

          // Navigate after successful save
          navigate("/dashboard/my-bookings");
        } catch (err) {
          console.error("Payment save error:", err);
          Swal.fire({
            title: "Error",
            text: "Payment was successful, but saving failed. Please contact support.",
            icon: "error",
          });
        } finally {
          setProcessing(false);
        }
      });
    }
  };

  useEffect(() => {
    if (price > 0) {
      useAxios
        .post("/create-payment-intent", { price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Error fetching clientSecret:", err);
        });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <CardElement className="p-3 border rounded" />
      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="w-full bg-[#301e4e] text-white py-2 rounded disabled:opacity-50 cursor-pointer"
      >
        {processing ? "Processing..." : `Pay $${price}`}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}
    </form>
  );
};

export default CheckoutForm;
