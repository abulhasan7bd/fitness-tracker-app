import React from "react";
import UseAuth from "../../../hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";

const Profile = () => {
  const { user } = UseAuth();
  const useAxios = UseAxios();
  const email = user?.email;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userProfile", email],
    queryFn: async () => {
      const res = await useAxios.get(`/user?email=${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  if (isLoading) return <p className="text-center">Loading profile...</p>;
  if (isError) return <p className="text-center text-red-600">Error loading profile</p>;

  const { name, email: userEmail, photoURL, createdAt, role } = data[0];
 
  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg text-center">
    <h2 className="text-3xl font-bold mb-6">My Profile</h2>

    <div className="flex justify-center mb-4">
      <img
        src={photoURL}
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
      />
    </div>

    <div className="mb-4">
      <p className="text-gray-500 text-sm">Full Name</p>
      <p className="text-xl font-semibold">{name}</p>
    </div>

    <div className="mb-4">
      <p className="text-gray-500 text-sm">Email</p>
      <p className="text-lg">{userEmail}</p>
    </div>

    <div className="mb-4">
      <p className="text-gray-500 text-sm">Role</p>
      <p className="text-lg capitalize">{role}</p>
    </div>

    <div>
      <p className="text-gray-500 text-sm">Account Created</p>
      <p className="text-lg">{new Date(createdAt).toLocaleString()}</p>
    </div>
  </div>
</div>

  );
};

export default Profile;
