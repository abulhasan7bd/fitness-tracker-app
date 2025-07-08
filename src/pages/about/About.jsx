import React from "react";

const About = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            About Fitness Tracker
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Fitness Tracker is your personal health companion designed to help
            you stay on track with your fitness journey. Whether you're training
            for a marathon, trying to lose weight, or just staying active, our
            app provides the tools and motivation you need.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            With real-time tracking, goal setting, and visual insights, we aim
            to simplify your wellness experience and make your progress visible
            every step of the way.
          </p>
        </div>

        {/* Right Image */}
        <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=800&q=80"
            alt="Fitness Team"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
