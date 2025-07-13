import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";

const ApplyedTrainer = () => {
  const useAxios = UseAxios();
  const {
    data: trainers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pending"],
    queryFn: async () => {
      const res = await useAxios.get("/pending-trainers");
      return res.data;
    },
  });

  console.log(trainers);

  const handleAction = () => {
    // mutation.mutate({ id, action });
  };

  if (isLoading) return <div>Loading trainers...</div>;
  if (error) return <div>Error loading trainers.</div>;

  return (
  <div className="p-4">
  <h2 className="text-2xl font-bold mb-4">Pending Trainers</h2>
  {trainers.length === 0 && <p>No pending trainers found.</p>}
  <div className="space-y-6">
    {trainers.map((trainer) => (
      <div
        key={trainer._id}
        className="border p-4 rounded shadow flex items-center justify-between"
      >
        {/* Left side: Image and details */}
        <div className="flex items-center space-x-4">
          <img
            src={trainer.profileImage}
            alt={trainer.fullName}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold">{trainer.fullName}</h3>
            <p>Email: {trainer.email}</p>
            <p>Skills: {trainer.skills.join(", ")}</p>
            <p>Available Days: {trainer.availableDays.join(", ")}</p>
            <p>Available Time: {trainer.availableTime}</p>
            <p>Status: {trainer.status}</p>
          </div>
        </div>

        {/* Right side: Action buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => handleAction(trainer._id, "accept")}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Accept
          </button>
          <button
            onClick={() => handleAction(trainer._id, "reject")}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          >
            Reject
          </button>
          <button
            onClick={() => handleAction(trainer._id, "delete")}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default ApplyedTrainer;
