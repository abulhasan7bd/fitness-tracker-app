import React from "react";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    feedback:
      "I found my perfect roommate within a week! The lifestyle matching really worked.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Ahmed Khan",
    location: "Toronto, Canada",
    feedback:
      "Very easy to use and I loved the chat feature. It made communication simple.",
    rating: 4,
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Lina Gomez",
    location: "Madrid, Spain",
    feedback:
      "I was nervous about finding a roommate online, but this site made it trustworthy.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=3",
  },
];

const UserFeedback = () => {
  return (
    <section className="py-18 bg-gray-50" id="feedback">
      <div className="max-w-3xl mx-auto px-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Users Say 💬
        </h2>

        <Swiper
          modules={[ Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 5000 }}
       
          pagination={{ clickable: true }}
        >
          {testimonials.map((user, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-2xl py-[3rem] shadow-md p-6 mx-2 hover:shadow-lg transition duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-14 h-14 rounded-full border-2 border-blue-500"
                  />
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.location}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">"{user.feedback}"</p>
                <div className="flex text-yellow-400">
                  {Array(user.rating)
                    .fill()
                    .map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default UserFeedback;

