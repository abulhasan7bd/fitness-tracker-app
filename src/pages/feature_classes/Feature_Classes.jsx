import React from "react";

const dummyClasses = [
  {
    id: 1,
    title: "Yoga Basics",
    description: "Improve flexibility and mindfulness.",
    totalBookings: 132,
  },
  {
    id: 2,
    title: "HIIT Training",
    description: "High-intensity interval workouts to burn fat fast.",
    totalBookings: 120,
  },
  {
    id: 3,
    title: "Pilates Core",
    description: "Strengthen your core with guided Pilates sessions.",
    totalBookings: 110,
  },
  {
    id: 4,
    title: "Zumba Dance",
    description: "Fun, energetic dance workout for all levels.",
    totalBookings: 105,
  },
  {
    id: 5,
    title: "Strength Training",
    description: "Build muscle with expert-guided routines.",
    totalBookings: 98,
  },
  {
    id: 6,
    title: "Cardio Kickboxing",
    description: "Burn calories with cardio-focused kickboxing.",
    totalBookings: 94,
  },
];

const Feature_Classes = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🏆 Featured Classes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dummyClasses.map((cls) => (
            <div
              key={cls.id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                {cls.title}
              </h3>
              <p className="text-gray-600 mb-3">{cls.description}</p>
              <span className="text-sm text-green-600 font-medium">
                📈 {cls.totalBookings} Bookings
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature_Classes;
