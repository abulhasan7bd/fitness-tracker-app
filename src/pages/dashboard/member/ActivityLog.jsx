import React, { useState } from "react";
import Modal from "./Modal";
import { FaEye } from "react-icons/fa";
import UseAxios from "../../../hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";
 

const ActivityLog = () => {
  const axiosSecure = UseAxios();
  const [selectedFeedback, setSelectedFeedback] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // ✅ TanStack Query দিয়ে ডেটা আনা
  const {
    data: applications = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trainerApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/beatrainer");
      return res.data;
    },
  });

  // ✅ Eye Icon ক্লিক করলে Modal খোলে
  const openModal = (feedback) => {
    setSelectedFeedback(feedback);
    setModalOpen(true);
  };

  // ✅ Loading & Error handle
  if (isLoading) return <p className="text-center">লোড হচ্ছে...</p>;
  if (error) return <p className="text-center text-red-500">ডেটা লোড করতে সমস্যা হয়েছে</p>;

  // ✅ Approved গুলা বাদ দিয়ে filter
  const filteredApplications = applications.filter(app => app.status !== "approved");

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Trainer Application Status</h2>

      {filteredApplications.length === 0 ? (
        <p className="text-gray-500">কোনো pending বা rejected আবেদন নেই।</p>
      ) : (
        <table className="w-full border text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app._id} className="border-t">
                <td className="p-2">{app.fullName}</td>
                <td className="p-2">{app.email}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-white capitalize ${
                      app.status === "rejected" ? "bg-red-500" : "bg-yellow-500"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="p-2">
                  {app.status === "rejected" && app.feedback && (
                    <button onClick={() => openModal(app.feedback)}>
                    yei
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h3 className="text-lg font-semibold mb-2">Rejection Feedback</h3>
          <p>{selectedFeedback}</p>
        </Modal>
      )}
    </div>
  );
};

export default ActivityLog;
