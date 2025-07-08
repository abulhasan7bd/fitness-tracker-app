import React from "react";

const trainers = [
  {
    id: 1,
    name: "Amina Rahman",
    bio: "Certified fitness coach with 8 years of experience helping clients reach their goals.",
    expertise: ["Strength Training", "Yoga", "Nutrition"],
    photo:
      "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    name: "Rafiq Ahmed",
    bio: "Personal trainer specializing in HIIT and weight loss programs tailored to individual needs.",
    expertise: ["HIIT", "Weight Loss", "Cardio"],
    photo:
      "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 3,
    name: "Sofia Khan",
    bio: "Experienced Pilates instructor passionate about core strength and flexibility.",
    expertise: ["Pilates", "Core Strength", "Flexibility"],
    photo:
      "https://randomuser.me/api/portraits/women/75.jpg",
  },
];

const Team = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">Meet Our Trainers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {trainers.map(({ id, name, bio, expertise, photo }) => (
          <div
            key={id}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
          >
            <img
              src={photo}
              alt={name}
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-blue-600">{name}</h3>
            <p className="text-gray-600 mb-3">{bio}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {expertise.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
