import React from "react";
import UseAxios from "../../../hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const BookedTrainer = () => {
  const axiosSecure = UseAxios();
  const navigate = useNavigate();
  const {
    data: trainers = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["beatrainer"],
    queryFn: async () => {
      const res = await axiosSecure.get("/approved-trainers");
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
    return <p className="text-center mt-10">No trainers available.</p>;

  const handleBookNow = (trainer) => {
   navigate(`/trainers/${trainer._id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <h2 className="text-xl font-bold mb-6 text-center">Book Your Trainer</h2>

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

          {/* Right Column: Slots + Book Now */}
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

            <div className="mt-4">
              <button
                onClick={() => handleBookNow(trainer)}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookedTrainer;
