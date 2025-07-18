import React from "react";
import UseAxios from "../../../hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
const AllTrainers = () => {
  const useAxios = UseAxios();
  const {
    data: trainers = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allTrainers"],
    queryFn: async () => {
      const res = await useAxios.get("/approved-trainers");
      return res.data;
    },
  });

  const queryClient = useQueryClient();

  const handleReject = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reject this trainer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await useAxios.patch(`/single-trainer/${id}`, {
          status: "rejected",
        });

        if (res.status === 200) {
          Swal.fire("Rejected!", "Trainer has been rejected.", "success");
          queryClient.invalidateQueries(["allTrainers"]);
        }
      } catch (error) {
        console.error("Failed to reject trainer:", error);
        Swal.fire("Error", "Failed to reject trainer", "error");
      }
    }
  };

  console.log(trainers);
  if (isLoading)
    return <p className="text-center mt-10">Loading trainers...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-600">
        Error loading trainers: {error.message}
      </p>
    );

  if (trainers.length === 0)
    return <p className="text-center mt-10">No trainers found.</p>;

  console.log("trainersxxx");
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">
        All Trainers {trainers.length}
      </h2>

      <div className="space-y-4 max-w-3xl mx-auto">
        {trainers.map((trainer) => (
          <div
            key={trainer._id}
            className="flex items-center justify-between border rounded p-4 bg-white shadow"
          >
            {/* Profile Image and Name */}
            <div className="flex items-center space-x-4">
              <img
                src={trainer.profileImage}
                alt={trainer.fullName}
                className="w-20 h-20 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold">{trainer.fullName}</h3>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => handleReject(trainer._id)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTrainers;
