import React, { useState } from "react";
import Swal from "sweetalert2";
const NewsLetter = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      fetch("http://localhost:5000/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      })
        .then((res) => {
          if (res.ok) {
            Swal.fire({
              icon: "success",
              title: "Subscribed!",
              text: "You have successfully subscribed to our newsletter.",
            });
            setName(""); // Optional: clear form
            setEmail("");
          } else {
            Swal.fire({
              icon: "error",
              title: "Failed!",
              text: "Something went wrong. Please try again.",
            });
          }
        })
        .catch((err) =>
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: err.message,
          })
        );
    } else {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please enter both name and email.",
      });
    }
  };

  return (
   <section className="w-full my-16 px-4">
  <div className="bg-blue-50 py-12 px-6 sm:px-10 rounded-xl max-w-3xl mx-auto shadow-md">
    <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
      Subscribe to our Newsletter
    </h2>

    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        placeholder="Your Name"
        className="flex-1 px-4 py-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Your Email"
        className="flex-1 px-4 py-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
      >
        Subscribe Now
      </button>
    </form>

    {status === "success" && (
      <p className="mt-4 text-green-600 text-center font-medium">
        Thank you for subscribing!
      </p>
    )}
    {status === "error" && (
      <p className="mt-4 text-red-600 text-center font-medium">
        Please enter a valid name and email.
      </p>
    )}
  </div>
</section>

  );
};

export default NewsLetter;
