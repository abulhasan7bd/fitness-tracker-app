import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseSecure from "./../../hooks/UseSecure";
import ForBidden from "../errorPage/ForBidden";
import LoadingSpiner from "../loading/LoadingSpiner";

const Feature_Classes = () => {
  const useAxiso = UseSecure();
  const token = localStorage.getItem("access-token");

  const {
    data: classData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await useAxiso.get("/classes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.result;
    },
  });
  if (isLoading) {
    return <LoadingSpiner />;
  }

  if (error) {
    return <ForBidden />;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🏆 Featured Classes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {classData.map((cls) => (
            <div
              key={cls._id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                {cls.category}
              </h3>
              <p className="text-gray-600 mb-3">{cls.details}</p>
              <span className="text-sm text-green-600 font-medium">
                📈 {cls.bookingCount} Bookings
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature_Classes;
