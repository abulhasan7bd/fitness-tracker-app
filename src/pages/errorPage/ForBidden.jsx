import React from "react";
import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

const ForBidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md text-center">
        <div className="flex justify-center mb-6 text-red-500">
          <ShieldAlert size={60} />
        </div>
        <h1 className="text-5xl font-bold text-red-600 mb-2">403</h1>
        <h2 className="text-2xl font-semibold mb-4">Forbidden Access</h2>
        <p className="text-gray-600 mb-6">
          Sorry, you don’t have permission to access this page. Please check
          your credentials or contact admin.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 text-white bg-red-500 hover:bg-red-600 rounded-xl transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ForBidden;
