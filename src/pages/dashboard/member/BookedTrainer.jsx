import React, { useState } from "react";
import UseAxios from "../../../hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";
import ReviewModal from "./ReviewModal";

const BookedTrainer = () => {
  const axiosSecure = UseAxios();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const {
    data: trainers = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["beatrainer"],
    queryFn: async () => {
      const res = await axiosSecure.get("/beatrainer");
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-center mt-10">Loading trainers...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-600">
        Error loading trainers: {error.message}
      </p>
    );

  if (trainers.length === 0)
    return <p className="text-center mt-10">No booked trainers found.</p>;

  const openReviewModal = (trainer) => {
    setSelectedTrainer(trainer);
    setModalOpen(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8">
      <h2 className="text-xl font-bold mb-6 text-center">
        Your Booked Trainers
      </h2>

      {trainers.map((trainer) => (
        <div
          key={trainer._id}
          className="border p-6 rounded shadow-md grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
        >
          {/* Left Column: Profile Image + Basic Info */}
          <div className="flex flex-col items-center space-y-4">
            <img
              src={trainer.profileImage}
              alt={trainer.fullName}
              className="w-28 h-28 rounded-full object-cover"
            />
            <p>
              <strong>Age:</strong> {trainer.age}
            </p>
            <p>
              <strong>University:</strong> {trainer.university}
            </p>
            <p>
              <strong>Passing Year:</strong> {trainer.passingYear}
            </p>
            <p>
              <strong>Company:</strong> {trainer.company}
            </p>
          </div>

          {/* Right Column: Slots + Review Button */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="font-semibold mb-2">Available Slots:</h3>
              <p>
                <strong>Days:</strong> {trainer.availableDays?.join(", ")}
              </p>
              <p>
                <strong>Time:</strong> {trainer.availableTime}
              </p>
            </div>

            <button
              onClick={() => openReviewModal(trainer)}
              className="mt-4 self-start px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Leave a Review
            </button>
          </div>
        </div>
      ))}

      {/* Review Modal */}
      {modalOpen && (
        <ReviewModal
          onClose={() => setModalOpen(false)}
          trainer={selectedTrainer}
        />
      )}
    </div>
  );
};

export default BookedTrainer;
