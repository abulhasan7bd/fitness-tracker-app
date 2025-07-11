import React, { useState } from "react";
import Modal from "./Modal";

const ReviewModal = ({ onClose }) => {
  const [form, setForm] = useState({ rating: 0, comment: "" });

  const handleStarClick = (star) => {
    setForm((prev) => ({ ...prev, rating: star }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted review:\nRating: ${form.rating}\nComment: ${form.comment}`);
    // Here you can add API call to save the review
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={form.rating === 0}
        >
          Submit Review
        </button>
      </form>
    </Modal>
  );
};

export default ReviewModal;
