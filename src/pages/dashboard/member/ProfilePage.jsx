import React, { useState } from "react";
import { getAuth } from "firebase/auth";

const ProfilePage = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [profile, setProfile] = useState({
    name: user.displayName || "",
    photo: user.photoURL || "",
    other: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleUpdate = () => {
    alert("Profile updated (dummy)");
    console.log(profile);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>
      <div className="space-y-4">
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Full Name"
        />
        <input
          name="photo"
          value={profile.photo}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Profile Photo URL"
        />
        <input
          value={user.email}
          readOnly
          className="w-full bg-gray-100 px-3 py-2 rounded"
        />
        <input
          name="other"
          value={profile.other}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Other Info (optional)"
        />
        <p className="text-sm text-gray-600">Last Login: {user.metadata.lastSignInTime}</p>
        <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
