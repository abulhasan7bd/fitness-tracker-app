import React, { useState } from "react";

const Testimonial = () => {
  const dummyReviews = [
    {
      id: 1,
      name: "Alice Johnson",
      text: "This fitness tracker changed my life! Easy to use and super motivating.",
    },
    {
      id: 2,
      name: "Mark Wilson",
      text: "I love how I can track my workouts and see real progress every week.",
    },
    {
      id: 3,
      name: "Sara Lee",
      text: "Great app with amazing features. The goals section keeps me on track!",
    },
    {
      id: 4,
      name: "John Doe",
      text: "The nutrition tracker helped me maintain a healthier diet easily.",
    },
    {
      id: 5,
      name: "Emily Clark",
      text: "Excellent design and user-friendly interface. Highly recommend!",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const total = dummyReviews.length;

  // Show 3 reviews at a time
  const visibleReviews = [
    dummyReviews[startIndex % total],
    dummyReviews[(startIndex + 1) % total],
    dummyReviews[(startIndex + 2) % total],
  ];

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % total);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 bg-gray-50 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-center">
        What Our Members Say
      </h2>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 transition z-10"
          aria-label="Previous"
        >
          &#8592;
        </button>

        {/* Review Cards Container */}
        <div className="flex space-x-6 overflow-hidden">
          {visibleReviews.map((review) => (
            <div
              key={review.id}
              className="flex-1 bg-white rounded-xl p-6 shadow-md"
              style={{ minWidth: "30%" }}
            >
              <p className="text-gray-700 mb-4">"{review.text}"</p>
              <p className="font-semibold text-blue-600">- {review.name}</p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 transition z-10"
          aria-label="Next"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
};

export default Testimonial;
