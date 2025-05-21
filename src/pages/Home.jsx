import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/heders/Headder";
const Home = () => {
  const [roommates, setRoommates] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setRoommates(data.slice(0, 7)); // শুধু ৬টি
      })
      .catch((error) => console.error("Error loading data:", error));
  }, []);
console.log(roommates)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Featured Roommate Posts */}
      <section className="p-8 bg-gray-100">
        <h2 className="text-3xl font-semibold mb-6">Featured Roommates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roommates.map((roommate) => (
            <div
              key={roommate.id}
              className="bg-white rounded shadow p-4 flex flex-col items-center"
            >
              <img
                src={roommate.img}
                alt={roommate.name}
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">{roommate.name}</h3>
              <p className="text-gray-600">
                {roommate.location} • {roommate.age} years
              </p>
              <p className="mt-2 text-center">{roommate.bio}</p>
              <button className="bg-blue-200 p-[10px] rounded-2xl cursor-pointer">
                <Link to={`details/${roommate.id}`}> See More</Link>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
