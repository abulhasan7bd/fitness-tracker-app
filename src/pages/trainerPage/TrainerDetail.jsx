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
    university: {
      name: "State University",
      passingYear: 2015,
    },
    expertise: ["Strength Training", "Cardio", "HIIT"],
    bio: "John is a certified personal trainer with over 8 years of experience helping clients achieve their fitness goals. He's known for his dynamic sessions and personalized approach.",
    social: {
      facebook: "https://facebook.com/johndoe",
      instagram: "https://instagram.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
    },
    slots: [
      "Monday 10:00 AM",
      "Monday 5:00 PM",
      "Wednesday 2:00 PM",
      "Friday 9:00 AM",
    ],
    workExperience: {
      companyName: "FitLife Gym",
      duration: "3 years",
      ownerFeedback:
        "John’s dedication and personalized training approach have significantly improved our clients' fitness levels. Highly recommended!",
    },

    // 🆕 New Feature: Fitness Tracker
    fitnessTracker: {
      currentClients: 12,
      clientProgress: [
        {
          clientId: "c001",
          name: "Alice Smith",
          goal: "Lose 5kg in 2 months",
          progress: "2kg lost",
          lastUpdated: "2025-07-10",
          sessionsCompleted: 8,
          totalSessions: 16,
        },
        {
          clientId: "c002",
          name: "Bob Johnson",
          goal: "Build muscle mass",
          progress: "Gained 3kg muscle",
          lastUpdated: "2025-07-09",
          sessionsCompleted: 10,
          totalSessions: 20,
        },
      ],
      achievements: [
        "Helped 50+ clients achieve transformation",
        "Maintained 95% client retention rate",
      ],
    },
  };

  const handleSlotClick = (slot) => {
    navigate(`/booking/${trainer.id}?slot=${encodeURIComponent(slot)}`);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-[#dfede0] py-12">
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
              <p className="text-gray-600">
                {trainer.experience} of experience
              </p>
              <p className="text-gray-600 mt-1">
                🎓 {trainer.university.name}, Class of{" "}
                {trainer.university.passingYear}
              </p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{trainer.bio}</p>
          <h3 className="font-semibold mb-2">Expertise:</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            {trainer.expertise.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          <div className="flex space-x-4 mb-4">
            <a
              href={trainer.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ef4444] transition"
            >
              <img
                src="https://img.icons8.com/ios-filled/24/000000/facebook-new.png"
                alt="Facebook"
              />
            </a>
            <a
              href={trainer.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ef4444] transition"
            >
              <img
                src="https://img.icons8.com/ios-filled/24/000000/instagram-new.png"
                alt="Instagram"
              />
            </a>
            <a
              href={trainer.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ef4444] transition"
            >
              <img
                src="https://img.icons8.com/ios-filled/24/000000/linkedin.png"
                alt="LinkedIn"
              />
            </a>
          </div>
        </div>

        {/* Right Side: Available Slots & Work Experience */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-6">
          {/* Available Slots */}
          <div>
            <h3 className="text-xl font-bold mb-4">Available Slots</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {trainer.slots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => handleSlotClick(slot)}
                  className="bg-[#301e4e] text-white px-4 py-2 rounded-2xl cursor-pointer   transition"
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h3 className="text-xl font-bold mb-4">Work Experience</h3>
            <p className="text-gray-700">
              <span className="font-semibold">Company:</span>{" "}
              {trainer.workExperience.companyName}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Duration:</span>{" "}
              {trainer.workExperience.duration}
            </p>
            <p className="mt-3 italic text-gray-600 border-l-4 border-[#ef4444] pl-4">
              "{trainer.workExperience.ownerFeedback}"
            </p>
          </div>
        </div>
    
      </div>
          {/* Fitness Tracker Section */}
        <div className="max-w-5xl mx-auto p-6 mt-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">📈 Fitness Tracker</h2>

            {/* Current Clients */}
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Current Clients:</span>{" "}
              {trainer.fitnessTracker.currentClients}
            </p>

            {/* Client Progress */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {trainer.fitnessTracker.clientProgress.map((client) => (
                <div
                  key={client.clientId}
                  className="border border-gray-200 p-4 rounded-xl shadow-sm bg-gray-50"
                >
                  <h3 className="text-lg font-semibold mb-1">{client.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    🎯 Goal: {client.goal}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    📊 Progress: {client.progress}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    ✅ Sessions: {client.sessionsCompleted}/
                    {client.totalSessions}
                  </p>
                  <p className="text-xs text-gray-400">
                    Last Updated: {client.lastUpdated}
                  </p>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-xl font-bold mb-2">🏆 Achievements</h3>
              <ul className="list-disc list-inside text-gray-700">
                {trainer.fitnessTracker.achievements.map((ach, index) => (
                  <li key={index}>{ach}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
    </section>
  );
};

export default TrainerDetail;
