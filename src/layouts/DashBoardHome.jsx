import React from "react";
import UseAuth from "../hooks/UseAuth";

const DashBoardHome = () => {
  const { user } = UseAuth();
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 
                bg-gradient-to-b from-[#239BA7]/10 via-[#7ADAA5]/10 to-[#CADCAE]/10 
                dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors"
    >
      <div className="max-w-xl w-full text-center">
        <div
          className="card shadow-xl p-6 md:p-10 rounded-2xl border 
                    border-[#239BA7]/40 dark:border-gray-700 
                    bg-white dark:bg-gray-800 transition-colors"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#239BA7] dark:text-[#7ADAA5] mb-4">
            Welcome to your Dashboard
          </h1>

          <p className="text-lg md:text-xl text-gray-900 dark:text-gray-100 mb-6">
            Hello,{" "}
            <span className="font-semibold text-[#7ADAA5] dark:text-[#CADCAE]">
              {user?.displayName || "User"}
            </span>{" "}
            👋
          </p>

          <div className="divider text-gray-400 dark:text-gray-300">
            Your Best
          </div>

          <p className="text-gray-800 dark:text-gray-200 mt-4">
            Manage your account, track your activities, and stay updated. This
            is your personalized space.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashBoardHome;
