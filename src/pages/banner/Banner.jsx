import React from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const slides = [
  {
    id: 1,
    image:
      "https://plus.unsplash.com/premium_photo-1670505062582-fdaa83c23c9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zml0bmVzc3xlbnwwfHwwfHx8MA%3D%3D",
    title: "Transform Your Body, Transform Your Life",
    description:
      "Join our professional fitness classes and become a better version of yourself. Strength. Stamina. Confidence.",
  },
  {
    id: 2,
    image:
      "https://media.istockphoto.com/id/1286099942/photo/close-up-of-hand-touching-smartwatch-with-health-app-on-the-screen-gadget-for-fitness-active.webp?a=1&b=1&s=612x612&w=0&k=20&c=3hQz5H3ZEeL6HnntJIj8m1w6W9z4xDUlY7Z2dMQtlgM=",
    title: "Train Hard, Stay Fit",
    description:
      "Unleash your potential with our expert trainers and modern equipment.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zml0bmVzcyUyMGFwcHxlbnwwfHwwfHx8MA%3D%3D",
    title: "Your Journey Starts Here",
    description:
      "Fitness is not a destination, it's a way of life. Start today!",
  },
  {
    id: 4,
    image:
      "https://img.freepik.com/free-photo/portrait-male-athlete-using-smart-watch_23-2147839335.jpg?uid=R90026751&ga=GA1.1.302922754.1750408714&semt=ais_hybrid&w=740",
    title: "Track Your Progress in Real Time",
    description:
      "Smart fitness tracking with personalized insights to help you grow faster.",
  },
];

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Slider {...settings}>
      {slides.map((slide) => (
        <div key={slide.id}>
          <div
            className="relative h-[70vh] md:h-[80vh] w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

            {/* Text Content */}
            <div className="absolute inset-0 flex items-center justify-center text-center px-4">
              <div className="max-w-3xl text-white space-y-6">
                <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow-md">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl font-light drop-shadow-sm">
                  {slide.description}
                </p>
                <Link to="/classes">
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition duration-300">
                    View All Classes
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Banner;
