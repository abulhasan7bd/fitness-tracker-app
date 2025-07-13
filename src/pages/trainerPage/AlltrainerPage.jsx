import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import UseAxios from "../../hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";
const AlltrainerPage = () => {
  const useAxios = UseAxios();
  const { data, isLoading, error } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await useAxios.get("/beatrainer");
      return res.data;
    },
  });
  console.log(data);
  const icons = [
    {
      icon: <FaFacebookF color="#1f1235" />,
      url: "https://facebook.com/username",
    },
    {
      icon: <FaInstagram color="#1f1235" />,
      url: "https://instagram.com/username",
    },
    {
      icon: <FaTwitter color="#1f1235" />,
      url: "https://twitter.com/username",
    },
  ];
  if (isLoading) {
    return <h2>Loading.....</h2>;
  }
  if (error) {
    return <p className="text-red-300">{error.message}</p>;
  }
  return (
  
    <section className="max-w-7xl mx-auto px-4 py-12 bg-gradient-to-b from-white to-[rgba(239,68,68,0.2)]">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Meet All Our Trainers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((trainer) => (
          <div
            key={trainer.email}
            className="relative bg-white rounded-xl shadow-lg p-6 text-center flex gap-4"
          >
            {/* Social Icons */}
            <div className="absolute top-1/2 left-4 -translate-y-1/2 flex flex-col gap-3 text-[#ef4444] text-lg">
              {(icons || []).map((item, index) => (
                <Link
                  key={index}
                  to={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-[#1b1325] p-2 rounded-full inline-flex items-center justify-center text-[#1b1325] hover:bg-[#ef4444] hover:text-white transition cursor-pointer"
                >
                  {item.icon}
                </Link>
              ))}
            </div>

            {/* Trainer Info */}
            <div className="flex-1">
              {/* Profile Image with Gradient Border */}
              <div className="w-32 h-32 mx-auto mb-4 rounded-full p-[3px] bg-gradient-to-tr from-red-400 via-pink-500 to-yellow-400">
                <img
                  src={trainer.profileImage}
                  alt={trainer.fullName}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <h3 className="text-xl font-semibold text-blue-600 mb-1">
                {trainer.fullName}
              </h3>
              <p className="text-gray-600 mb-2">
                Experience: {trainer.duration}
              </p>

              {/* Available Days */}
              <div className="flex justify-center flex-wrap gap-2 mb-4">
                {trainer.availableDays?.map((day, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 text-gray-700 border border-gray-300 rounded-full text-sm"
                  >
                    {day}
                  </span>
                ))}
              </div>

              {/* Know More Button */}
              <Link
                to={`/trainers/${trainer._id || trainer.email}`}
                className="inline-block border px-8 py-2 rounded-3xl bg-[#ef4444] text-white hover:bg-[#dc2626] transition"
              >
                Know More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AlltrainerPage;
