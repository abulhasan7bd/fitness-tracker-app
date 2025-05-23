import React, { useState } from "react";

const OptimizationBox = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send this data to your backend or API here
    console.log("Submitted Data:", form);
    setSubmitted(true);
  };

  return (
    <div className="mx-auto dark:text-gray-900 bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h2 className="text-4xl font-bold mb-4 text-center text-blue-600 dark:text-gray-900">
        🛠 Optimization Feedback
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Help us improve the Roommate Finder platform by submitting issues,
        suggestions, or comments.
      </p>

      {submitted ? (
        <div className="text-green-600 text-center font-semibold">
           Thank you for your feedback!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            rows="4"
            placeholder="Describe your issue, idea, or comment..."
            required
            value={form.message}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
};

export default OptimizationBox;
