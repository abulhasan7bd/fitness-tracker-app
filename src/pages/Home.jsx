import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import Header from "../components/heders/Headder";
const Home = () => {
  const loderData = useLoaderData();
  console.log(loderData)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Featured Roommate Posts */}
      <section className="p-8 bg-gray-100">
        <h2 className="text-3xl font-semibold mb-6">Featured Roommates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loderData.slice(0,6).map((roommate) => (
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
                <Link to={`details/${roommate._id}`}> See More</Link>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
