import React from "react";
import { Link, useLoaderData, useNavigation } from "react-router-dom";

const List = () => {
  const dataLoader = useLoaderData();
  const navigation = useNavigation();
  console.log(dataLoader)
  if (navigation.state === "loading") {
    return <h2>Loding stage.......</h2>;
  }
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Browse Roommate Listings
      </h1>

      {dataLoader.length === 0 ? (
        <p className="text-center text-gray-600">No listings found.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-100 text-gray-700 text-left">
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Room Type</th>
                  <th className="px-6 py-3">Rent</th>
                  <th className="px-6 py-3">See More</th>
                </tr>
              </thead>
              <tbody>
                {dataLoader.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-6 py-4">{item.userName}</td>
                    <td className="px-6 py-4">{item.location}</td>
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

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {dataLoader.map((item) => (
              <div
                key={item._id}
                className="border p-4 rounded-md shadow bg-white"
              >
                <p>
                  <span className="font-semibold">Name:</span> {item.userName}
                </p>
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {item.location}
                </p>
                <p>
                  <span className="font-semibold">Room Type:</span>{" "}
                  {item.roomType}
                </p>
                <p>
                  <span className="font-semibold">Rent:</span> $
                  {item.rentAmount}
                </p>

                <div className="mt-4">
                  <Link
                    to={`/details/${item._id}`}
                    className="block bg-blue-600 text-white text-center px-4 py-2 rounded hover:bg-blue-700"
                  >
                    See More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default List;
