import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyList = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setAllPosts(data);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (confirmed) {
      const updatedPosts = myPosts.filter((item) => item.id !== id);
      setMyPosts(updatedPosts);
      alert("Listing deleted successfully ✅");

      // যদি backend থাকে এখানে fetch/axios দিয়ে DELETE request পাঠাবে
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`); // Update Page রাউট ধরছি
  };

  
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        My Listings
      </h2>

      {myPosts.length === 0 ? (
        <p className="text-center text-gray-600">
          No listings found for your account.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-100 text-gray-700 text-left">
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Rent</th>
                <th className="px-6 py-3">Room Type</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myPosts.map((post) => (
                <tr key={post.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{post.title}</td>
                  <td className="px-6 py-4">{post.location}</td>
                  <td className="px-6 py-4">${post.rentAmount}</td>
                  <td className="px-6 py-4">{post.roomType}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleUpdate(post.id)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyList;
