import React, { useState } from "react";
import Swal from "sweetalert2";
import UseAxios from "../../../hooks/UseAxios";

const ReviewModal = ({ booking, onClose }) => {
  const axiosSecure = UseAxios();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = {
      trainerId: booking,
      trainer: booking.trainer,
      userEmail: booking.userEmail,
      payerName: booking.payerName,
      rating,
      reviewText,
      date: new Date(),
    };

    console.log(review)
    try {
      await axiosSecure.post("/reviews", review);
      Swal.fire("Review Submitted!", "Thanks for your feedback.", "success");
      onClose();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not submit review", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded max-w-md w-full shadow-lg">
        <h3 className="text-lg font-bold mb-4">Leave a Review for {booking.trainer}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Rating (1 to 5)</label>
            <input
              type="number"
              value={rating}
              min="1"
              max="5"
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label>Your Feedback</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows="4"
              className="border p-2 rounded w-full"
              required
            ></textarea>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
