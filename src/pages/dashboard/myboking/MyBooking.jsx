import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";
import UseAuth from "../../../hooks/UseAuth";
import ReviewModal from "./ReviewModal";

const MyBooking = () => {
  const { user } = UseAuth();
  const email = user?.email;
  const axiosSecure = UseAxios();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind md: 768px
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleReview = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load bookings.</p>
    );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center md:text-left">My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : isMobile ? (
        // Mobile Card Layout
        <div className="space-y-6">
          {bookings.map((booking, index) => (
            <div
              key={booking._id}
              className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
            >
              <div className="mb-2 text-sm text-gray-600">#{index + 1}</div>
              <p className="font-semibold text-blue-700">Trainer: {booking.trainer}</p>
              <p>Slot: {booking.slot}</p>
              <p>Package: {booking.packageName}</p>
              <p>Price: ${booking.price}</p>
              <p className="text-sm text-gray-600">
                Date: {new Date(booking.date).toLocaleDateString()}
              </p>
              <p className="text-sm">
                Status:{" "}
                <span
                  className={`px-2 py-1 rounded text-white text-xs ${
                    booking.status === "paid" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {booking.status}
                </span>
              </p>
              {booking.status === "paid" && (
                <button
                  onClick={() => handleReview(booking)}
                  className="mt-3 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  Leave Review
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        // Desktop Table Layout
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300">
            <thead className="bg-[#301e4e] text-white">
              <tr>
                <th>#</th>
                <th>Trainer</th>
                <th>Slot</th>
                <th>Package</th>
                <th>Price</th>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id} className="text-center border-b">
                  <td>{index + 1}</td>
                  <td>{booking.trainer}</td>
                  <td>{booking.slot}</td>
                  <td>{booking.packageName}</td>
                  <td>${booking.price}</td>
                  <td className="text-sm">{booking.transactionId}</td>
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                  <td>
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
                  <td>
                    {booking.status === "paid" && (
                      <button
                        onClick={() => handleReview(booking)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                      >
                        Leave Review
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Review Modal */}
      {modalOpen && selectedBooking && (
        <ReviewModal
          booking={selectedBooking}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MyBooking;

