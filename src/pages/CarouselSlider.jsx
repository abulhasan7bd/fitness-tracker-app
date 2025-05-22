import React, { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "Find Your Perfect Roommate",
    description: "Match based on location, lifestyle, and budget.",
    image: "https://source.unsplash.com/800x400/?roommate,1",
  },
  {
    id: 2,
    title: "Connect Instantly",
    description: "Chat with potential roommates in real time.",
    image: "https://source.unsplash.com/800x400/?roommate,2",
  },
  {
    id: 3,
    title: "Safe & Trusted",
    description: "Verified users for peace of mind.",
    image: "https://source.unsplash.com/800x400/?roommate,3",
  },
];

const CarouselSlider = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const auto = setInterval(nextSlide, 5000);
    return () => clearInterval(auto);
  }, [index]);

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-xl shadow-lg">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-64 object-cover"
            />
            <div className="bg-white px-6 py-4 text-center">
              <h2 className="text-xl font-semibold">{slide.title}</h2>
              <p className="text-gray-600">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
      >
        ❯
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              index === i ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default CarouselSlider;
