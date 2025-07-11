import React from "react";
import { useNavigate } from "react-router-dom";

const TrainerDetail = () => {
  const navigate = useNavigate();

  // Dummy Trainer Data
  const trainer = {
    id: "t001",
    name: "John Doe",
    photo: "https://i.pravatar.cc/150?img=10",
    experience: "8 years",
    expertise: ["Strength Training", "Cardio", "HIIT"],
    bio: "John is a certified personal trainer with over 8 years of experience helping clients achieve their fitness goals. He's known for his dynamic sessions and personalized approach.",
    social: {
      facebook: "https://facebook.com/johndoe",
      instagram: "https://instagram.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe"
    },
    slots: [
      "Monday 10:00 AM",
      "Monday 5:00 PM",
      "Wednesday 2:00 PM",
      "Friday 9:00 AM"
    ]
  };

  const handleSlotClick = (slot) => {
    navigate(`/booking/${trainer.id}?slot=${encodeURIComponent(slot)}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Trainer Info */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={trainer.photo}
            alt={trainer.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">{trainer.name}</h2>
            <p className="text-gray-600">{trainer.experience} of experience</p>
          </div>
        </div>
        <p className="text-gray-700 mb-2">{trainer.bio}</p>
        <h3 className="font-semibold mt-4">Expertise:</h3>
        <ul className="list-disc list-inside text-gray-700">
          {trainer.expertise.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
        <div className="mt-4 flex space-x-4">
          <a href={trainer.social.facebook} target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/ios-filled/24/000000/facebook-new.png" alt="Facebook" />
          </a>
          <a href={trainer.social.instagram} target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/ios-filled/24/000000/instagram-new.png" alt="Instagram" />
          </a>
          <a href={trainer.social.linkedin} target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/ios-filled/24/000000/linkedin.png" alt="LinkedIn" />
          </a>
        </div>
      </div>

      {/* Available Slots */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-xl font-bold mb-4">Available Slots</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {trainer.slots.map((slot, index) => (
            <button
              key={index}
              onClick={() => handleSlotClick(slot)}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainerDetail;

