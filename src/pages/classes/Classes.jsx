import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../hooks/UseAxios";

const CLASSES_PER_PAGE = 6;

const allClassNames = [
  "Yoga",
  "Zumba",
  "Cardio",
  "Strength",
  "HIIT",
  "Meditation",
  "Pilates",
  "Boxing",
];

const Classes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const useAxios = UseAxios();

  // Fetch all trainers from server
  const {
    data: trainers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await useAxios.get("/beatrainer");
      return res.data;
    },
  });

  // Derive classes from trainer skills
  const classData = allClassNames.map((className, index) => {
    const classTrainers = trainers
      .filter((trainer) => trainer.skills?.includes(className))
      .slice(0, 5);
    return {
      id: `class-${index}`,
      title: className,
      description: `Join our top-rated ${className} class and improve your fitness.`,
      schedule: "Mon - Fri, 10 AM - 6 PM",
      level: "All Levels",
      trainers: classTrainers,
    };
  });

  // Pagination
  const totalPages = Math.ceil(classData.length / CLASSES_PER_PAGE);
  const paginatedClasses = classData.slice(
    (currentPage - 1) * CLASSES_PER_PAGE,
    currentPage * CLASSES_PER_PAGE
  );

  if (error) {
    return <p className="text-red-300">{error.message}</p>;
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
        All Classes
      </h1>

      {isLoading ? (
        <p className="text-center">Loading classes...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedClasses.map((classItem) => (
              <div
                key={classItem.id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition space-y-4"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {classItem.title}
                </h2>
                <p className="text-sm text-gray-600">{classItem.description}</p>
                <p className="text-sm text-gray-500">
                  Schedule: {classItem.schedule}
                </p>
                <p className="text-sm text-gray-500">
                  Level: {classItem.level}
                </p>

                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Trainers:</h3>
                  <div className="flex flex-wrap gap-2">
                    {classItem.trainers.map((trainer) => (
                      <Link
                        key={trainer._id}
                        to={`/trainers/${trainer._id}`}
                        className="hover:scale-105 transition"
                      >
                        <img
                          src={trainer.profileImage}
                          alt={trainer.fullName}
                          title={trainer.fullName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10 space-x-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-full font-medium ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Classes;
