import React from "react";

const LoadingSpiner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-center">
      <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
      <p className="text-lg text-gray-600">⏳ Loading...</p>
    </div>
  );
};

export default LoadingSpiner;
