import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";
import Swal from "sweetalert2";

const ApplyedTrainer = () => {
  const useAxios = UseAxios();
  const queryClient = useQueryClient();

  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [feedback, setFeedback] = useState("");

  const {
    data: trainers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pending"],
    queryFn: async () => {
      const res = await useAxios.get("/pending-trainers");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ id, email, status, feedback }) => {
      const res = await useAxios.patch(`/single-trainer/${id}`, { email, status, feedback });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Trainer status updated successfully.", "success");
      queryClient.invalidateQueries(["pending"]);
      setSelectedTrainer(null);
      setFeedback("");
    },
    onError: () => {
      Swal.fire("Error", "Failed to update trainer status.", "error");
    },
  });

  const handleRejectClick = (trainer) => {
    setSelectedTrainer(trainer);
    setFeedback("");
  };

  const handleRejectSubmit = () => {
    if (!feedback.trim()) {
      Swal.fire("Feedback required", "Please provide feedback for rejection.", "warning");
      return;
    }

    mutation.mutate({
      id: selectedTrainer._id,
      email: selectedTrainer.email,
      status: "rejected",
      feedback,
    });
  };

  if (isLoading) return <div>Loading trainers...</div>;
  if (error) return <div>Error loading trainers.</div>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Applied Trainers</h2>
      {trainers.length === 0 ? (
        <p className="text-gray-600">No pending trainers found.</p>
      ) : (
        <div className="space-y-6">
          {trainers.map((trainer) => (
            <div
              key={trainer._id}
              className="border p-4 rounded shadow flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={trainer.profileImage}
                  alt={trainer.fullName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold">{trainer.fullName}</h3>
                  <p>Email: {trainer.email}</p>
                  <p>Skills: {trainer.skills?.join(", ")}</p>
                  <p>Available Days: {trainer.availableDays?.join(", ")}</p>
                  <p>Available Time: {trainer.availableTime}</p>
                  <p>Status: <span className="capitalize font-semibold text-blue-600">{trainer.status}</span></p>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <button
                  onClick={() =>
                    mutation.mutate({
                      id: trainer._id,
                      email: trainer.email,
                      status: "approved",
                      feedback: "",
                    })
                  }
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRejectClick(trainer)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reject Modal */}
      {selectedTrainer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md max-w-lg w-full relative">
            <button
              onClick={() => setSelectedTrainer(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-2">Reject Trainer</h2>
            <div className="mb-2">
              <p><strong>Name:</strong> {selectedTrainer.fullName}</p>
              <p><strong>Email:</strong> {selectedTrainer.email}</p>
              <p><strong>Skills:</strong> {selectedTrainer.skills?.join(", ")}</p>
              <p><strong>Bio:</strong> {selectedTrainer.bio}</p>
            </div>
            <textarea
              className="w-full border p-2 rounded mt-2"
              rows="4"
              placeholder="Enter feedback for rejection"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <button
              onClick={handleRejectSubmit}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Submit Rejection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyedTrainer;
