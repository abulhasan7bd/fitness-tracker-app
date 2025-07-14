import React from "react";
import Swal from "sweetalert2";
import UseAxios from "../../../hooks/UseAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
 

const TrainerDeletebyRole = () => {
  const useAxios = UseAxios();
  const queryClient = useQueryClient();

  // Load all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await useAxios.get("/users");
      return res.data;
    },
  });

  // Mutation: Remove trainer role (set to Member)
  const removeRoleMutation = useMutation({
    mutationFn: async (id) => {
      return await useAxios.patch(`/users/${id}`, { role: "Member" });
    },
    onSuccess: () => {
      Swal.fire("Removed!", "Trainer role has been removed.", "success");
      queryClient.invalidateQueries(["users"]);
    },
  });

  // Mutation: Enable trainer (set role to Trainer)
  const enableMutation = useMutation({
    mutationFn: async (id) => {
      return await useAxios.patch(`/users/${id}`, { role: "Trainer" });
    },
    onSuccess: () => {
      Swal.fire("Enabled!", "User has been promoted to Trainer.", "success");
      queryClient.invalidateQueries(["users"]);
    },
  });

  // Handlers
  const handleRemove = (id) => {
    Swal.fire({
      title: "Remove Trainer?",
      text: "This will revert the trainer to a regular member.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, remove",
    }).then((result) => {
      if (result.isConfirmed) {
        removeRoleMutation.mutate(id);
      }
    });
  };

  const handleEnable = (id) => {
    Swal.fire({
      title: "Enable Trainer?",
      text: "This will assign the Trainer role to the user.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, enable",
    }).then((result) => {
      if (result.isConfirmed) {
        enableMutation.mutate(id);
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">All Trainers</h2>

      {isLoading ? (
        <p className="text-center">Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="py-2 px-4 border">#</th>
                <th className="py-2 px-4 border">Photo</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Role</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) => user.role === "Trainer")
                .map((user, index) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border text-center">{index + 1}</td>
                    <td className="py-2 px-4 border">
                      <img
                        src={user.photoURL}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="py-2 px-4 border">{user.name}</td>
                    <td className="py-2 px-4 border">{user.email}</td>
                    <td className="py-2 px-4 border capitalize text-orange-600">
                      {user.role}
                    </td>
                    <td className="py-2 px-4 border space-x-2">
                      <button
                        onClick={() => handleEnable(user._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                      >
                        Enable
                      </button>
                      <button
                        onClick={() => handleRemove(user._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Remove
                      </button>
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

export default TrainerDeletebyRole;
