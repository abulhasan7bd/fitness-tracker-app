import React, { useState } from "react";
import Modal from "./Modal";
import { FaEye } from "react-icons/fa";

const dummyApplications = [
  { id: 1, status: "Pending", feedback: "" },
  { id: 2, status: "Rejected", feedback: "Lack of certification." },
  { id: 3, status: "Approved", feedback: "" } // Should be ignored
];

const ActivityLog = () => {
  const [selectedFeedback, setSelectedFeedback] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (feedback) => {
    setSelectedFeedback(feedback);
    setModalOpen(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Trainer Application Status</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th>ID</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dummyApplications.filter(app => app.status !== "Approved").map(app => (
            <tr key={app.id} className="border-t">
              <td>{app.id}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-white ${
                    app.status === "Rejected" ? "bg-red-500" : "bg-yellow-500"
                  }`}
                >
                  {app.status}
                </span>
              </td>
              <td>
                {app.status === "Rejected" && (
                  <button onClick={() => openModal(app.feedback)}>
                    <FaEye className="text-blue-600 hover:scale-110" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h3 className="text-lg font-semibold">Rejection Feedback</h3>
          <p className="mt-2">{selectedFeedback}</p>
        </Modal>
      )}
    </div>
  );
};

export default ActivityLog;