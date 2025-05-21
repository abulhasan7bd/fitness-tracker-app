import React from "react";
import { useNavigate } from "react-router-dom";

const AddComponents = () => {
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Convert checkbox values from string to boolean
    data.pets = formData.get("pets") === "on";
    data.smoking = formData.get("smoking") === "on";
    data.nightOwl = formData.get("nightOwl") === "on";
    data.availability = formData.get("availability") === "on";
    data.rentAmount = parseFloat(data.rentAmount);

    // Group lifestylePreferences
    data.lifestylePreferences = {
      pets: data.pets,
      smoking: data.smoking,
      nightOwl: data.nightOwl,
    };

    // Remove flat values
    delete data.pets;
    delete data.smoking;
    delete data.nightOwl;
    console.log(data)
fetch("http://localhost:5000/roommateadd", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(result => {
    console.log("Server response:", result);
    navigate("/")
  })
  .catch(err => {
    console.error("Fetch error:", err.message);
  });

  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-base-200 p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Add Roommate Post
        </h2>

        <label className="label">Title</label>
        <input
          type="text"
          name="title"
          className="input w-full"
          placeholder="Post title"
          required
        />

        <label className="label">Location</label>
        <input
          type="text"
          name="location"
          className="input w-full"
          placeholder="City/Area"
          required
        />

        <label className="label">Rent Amount ($)</label>
        <input
          type="number"
          name="rentAmount"
          className="input w-full"
          placeholder="1200"
          required
        />

        <label className="label">Room Type</label>
        <select name="roomType" className="select w-full" required>
          <option value="">Select type</option>
          <option value="Single">Single</option>
          <option value="Shared">Shared</option>
        </select>

        <label className="label">Lifestyle Preferences</label>
        <div className="flex gap-4 mb-2">
          <label className="flex items-center gap-1">
            <input type="checkbox" name="pets" /> Pets
          </label>
          <label className="flex items-center gap-1">
            <input type="checkbox" name="smoking" /> Smoking
          </label>
          <label className="flex items-center gap-1">
            <input type="checkbox" name="nightOwl" /> Night Owl
          </label>
        </div>

        <label className="label">Description</label>
        <textarea
          name="description"
          className="textarea w-full"
          placeholder="Write something..."
          required
        />

        <label className="label">Contact Info</label>
        <input
          type="text"
          name="contactInfo"
          className="input w-full"
          placeholder="Phone or email"
          required
        />

        <label className="flex items-center gap-2 my-2">
          <input type="checkbox" name="availability" defaultChecked />
          Available
        </label>

        {/* Read-Only Fields */}
        <label className="label">User Email (Read-only)</label>
        <input
          type="email"
          name="userEmail"
          className="input w-full"
          value="john.doe@example.com"
          readOnly
        />

        <label className="label">User Name (Read-only)</label>
        <input
          type="text"
          name="userName"
          className="input w-full"
          value="John Doe"
          readOnly
        />

        <button type="submit" className="btn btn-primary w-full mt-4">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddComponents;
