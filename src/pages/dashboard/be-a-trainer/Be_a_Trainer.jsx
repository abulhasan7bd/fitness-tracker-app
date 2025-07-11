import React from "react";
import { useNavigate } from "react-router-dom";
const Be_a_Trainer = () => {
  const navigate = useNavigate();

  const handleBecomeTrainerClick = () => {
    navigate("/dashboard/be-a-trainer/apply"); 
  };

  return (
    <section className="bg-gray-100 py-10 px-4 text-center rounded-2xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-4">Passionate About Fitness?</h2>
      <p className="text-gray-700 text-lg mb-6">
        Join our team of expert trainers and help others achieve their goals!
      </p>
      <button
        onClick={handleBecomeTrainerClick}
        className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 text-lg rounded-xl transition-all duration-300"
      >
        Become a Trainer
      </button>
    </section>
  );
};

export default Be_a_Trainer;
