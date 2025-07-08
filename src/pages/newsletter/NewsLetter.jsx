import React, { useState } from "react";

const NewsLetter = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      console.log(name, email);
      setStatus("success");
      fetch("http://localhost:5000/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err.message));
    } else {
      setStatus("error");
    }
  };

  return (
    <section className="bg-blue-50 py-12 px-4 rounded-xl max-w-3xl mx-auto shadow-md">
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
    </section>
  );
};

export default NewsLetter;
