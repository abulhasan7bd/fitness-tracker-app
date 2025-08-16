import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import UseAxios from "../../hooks/UseAxios";
import { useQuery } from '@tanstack/react-query';
 
 
const Testimonial = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [reviewsPerPage, setReviewsPerPage] = useState(3); // Default 3 for large screens

  const axiosSecure = UseAxios();
 
  const { data: reviews = [], isLoading, isError, error } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });
 
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setReviewsPerPage(1);
      } else if (width < 1024) {
        setReviewsPerPage(2);
      } else {
        setReviewsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
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

  if (isLoading) {
    return (
      <div className="text-center py-10 text-blue-500 font-semibold">
        Loading reviews...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500 font-semibold">
        Failed to load reviews: {error.message}
      </div>
    );
  }

  return (
<section className="max-w-6xl mx-auto px-4 py-12 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-lg my-8 transition-colors">
  <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-[#239BA7] dark:text-[#CADCAE]">
    What Our Clients Say
  </h2>

  <div className="relative">
    {/* Left Arrow */}
    <button
      onClick={handlePrev}
      className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#239BA7] dark:bg-[#7ADAA5] text-white rounded-full p-2 md:p-3 hover:bg-[#7ADAA5] dark:hover:bg-[#239BA7] transition z-10"
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
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-[#7ADAA5] dark:border-[#239BA7] transition-colors"
        >
          <div className="flex items-center mb-3 gap-1 text-yellow-500">
            {[...Array(review.rating || 5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          <p className="text-gray-700 dark:text-gray-300 italic mb-4">"{review.reviewText}"</p>
          <p className="font-semibold text-[#239BA7] dark:text-[#CADCAE]">
            - {review.payerName || "Anonymous"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{review.trainer}</p>
        </div>
      ))}
    </div>

    {/* Right Arrow */}
    <button
      onClick={handleNext}
      className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#239BA7] dark:bg-[#7ADAA5] text-white rounded-full p-2 md:p-3 hover:bg-[#7ADAA5] dark:hover:bg-[#239BA7] transition z-10"
      aria-label="Next"
    >
      <FaArrowRight />
    </button>
  </div>
</section>

  );
};

export default Testimonial;
