import React from "react";
import UseAuth from "../hooks/UseAuth";

const DashBoardHome = () => {
  const { user } = UseAuth();
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center">
        <div className="card shadow-xl bg-base-100 p-6 md:p-10 rounded-2xl border border-base-300">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Welcome to your Dashboard
          </h1>
          <p className="text-lg md:text-xl text-base-content mb-6">
            Hello,{" "}
            <span className="font-semibold text-secondary">
              {user?.displayName || "User"}
            </span>{" "}
            👋
          </p>
          <div className="divider">Your Best</div>
          <p className="text-base-content">
            Manage your account, track your activities, and stay updated. This
            is your personalized space.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashBoardHome;
