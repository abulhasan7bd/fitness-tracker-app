import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const List = () => {
  const dataLoader = useLoaderData();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        🏡 Browse Roommate Listings
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-100 text-gray-700 text-left">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Age</th>
              <th className="px-6 py-3">Room Type</th>
              <th className="px-6 py-3">Rent</th>
              <th className="px-6 py-3">See More</th>
            </tr>
          </thead>
          <tbody>
            {dataLoader.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-blue-50 transition-colors"
              >
                <td className="px-6 py-4">{item.userName}</td>
                <td className="px-6 py-4">{item.location}</td>
                <td className="px-6 py-4">{item.age || "N/A"}</td>
                <td className="px-6 py-4">{item.roomType}</td>
                <td className="px-6 py-4">${item.rentAmount}</td>
                <td className="px-6 py-4">
                  <Link
                    to={`/details/${item._id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    See More
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
