import React from "react";
import Swal from "sweetalert2";
import UseAxios from "../../../hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";
 
const DeletedTrainerList = () => {
  const useAxios = UseAxios();

  // Load deleted trainers
  const { data: trainers = [], isLoading } = useQuery({
    queryKey: ["deletedTrainers"],
    queryFn: async () => {
      const res = await useAxios.get("/deleted-trainers");
      return res.data;
    },
  });

  console.log(trainers)
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Deleted Trainers</h2>

      {isLoading ? (
        <p className="text-center">Loading deleted trainers...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="py-2 px-4 border">#</th>
                <th className="py-2 px-4 border">Photo</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Status</th>
             
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer, index) => (
                <tr key={trainer._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border text-center">{index + 1}</td>
                  <td className="py-2 px-4 border">
                    <img
                      src={trainer.profileImage}
                      alt={trainer.fullName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-2 px-4 border">{trainer.fullName}</td>
                  <td className="py-2 px-4 border">{trainer.email}</td>
                  <td className="py-2 px-4 border capitalize text-red-500">
                    {trainer.status}
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

export default DeletedTrainerList;
