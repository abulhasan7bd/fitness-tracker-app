import React, { useState, useEffect } from "react";

const Profile = () => {
  // Dummy initial user data, replace with real user data fetching
  const [profile, setProfile] = useState({
    name: "John Doe",
    photo: "https://via.placeholder.com/150",
    email: "johndoe@example.com",
    lastLogin: "2025-07-09 15:30:00",
  });

  // Controlled inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert(`Profile saved!\nName: ${profile.name}\nPhoto: ${profile.photo}`);
    // TODO: Integrate API or Firebase update here
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

      <label className="block mb-2 font-medium">Full Name</label>
      <input
        type="text"
        name="name"
        value={profile.name}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded mb-4"
      />

      <label className="block mb-2 font-medium">Profile Picture URL</label>
      <input
        type="text"
        name="photo"
        value={profile.photo}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded mb-4"
      />

      {profile.photo && (
        <img
          src={profile.photo}
          alt="Profile"
          className="w-32 h-32 rounded-full mb-4 object-cover"
        />
      )}

      <label className="block mb-2 font-medium">Email (read-only)</label>
      <input
        type="email"
        name="email"
        value={profile.email}
        readOnly
        className="w-full border bg-gray-100 px-3 py-2 rounded mb-4"
      />

      <p className="mb-4 text-gray-600">
        Last Login: <span className="font-semibold">{profile.lastLogin}</span>
      </p>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Profile;
