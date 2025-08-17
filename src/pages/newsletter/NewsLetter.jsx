import React, { useState } from "react";
import Swal from "sweetalert2";
import UseAxios from "./../../hooks/UseAxios";
const NewsLetter = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const axios = UseAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please enter both name and email.",
      });
      return;
    }

    try {
      const response = await axios.post("/subscriptions", {
        name: trimmedName,
        email: trimmedEmail,
      });

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Subscribed!",
          text: "You have successfully subscribed to our newsletter.",
        });

        // Optionally reset the form
        setName("");
        setEmail("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text:
          error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred.",
      });
    }
  };

  return (
    <section className="w-full my-16 px-4">
      <div className="relative max-w-3xl mx-auto">
        {/* Gradient border wrapper */}
        <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-[#239BA7] via-[#7ADAA5] to-[#CADCAE] dark:from-[#7ADAA5] dark:via-[#CADCAE] dark:to-[#239BA7] opacity-80"></div>

        {/* Inner content box */}
        <div className="relative bg-[#239BA7]/10 dark:bg-gray-800 py-12 px-6 sm:px-10 rounded-xl shadow-md transition-colors">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#239BA7] dark:text-[#CADCAE]">
            Subscribe to our Newsletter
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="text"
              placeholder="Your Name"
              className="flex-1 px-4 py-3 rounded-lg border border-[#7ADAA5]/50 dark:border-[#CADCAE]/50 focus:outline-none focus:ring-2 focus:ring-[#239BA7] dark:focus:ring-[#7ADAA5] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              className="flex-1 px-4 py-3 rounded-lg border border-[#7ADAA5]/50 dark:border-[#CADCAE]/50 focus:outline-none focus:ring-2 focus:ring-[#239BA7] dark:focus:ring-[#7ADAA5] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-[#239BA7] to-[#7ADAA5] dark:from-[#7ADAA5] dark:to-[#CADCAE] text-white font-semibold px-6 py-3 rounded-lg transition duration-300 hover:brightness-110 cursor-pointer"
            >
              Subscribe Now
            </button>
          </form>

          {status === "success" && (
            <p className="mt-4 text-green-500 dark:text-green-400 text-center font-medium">
              Thank you for subscribing!
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-red-500 dark:text-red-400 text-center font-medium">
              Please enter a valid name and email.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
