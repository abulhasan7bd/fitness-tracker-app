import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const MyList = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const {user,loading } = use(AuthContext);
 

  const userEmail = user ? user.email:null; // 🔁 এখানে auth থেকে ইমেইল আনলে সেট করো
console.log(userEmail)
 useEffect(() => {
  const fetchData = async () => {
    if (!userEmail) return; 

    try {
      const res = await fetch(`http://localhost:5000/findbyEmail?email=${userEmail}`);
      const data = await res.json();
      
      console.log(data)
      
      setListings(data);
    } catch (err) {
      setError("Failed to fetch data");
    }
  };

  fetchData();
}, [userEmail]); 


  const handleEdit = (id) => {
    alert("Edit ID: " + id);
    // এখানে Edit logic বা route নাও
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      // Backend এ delete করো
      fetch(`http://localhost:5000/delete/${id}`, {
        method: "DELETE",
      })
        .then(res => res.json())
        .then(result => {
          if (result.deletedCount > 0) {
            setListings(prev => prev.filter(item => item._id !== id));
          }
        });
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">My Listings</h2>
      {listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
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
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-500 font-semibold">No</span>
                  )}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(item._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyList;
