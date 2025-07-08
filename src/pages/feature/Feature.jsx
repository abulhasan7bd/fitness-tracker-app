import React from "react";
import { Dumbbell, LineChart, Target, ListTodo } from "lucide-react";

const Feature = () => {
  const features = [
    {
      title: "Track Workouts",
      description:
        "Log your daily exercises including running, cycling, yoga, and more.",
      icon: <Dumbbell className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "Monitor Progress",
      description:
        "View your weekly activity, calories burned, and time spent.",
      icon: <LineChart className="h-10 w-10 text-green-500" />,
    },
    {
      title: "Set Fitness Goals",
      description:
        "Create and manage personal fitness goals to stay motivated.",
      icon: <Target className="h-10 w-10 text-red-500" />,
    },
    {
      title: "Visualize Your Stats",
      description:
        "See trends with graphs and charts for a clear overview of your progress.",
      icon: <ListTodo className="h-10 w-10 text-purple-500" />,
    },
  ];
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Why Use Fitness Tracker?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
