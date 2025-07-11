import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classData from "./classes.json";

const CLASSES_PER_PAGE = 6;

const Classes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedClasses, setPaginatedClasses] = useState([]);

  const totalPages = Math.ceil(classData.length / CLASSES_PER_PAGE);

  useEffect(() => {
    const start = (currentPage - 1) * CLASSES_PER_PAGE;
    const end = start + CLASSES_PER_PAGE;
    setPaginatedClasses(classData.slice(start, end));
  }, [currentPage]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">All Classes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedClasses.map((classItem) => (
          <div
            key={classItem.id}
            className="bg-white shadow-md rounded-xl p-6 space-y-4"
          >
            <h2 className="text-2xl font-semibold">{classItem.title}</h2>
            <p className="text-gray-700">{classItem.description}</p>

            <div>
              <h3 className="font-medium text-gray-800 mb-2">
                Trainers (up to 5):
              </h3>
              <div className="flex gap-3 flex-wrap">
                {classItem.trainers.slice(0, 5).map((trainer) => (
                  <Link
                    key={trainer.id}
                    to={`/trainers/${trainer.id}`}
                    className="hover:scale-105 transition"
                  >
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      title={trainer.name}
                      className="w-14 h-14 rounded-full object-cover border"
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
            className={`px-4 py-2 rounded-full ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Classes;
