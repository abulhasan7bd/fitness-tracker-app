import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";
import UseAuth from "../../../hooks/UseAuth";

const MyBooking = () => {
  const { user } = UseAuth();
  const email = user?.email;
  const axiosSecure = UseAxios();
  const {
    data: bookings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-bookings", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/mybooking?email=${email}`);
      return res.data;
    },
  });

  console.log(bookings)
  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load bookings.</p>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300">
            <thead className="bg-[#301e4e] text-white">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Trainer</th>
                <th className="px-4 py-2">Slot</th>
                <th className="px-4 py-2">Package</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Transaction ID</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id} className="text-center border-b">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{booking.trainer}</td>
                  <td className="px-4 py-2">{booking.slot}</td>
                  <td className="px-4 py-2">{booking.packageName}</td>
                  <td className="px-4 py-2">${booking.price}</td>
                  <td className="px-4 py-2 text-sm">{booking.transactionId}</td>
                  <td className="px-4 py-2">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        booking.status === "paid"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBooking;
