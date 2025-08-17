import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import UseAxios from "../../hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

const AlltrainerPage = () => {
  const useAxios = UseAxios();
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await useAxios.get("/approved-trainers");
      return res.data;
    },
  });

useEffect(() => {
  if (!data) return;

  let sorted = [...data]; // copy to avoid mutation

  if (sortOrder === "low") {
    sorted.sort((a, b) => a.price - b.price); // low → high
  } else if (sortOrder === "high") {
    sorted.sort((a, b) => b.price - a.price); // high → low
  }

  setSortedProducts(sorted);
}, [sortOrder, data]);


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
    return (
      <h2 className="text-center text-xl text-gray-500 py-10">Loading...</h2>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error.message}</p>;
  }

  return (
    <>
      <Helmet>
        <title>FitTrack | All Trainers Page</title>
      </Helmet>

      <section
        className="max-w-7xl mx-auto px-4 py-12 
    bg-gradient-to-b from-white to-[#7ADAA5]/20 
    dark:from-gray-900 dark:to-gray-800 
    transition-colors duration-300 mb-[2rem]"
      >
        {/* Title */}
        <h2
          className="text-3xl font-bold text-center mb-10 
      text-[#239BA7] dark:text-[#CADCAE]"
        >
          Meet All Our Trainers
        </h2>

        {/* Sort Dropdown */}
        <div>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-[#CADCAE]/50 px-3 py-2 rounded-lg 
        bg-white dark:bg-gray-700 
        text-gray-800 dark:text-gray-100
        focus:outline-none focus:ring-2 focus:ring-[#239BA7] transition"
          >
            <option value="">Sort By Price</option>
            <option value="low">Low Price</option>
            <option value="high">High Price</option>
          </select>
        </div>

        {/* Empty State */}
        {data?.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-300 text-lg py-20">
            <p
              className="bg-white dark:bg-gray-700 shadow-md p-6 rounded-xl 
          inline-block text-gray-700 dark:text-gray-100 
          text-xl font-medium"
            >
              No trainer available at the moment. Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 xl:gap-10">
            {sortedProducts?.map((trainer, id) => (
              <div
                key={id}
                className="relative bg-white dark:bg-gray-800 
              rounded-xl shadow-lg p-6 text-center flex gap-8 
              border border-[#CADCAE]/40 dark:border-[#239BA7]/40
              transition-colors"
              >
                {/* Price Tag */}
                <p
                  className="absolute top-0 right-0 
              bg-gradient-to-r from-[#239BA7] to-[#7ADAA5] 
              text-white text-sm font-semibold px-2 py-1 rounded-bl shadow-md"
                >
                  ${trainer.price}
                </p>

                {/* Social Icons */}
                <div
                  className="absolute top-1/2 left-4 -translate-y-1/2 
              flex flex-col gap-3 text-[#239BA7] text-lg"
                >
                  {icons.map((item, index) => (
                    <Link
                      key={index}
                      to={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="border border-[#CADCAE] p-2 rounded-full 
        inline-flex items-center justify-center 
        text-[#239BA7] dark:text-[#CADCAE] 
        hover:bg-[#7ADAA5] hover:text-white 
        transition cursor-pointer bg-gradient-to-r from-[#e5e5e6] to-[#8cf8cb36]"
                    >
                      {item.icon}
                    </Link>
                  ))}
                </div>

                {/* Trainer Info */}
                <div className="flex-1">
                  <div
                    className="w-32 h-32 mx-auto mb-4 rounded-full p-[3px] 
                bg-gradient-to-tr from-[#239BA7] via-[#7ADAA5] to-[#CADCAE]"
                  >
                    <img
                      src={trainer.profileImage}
                      alt={trainer.fullName}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  <h3 className="text-xl font-semibold text-[#239BA7] dark:text-[#7ADAA5] mb-1">
                    {trainer.fullName}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Experience: {trainer.duration}
                  </p>

                  <div className="flex justify-center flex-wrap gap-2 mb-4">
                    {trainer.availableDays?.map((day, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#CADCAE]/20 text-[#239BA7] 
                      border border-[#CADCAE] rounded-full text-sm 
                      dark:bg-gray-700 dark:text-[#7ADAA5]"
                      >
                        {day}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/trainers/${trainer._id || trainer.email}`}
                    className="inline-block border px-8 py-2 rounded-3xl 
                  bg-gradient-to-r from-[#239BA7] to-[#7ADAA5] 
                  text-white hover:brightness-110 transition"
                  >
                    Know More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default AlltrainerPage;
