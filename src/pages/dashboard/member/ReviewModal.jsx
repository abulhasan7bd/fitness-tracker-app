import React, { useState } from "react";
import Modal from "./Modal";
import UseAuth from "../../../hooks/UseAuth";
import Swal from "sweetalert2";
import UseAxios from "../../../hooks/UseAxios";

const ReviewModal = ({ onClose }) => {
  const { user } = UseAuth();
  const [form, setForm] = useState({ rating: 0, comment: "" });
  const [loading, setLoading] = useState(false);
  const useAxios = UseAxios();
  const handleStarClick = (star) => {
    setForm((prev) => ({ ...prev, rating: star }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.rating === 0) {
      Swal.fire("Oops!", "Please select a rating", "warning");
      return;
    }

    const review = {
      userName: user?.displayName || "Anonymous",
      comment: form.comment,
      rating: form.rating,
    };

    try {
      setLoading(true);
      const res = await useAxios.post("/review", review);
      console.log(res);

      Swal.fire({
        icon: "success",
        title: "Review Submitted!",
        text: "Thank you for your feedback.",
        timer: 2000,
        showConfirmButton: false,
      });

      setForm({ rating: 0, comment: "" }); // ফর্ম রিসেট
      onClose(); // মডাল বন্ধ
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to submit review.", "error");
    } finally {
      setLoading(false);
    }
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
              className={
                form.rating >= star ? "text-yellow-400" : "text-gray-300"
              }
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
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={form.rating === 0 || loading}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </Modal>
  );
};

export default ReviewModal;
