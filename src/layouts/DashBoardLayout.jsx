import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaClipboardList,
  FaBookOpen,
  FaCalendarPlus,
  FaUserCheck,
  FaAddressBook,
} from "react-icons/fa";
import UseAdmin from "../hooks/UseAdmin";
import UseAuth from "../hooks/UseAuth";
const DashBoardLayout = () => {
  const { userInfo } = UseAdmin();
  const role_info = userInfo[0]?.role;

  console.log(role_info);
  return (
    <div className="min-h-screen  flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 h-screen sticky top-0 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-4 text-sm font-medium">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <FaHome /> Home
          </Link>
          <Link
            to="/dashboard/profile"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <FaUser /> My Profile
          </Link>

          <Link
            to="/dashboard/my-bookings"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <FaBookOpen /> My Bookings
          </Link>
          {/* Admin  */}
          {role_info === "Admin" && (
            <>
              <Link
                to="/dashboard/add-a-new-class"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                <FaCalendarPlus /> Add a New Class
              </Link>
              <Link
                to="/allNewsSubscribers"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                <FaCalendarPlus /> All News Subscribers
              </Link>
              <Link
                to="/deleateAtrainer"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                <FaCalendarPlus /> Delete a Trainer
              </Link>
              <Link
                to="/appliedTrainer"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                <FaCalendarPlus /> Applied Trainer
              </Link>
              <Link
                to="/balance"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                <FaCalendarPlus />
                Balance
              </Link>
            </>
          )}
          {/* Trainer */}
          {role_info === "Trainer" && (
            <>
              <Link
                to="/dashboard/add-new-slot"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                <FaCalendarPlus /> Add New Slot
              </Link>
              <Link
                to="/dashboard/manage-slot"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                <FaCalendarPlus /> Manage slot
              </Link>
              <Link
                to="/dashboard/new-forum"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                <FaCalendarPlus /> Add a New Forum
              </Link>
            </>
          )}
          {/* Member  */}
          {role_info === "Member" && (
            <>
              <Link
                to="/dashboard/activity-log"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                <FaClipboardList /> Activity Log
              </Link>
              <Link
                to="/dashboard/profile"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                <FaUserCheck /> Profile
              </Link>
              <Link
                to="/dashboard/booked-trainer"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                <FaAddressBook /> Booked Trainer
              </Link>
              <Link
                to="/dashboard/be-a-trainer"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                <FaClipboardList /> Be a Trainer
              </Link>
            </>
          )}
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashBoardLayout;
