import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Loading from "../../pages/Loading";
import Swal from "sweetalert2";

const MyList = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const { user, loading } = use(AuthContext);
  const userEmail = user ? user.email : null;

  useEffect(() => {
    const fetchData = async () => {
      if (!userEmail) return;
      try {
        const res = await fetch(
          `https://rommate-founder-server.vercel.app/findbyEmail?email=${userEmail}`
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setListings(data);
        } else {
          setListings([]);
        }
      } catch (err) {
        console.log(err);
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, [userEmail]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://rommate-founder-server.vercel.app/delete/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.deletedCount > 0) {
              setListings((prev) => prev.filter((item) => item._id !== id));
            }
          });
      }
    });
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">My Listings</h2>

      {Array.isArray(listings) && listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">User Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Available</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((item) => (
                  <tr key={item._id} className="border-t">
                    <td className="px-4 py-2">{item.userName}</td>
                    <td className="px-4 py-2">{item.userEmail}</td>
                    <td className="px-4 py-2">{item.title}</td>
                    <td className="px-4 py-2">{item.location}</td>
                    <td className="px-4 py-2">
                      {item.availability ? (
                        <span className="text-green-600 font-semibold">
                          Yes
                        </span>
                      ) : (
                        <span className="text-red-500 font-semibold">No</span>
                      )}
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      <Link
                        to={`/my-listings/edit/${item._id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
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

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {listings.map((item) => (
              <div key={item._id} className="border p-4 rounded-md shadow">
                <p>
                  <strong>Name:</strong> {item.userName}
                </p>
                <p>
                  <strong>Email:</strong> {item.userEmail}
                </p>
                <p>
                  <strong>Title:</strong> {item.title}
                </p>
                <p>
                  <strong>Description:</strong> {item.location}
                </p>
                <p>
                  <strong>Available:</strong>{" "}
                  {item.availability ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-500 font-semibold">No</span>
                  )}
                </p>
                <div className="mt-3 space-x-2">
                  <Link
                    to={`/my-listings/edit/${item._id}`}
                    className="inline-block bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="inline-block bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyList;
