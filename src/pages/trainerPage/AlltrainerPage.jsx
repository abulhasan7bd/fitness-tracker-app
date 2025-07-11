import React from "react";
import { Link } from "react-router-dom";
import { trainers } from "./trainer";
const AlltrainerPage = () => {
 


  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Meet All Our Trainers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {trainers.map((trainer) => (
          <div
            key={trainer.id}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <img
              src={trainer.image}
              alt={trainer.name}
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-600 mb-1">
              {trainer.name}
            </h3>
            <p className="text-gray-600 mb-2">
              Experience: {trainer.experience} years
            </p>
            <p className="text-gray-600 mb-4">
              Available Slots: {trainer.availableSlots}
            </p>

            {/* Social Icons */}
            <div className="flex justify-center gap-4 mb-4 text-blue-600">
              <a href={trainer.socials.facebook} target="_blank" rel="noreferrer">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href={trainer.socials.instagram} target="_blank" rel="noreferrer">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href={trainer.socials.twitter} target="_blank" rel="noreferrer">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
            </div>

            <Link
              to={`/trainers/${trainer.id}`}
              className="inline-block mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              Know More
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AlltrainerPage;


;
