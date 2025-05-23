import React from "react";
import { use } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Edit = () => {
  let loaderData = useLoaderData();
  console.log(loaderData);
  const { user } = use(AuthContext);
  const navigate = useNavigate();
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
    console.log(data);
    fetch(
      `https://rommate-founder-server.vercel.app/rommateEdit/${loaderData._id}`,
      {
        method: "PUT",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => {
        console.log(res);
        navigate("/my-listings");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-base-200 p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Update Roommate Post
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column */}
          <div>
            <label className="label">Title</label>
            <input
              type="text"
              name="title"
              className="input w-full"
              placeholder="Post title"
              defaultValue={loaderData.title}
              required
            />

            <label className="label">Rent Amount ($)</label>
            <input
              type="number"
              name="rentAmount"
              className="input w-full"
              placeholder="1200"
              defaultValue={loaderData.rentAmount}
              required
            />

            <label className="label">Room Type</label>
            <select
              name="roomType"
              className="select w-full"
              defaultValue={loaderData.roomType}
              required
            >
              <option value="">Select type</option>
              <option value="Single">Single</option>
              <option value="Shared">Shared</option>
            </select>

            <label className="label">Lifestyle Preferences</label>
            <div className="flex flex-wrap gap-4 mb-2">
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="pets"
                  defaultChecked={loaderData.lifestylePreferences.pets}
                />{" "}
                Pets
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="smoking"
                  defaultChecked={loaderData.lifestylePreferences.smoking}
                />{" "}
                Smoking
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="nightOwl"
                  defaultChecked={loaderData.lifestylePreferences.nightOwl}
                />{" "}
                Night Owl
              </label>
            </div>

            <label className="label">Contact Info</label>
            <input
              type="text"
              name="contactInfo"
              className="input w-full"
              placeholder="Phone or email"
              defaultValue={loaderData.contactInfo}
              required
            />

            <label className="flex items-center gap-2 my-2">
              <input type="checkbox" name="availability" defaultChecked />
              Available
            </label>
          </div>

          {/* Right Column */}
          <div>
            <label className="label">Location</label>
            <input
              type="text"
              name="location"
              className="input w-full"
              placeholder="City/Area"
              defaultValue={loaderData.location}
              required
            />

            <label className="label">Description</label>
            <textarea
              name="description"
              className="textarea w-full resize-none h-[100px]"
              placeholder="Write something..."
              defaultValue={loaderData.description}
              required
            />

            <label className="label">User Email (Read-only)</label>
            <input
              type="email"
              name="userEmail"
              className="input w-full"
              value={user ? user.email : ""}
              readOnly
            />

            <label className="label">User Name (Read-only)</label>
            <input
              type="text"
              name="userName"
              className="input w-full"
              value={user ? user.displayName : ""}
              readOnly
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6">
          Update
        </button>
      </form>
    </div>
  );
};

export default Edit;
