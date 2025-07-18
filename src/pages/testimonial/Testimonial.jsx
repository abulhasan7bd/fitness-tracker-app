import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [reviewsPerPage, setReviewsPerPage] = useState(3); // Default 3 for large screens

  useEffect(() => {
    // Fetch review data
    axios
      .get("http://localhost:5000/reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  useEffect(() => {
    // Set reviewsPerPage based on screen size
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setReviewsPerPage(1); // Mobile
      } else if (width < 1024) {
        setReviewsPerPage(2); // Tablet
      } else {
        setReviewsPerPage(3); // Desktop
      }
    };

    handleResize(); // Initial
    window.addEventListener("resize", handleResize); // Update on resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const total = reviews.length;

  const getVisibleReviews = () => {
    const visible = [];
    for (let i = 0; i < reviewsPerPage; i++) {
      visible.push(reviews[(startIndex + i) % total]);
    }
    return visible;
  };

  const visibleReviews = getVisibleReviews().filter(Boolean);

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % total);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 bg-gray-100 rounded-xl shadow-lg my-8">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-blue-700">
        What Our Clients Say
      </h2>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full p-2 md:p-3 hover:bg-blue-700 transition z-10"
          aria-label="Previous"
        >
          <FaArrowLeft />
        </button>

        {/* Review Cards */}
        <div
          className={`grid gap-6 px-6 ${
            reviewsPerPage === 1
              ? "grid-cols-1"
              : reviewsPerPage === 2
              ? "grid-cols-2"
              : "grid-cols-3"
          }`}
        >
          {visibleReviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 shadow-md border border-blue-100"
            >
              <div className="flex items-center mb-3 gap-1 text-yellow-500">
                {[...Array(review.rating || 5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">"{review.reviewText}"</p>
              <p className="font-semibold text-blue-600">
                - {review.payerName || "Anonymous"}
              </p>
              <p className="text-sm text-gray-500">{review.trainer}</p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full p-2 md:p-3 hover:bg-blue-700 transition z-10"
          aria-label="Next"
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default Testimonial;
