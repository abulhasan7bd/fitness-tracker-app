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
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">All Classes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedClasses.slice(0,6).map((classItem) => (
          <div
            key={classItem.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition space-y-4"
          >
            <h2 className="text-xl font-semibold text-gray-800">{classItem.title}</h2>
            <p className="text-sm text-gray-600">{classItem.description}</p>
            <p className="text-sm text-gray-500">Schedule: {classItem.schedule}</p>
            <p className="text-sm text-gray-500">Level: {classItem.level}</p>

            <div>
              <h3 className="font-medium text-gray-700 mb-2">Trainers:</h3>
              <div className="flex flex-wrap gap-2">
                {classItem.trainers.slice(0, 5).map((trainer) => (
                  <Link
                    key={trainer.id}
                    to={`/trainers/${trainer.id}`}
                    className="hover:scale-105 transition"
                  >
                    <img
                      src={trainer.photo} 
                      alt={trainer.name}
                      title={trainer.name}
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
    </div>
  );
};

export default Classes;
