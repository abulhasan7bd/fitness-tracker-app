import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaClipboardList,
  FaBookOpen,
  FaCalendarPlus,
  FaUserCheck,
  FaAddressBook,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import UseAdmin from "../hooks/UseAdmin";
import { Helmet } from "react-helmet";

const DashBoardLayout = () => {
  const { userInfo } = UseAdmin();
  const role_info = userInfo[0]?.role;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const NavLinks = () => (
    <>
      <Link
        onClick={() => setSidebarOpen(false)}
        to="/"
        className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-[#7ADAA5] transition-colors"
      >
        <FaHome /> Home
      </Link>

      {role_info === "admin" && (
        <>
          <Link
            onClick={() => setSidebarOpen(false)}
            to="/dashboard/overview"
            className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-[#7ADAA5] transition-colors"
          >
            <FaUserCheck /> Overview
          </Link>
          <Link
            onClick={() => setSidebarOpen(false)}
            to="/dashboard/allNewsSubscribers"
            className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-[#7ADAA5] transition-colors"
          >
            <FaCalendarPlus /> All News Subscribers
          </Link>
          <Link
            onClick={() => setSidebarOpen(false)}
            to="/dashboard/allTrainers"
            className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-[#7ADAA5] transition-colors"
          >
            <FaCalendarPlus /> All Trainer
          </Link>
          <Link
            onClick={() => setSidebarOpen(false)}
            to="/dashboard/appliedTrainer"
            className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-[#7ADAA5] transition-colors"
          >
            <FaCalendarPlus /> Applied Trainer
          </Link>
          <Link
            onClick={() => setSidebarOpen(false)}
            to="/dashboard/balance"
            className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-[#7ADAA5] transition-colors"
          >
            <FaCalendarPlus /> Balance
          </Link>
          <Link
            onClick={() => setSidebarOpen(false)}
            to="/dashboard/add-a-new-class"
            className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-[#7ADAA5] transition-colors"
          >
            <FaCalendarPlus /> Add a New Class
          </Link>
          <Link
            onClick={() => setSidebarOpen(false)}
            to="/dashboard/deleateAtrainer"
            className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-[#7ADAA5] transition-colors"
          >
            <FaCalendarPlus /> Delete a Trainer
          </Link>
          <Link
            onClick={() => setSidebarOpen(false)}
            to="/dashboard/new-forum"
            className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-[#7ADAA5] transition-colors"
          >
            <FaCalendarPlus /> Add a New Forum
          </Link>
        </>
      )}

      {role_info === "trainer" && (
        <>
          <Link
            onClick={() => setSidebarOpen(false)}
            to="/dashboard/add-new-slot"
            className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-[#7ADAA5] transition-colors"
          >
            <FaCalendarPlus /> Add New Slot
          </Link>
          <Link
            onClick={() => setSidebarOpen(false)}
            to="/dashboard/manage-slot"
            className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-[#7ADAA5] transition-colors"
          >
            <FaCalendarPlus /> Manage Slot
          </Link>
          <Link
            onClick={() => setSidebarOpen(false)}
            to="/dashboard/new-forum"
            className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-[#7ADAA5] transition-colors"
          >
            <FaCalendarPlus /> Add a New Forum
          </Link>
        </>
      )}

      {role_info === "member" && (
        <>
          <Link
            onClick={() => setSidebarOpen(false)}
            to="/dashboard/activity-log"
            className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-[#7ADAA5] transition-colors"
          >
            <FaClipboardList /> Activity Log
          </Link>
          <Link
            onClick={() => setSidebarOpen(false)}
            to="/dashboard/profile"
            className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-[#7ADAA5] transition-colors"
          >
            <FaUserCheck /> Profile
          </Link>
          <Link
            onClick={() => setSidebarOpen(false)}
            to="/dashboard/overview"
            className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-[#7ADAA5] transition-colors"
          >
            <FaUserCheck /> Overview
          </Link>
          <Link
            onClick={() => setSidebarOpen(false)}
            to="/dashboard/booked-trainer"
            className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-[#7ADAA5] transition-colors"
          >
            <FaAddressBook /> Booke a Trainer
          </Link>
          <Link
            onClick={() => setSidebarOpen(false)}
            to="/dashboard/be-a-trainer"
            className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-[#7ADAA5] transition-colors"
          >
            <FaClipboardList /> Be a Trainer
          </Link>
        </>
      )}

      <Link
        onClick={() => setSidebarOpen(false)}
        to="/dashboard/my-bookings"
        className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-[#7ADAA5] transition-colors"
      >
        <FaBookOpen /> My Bookings
      </Link>
    </>
  );

  return (
    <>
      <Helmet>
        <title>FitTrack | DashBoard</title>
      </Helmet>

      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between bg-white dark:bg-gray-800 p-4 shadow transition-colors">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Dashboard
        </h2>
        <button
          onClick={toggleSidebar}
          className="text-xl text-gray-900 dark:text-gray-100"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className="min-h-screen flex">
        {/* Sidebar for desktop */}
        <aside className="hidden md:block w-64 h-screen sticky top-0 bg-white dark:bg-gray-800 shadow-lg p-6 transition-colors">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Dashboard
          </h2>
          <section className="space-y-4 text-sm font-medium text-gray-700 dark:text-gray-200">
            <NavLinks />
          </section>
        </aside>

        {/* Sidebar for mobile */}
        {sidebarOpen && (
          <aside className="fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-800 shadow-lg p-6 z-50 transition-colors">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Dashboard
              </h2>
              <button
                onClick={toggleSidebar}
                className="text-xl text-gray-900 dark:text-gray-100"
              >
                <FaTimes />
              </button>
            </div>
            <nav className="space-y-4 text-sm font-medium text-gray-700 dark:text-gray-200">
              <NavLinks />
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashBoardLayout;
