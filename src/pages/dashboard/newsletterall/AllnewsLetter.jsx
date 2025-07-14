import React from "react";
 import UseAxios from "../../../hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";
   

const AllNewsLetter = () => {
  const useAxios = UseAxios();

  const { data: subscribers = [], isLoading, error } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      const res = await useAxios.get("/subscriptions");
      return res.data;
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
        All Newsletter Subscribers
      </h2>

      {isLoading && <p className="text-center">Loading...</p>}
      {error && (
        <p className="text-center text-red-500">Failed to load data.</p>
      )}

      {!isLoading && subscribers.length === 0 && (
        <p className="text-center">No subscribers found.</p>
      )}

      {!isLoading && subscribers.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 border">#</th>
                <th className="py-2 px-4 border text-left">Name</th>
                <th className="py-2 px-4 border text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber, index) => (
                <tr key={subscriber._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border text-center">{index + 1}</td>
                  <td className="py-2 px-4 border">{subscriber.name}</td>
                  <td className="py-2 px-4 border">{subscriber.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllNewsLetter;
