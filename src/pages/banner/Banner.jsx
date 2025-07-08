import React from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1584467735871-a1939c925f4e",
    title: "Transform Your Body, Transform Your Life",
    description:
      "Join our professional fitness classes and become a better version of yourself. Strength. Stamina. Confidence.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1579758629938-03608ccdbaba",
    title: "Train Hard, Stay Fit",
    description:
      "Unleash your potential with our expert trainers and modern equipment.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07b",
    title: "Your Journey Starts Here",
    description:
      "Fitness is not a destination, it's a way of life. Start today!",
  },
];

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Slider {...settings}>
      {slides.map((slide) => (
        <div key={slide.id}>
          <div
            className="hero min-h-[80vh] bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay bg-black bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content px-4">
              <div className="max-w-2xl">
                <h1 className="mb-5 text-4xl md:text-5xl font-bold">
                  {slide.title}
                </h1>
                <p className="mb-6 text-lg">{slide.description}</p>
                <Link to="/classes">
                  <button className="btn btn-primary px-6 text-white text-base">
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
