import React, { useEffect, useState } from "react";
import { FaHandshake } from "react-icons/fa";

const extraSection1 = {
  title: "How It Works",
  content:
      "Search, connect, and move in with your perfect roommate. Our platform makes roommate matching easy and safe. You’ve reviewed the info carefully and communication flows smoothly, ensuring a great living experience.",

};

const HowItWorks = () => {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ email: "", idea: "" });
  const [status, setStatus] = useState(null); // null, 'success', 'error'

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById("how-it-works");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.75) {
        setVisible(true);
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(form.email)) {
      setStatus("error");
      return;
    }
    if (form.idea.trim() === "") {
      setStatus("error");
      return;
    }

    // Simulate submitting data (replace with your API call)
    console.log("Submitted:", form);

    setStatus("success");
    setForm({ email: "", idea: "" });

    setTimeout(() => setStatus(null), 4000);
  };

  return (
    <section
      id="how-it-works"
      className={`dark:text-gray-900 max-w-4xl mx-auto p-8 my-20 bg-white rounded-xl shadow-lg transition-all duration-700 ease-in-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="flex items-center justify-center mb-6 text-blue-600 text-5xl">
        <FaHandshake />
      </div>
      <h2 className="text-4xl font-extrabold text-center mb-4 relative inline-block">
        {extraSection1.title}
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2   rounded-full"></span>
      </h2>
      <p className="text-left text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed mb-10">
        {extraSection1.content}
      </p>

      {/* Submission Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto space-y-6"
        noValidate
      >
        <div>
          <label
            htmlFor="email"
            className="block mb-2 font-semibold text-gray-700"
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="idea"
            className="block mb-2 font-semibold text-gray-700"
          >
            Your Idea or Technology Suggestion
          </label>
          <textarea
            id="idea"
            name="idea"
            rows="5"
            value={form.idea}
            onChange={handleChange}
            required
            placeholder="Share your idea or tech suggestion here..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Submit
        </button>

        {status === "success" && (
          <p className="text-green-600 text-center font-semibold">
            Thank you for your submission!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-center font-semibold">
            Please provide a valid email and idea.
          </p>
        )}
      </form>
    </section>
  );
};

export default HowItWorks;
