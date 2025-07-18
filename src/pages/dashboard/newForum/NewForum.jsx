import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UseAuth from "../../../hooks/UseAuth";
import UseAdmin from "../../../hooks/UseAdmin";
import UseAxios from "../../../hooks/UseAxios";

const NewForum = () => {
  const { userInfo } = UseAdmin();
  const role_info = userInfo?.[0];
  const useAxios = UseAxios();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newForum = {
      title: formData.title,
      content: formData.content,
      role_info,
      votes: {
        up: [],
        down: [],
      },
      createdAt: new Date(),
    };

    try {
      const res = await useAxios.post("/forums", newForum);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Forum created successfully!", "success");
        navigate("/forum");
      }
    } catch (err) {
      console.error("Error posting forum:", err);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6">📝 Add New Forum</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Forum Title</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            placeholder="e.g. Best home workout equipment?"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Forum Content</label>
          <textarea
            name="content"
            required
            value={formData.content}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded h-32"
            placeholder="Write your forum description here..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Post Forum
        </button>
      </form>
    </div>
  );
};

export default NewForum;
