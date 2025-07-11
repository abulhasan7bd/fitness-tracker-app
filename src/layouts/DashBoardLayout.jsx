
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaHome, FaUser, FaClipboardList, FaChalkboardTeacher, FaBookOpen, FaCalendarPlus, FaUserCheck, FaEye, FaAddressBook } from "react-icons/fa";

const DashBoardLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-4 text-sm font-medium">
          <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <FaHome /> Home
          </Link>
          <Link to="/dashboard/profile" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <FaUser /> My Profile
          </Link>
          <Link to="/dashboard/be-a-trainer" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <FaClipboardList /> Be a Trainer
          </Link>
          <Link to="/dashboard/my-bookings" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <FaBookOpen /> My Bookings
          </Link>
          <Link to="/dashboard/add-a-new-class" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <FaCalendarPlus /> Add a New Class
          </Link>
          <Link to="/dashboard/add-new-slot" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <FaCalendarPlus /> Add New Slot
          </Link>
          <Link to="/dashboard/activity-log" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <FaClipboardList /> Activity Log
          </Link>
          <Link to="/dashboard/profile" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <FaUserCheck /> Profile
          </Link>
          <Link to="/dashboard/booked-trainer" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <FaAddressBook /> Booked Trainer
          </Link>
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
        <Outlet /> {/* Shows nested route pages */}
      </main>
    </div>
  );
};

export default DashBoardLayout;
