import React, { useState } from "react";

// Reusable Modal component
const Modal = ({ children, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose} // close when clicking outside
      />

      {/* Modal content */}
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div
          className="bg-white rounded-lg p-6 max-w-md w-full pointer-events-auto shadow-lg"
          onClick={(e) => e.stopPropagation()} // prevent close on modal content click
        >
          {children}
          <button
            onClick={onClose}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

// ReviewModal component
const ReviewModal = ({ onClose }) => {
  const [form, setForm] = useState({ rating: 0, comment: "" });

  const handleStarClick = (star) => {
    setForm((prev) => ({ ...prev, rating: star }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted review:\nRating: ${form.rating}\nComment: ${form.comment}`);
    // TODO: Replace alert with API call to save review
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <h3 className="text-lg font-semibold mb-2">Leave a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-1 text-3xl cursor-pointer">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleStarClick(star)}
              className={form.rating >= star ? "text-yellow-400" : "text-gray-300"}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          className="w-full border rounded p-2"
          placeholder="Write your feedback here..."
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          rows={4}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={form.rating === 0}
        >
          Submit Review
        </button>
      </form>
    </Modal>
  );
};

const dummyTrainer = {
  name: "Hasan Trainer",
  image: "https://via.placeholder.com/100",
  classes: ["Yoga", "Cardio"],
  slots: ["Mon 8AM", "Wed 6PM"],
  about: "Experienced in multiple fitness domains.",
};

const BookedTrainer = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Your Booked Trainer</h2>

      <div className="border p-4 rounded space-y-2">
        <img
          src={dummyTrainer.image}
          alt="Trainer"
          className="w-24 h-24 rounded-full"
        />
        <p>
          <strong>Name:</strong> {dummyTrainer.name}
        </p>
        <p>
          <strong>About:</strong> {dummyTrainer.about}
        </p>
        <p>
          <strong>Classes:</strong> {dummyTrainer.classes.join(", ")}
        </p>
        <p>
          <strong>Available Slots:</strong> {dummyTrainer.slots.join(", ")}
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Leave a Review
        </button>
      </div>

      {modalOpen && <ReviewModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default BookedTrainer;
