import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import ForBidden from "../errorPage/ForBidden";
import LoadingSpiner from "../loading/LoadingSpiner";
import UseAxios from "./../../hooks/UseAxios";
import UseSecure from "../../hooks/UseSecure";

const CLASSES_PER_PAGE = 6;

const Classes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const useSecure = UseSecure();
  const useAxiso = UseAxios();
  const navigate = useNavigate();

  const {
    data: classData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await useSecure.get("/classesall");
      return res.data.result;
    },
  });

  const { data: trainers = [] } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await useAxiso.get("/approved-trainers");
      return res.data;
    },
  });
 
  // Pagination logic
  const filteredClasses = classData.filter((cls) =>
    cls.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClasses.length / CLASSES_PER_PAGE);
  const paginatedClasses = filteredClasses.slice(
    (currentPage - 1) * CLASSES_PER_PAGE,
    currentPage * CLASSES_PER_PAGE
  );

  const handleLink = (trainer, classItem) => {
    console.log("classes",classItem)
    if (!trainer?._id) return;
    navigate(`/trainers/${trainer._id}`, {
      state: { classItem },
    });
  };

  if (error) {
    return <ForBidden />;
  }

  return (
    <>
      <Helmet>
        <title>FitTrack | All Claslsses</title>
      </Helmet>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
          All Classes
        </h1>

        {isLoading ? (
          <LoadingSpiner />
        ) : (
          <>
            <div className="mb-6 max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search by class category..."
                className="input input-bordered w-full"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedClasses.map((classItem) => (
                <div
                  key={classItem._id}
                  className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition space-y-4"
                >
                  <img
                    src={classItem.image}
                    alt={classItem.category}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <h2 className="text-xl font-semibold text-gray-800">
                    {classItem.category}
                  </h2>
                  <p className="text-sm text-gray-600">{classItem.details}</p>
                  <p className="text-sm text-gray-500">
                    Booking Count: {classItem.bookingCount}
                  </p>
                  <p className="text-sm text-gray-400">
                    Created At: {new Date(classItem.createdAt).toDateString()}
                  </p>

                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">
                      Trainers:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {trainers
                        ?.filter(
                          (trainer) => trainer.category === classItem.category
                        )
                        .slice(0, 5)
                        .map((trainer, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center"
                          >
                            <img
                              src={trainer.profileImage}
                              alt={trainer.name}
                              title={trainer.name}
                              className="w-12 h-12 rounded-full object-cover border-2 border-blue-400 cursor-pointer"
                              onClick={() => handleLink(trainer, classItem)}
                            />
                          </div>
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
    </>
  );
};

export default Classes;
