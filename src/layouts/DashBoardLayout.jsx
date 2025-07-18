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
      <Link onClick={() => setSidebarOpen(false)} to="/" className="flex items-center gap-2 hover:text-blue-600">
        <FaHome /> Home
      </Link>
      <Link onClick={() => setSidebarOpen(false)} to="/dashboard/profile" className="flex items-center gap-2 hover:text-blue-600">
        <FaUser /> My Profile
      </Link>

      {role_info === "admin" && (
        <>
          <Link onClick={() => setSidebarOpen(false)} to="/dashboard/allNewsSubscribers" className="flex items-center gap-2 hover:text-blue-600">
            <FaCalendarPlus /> All News Subscribers
          </Link>
          <Link onClick={() => setSidebarOpen(false)} to="/dashboard/allTrainers" className="flex items-center gap-2 hover:text-blue-600">
            <FaCalendarPlus /> All Trainer
          </Link>
          <Link onClick={() => setSidebarOpen(false)} to="/dashboard/appliedTrainer" className="flex items-center gap-2 hover:text-blue-600">
            <FaCalendarPlus /> Applied Trainer
          </Link>
          <Link onClick={() => setSidebarOpen(false)} to="/dashboard/balance"  className="flex items-center gap-2 hover:text-blue-600">
            <FaCalendarPlus /> Balance
          </Link>
          <Link onClick={() => setSidebarOpen(false)} to="/dashboard/add-a-new-class" className="flex items-center gap-2 hover:text-blue-600">
            <FaCalendarPlus /> Add a New Class
          </Link>
          <Link onClick={() => setSidebarOpen(false)} to="/dashboard/deleateAtrainer" className="flex items-center gap-2 hover:text-blue-600">
            <FaCalendarPlus /> Delete a Trainer
          </Link>
          <Link onClick={() => setSidebarOpen(false)} to="/dashboard/new-forum" className="flex items-center gap-2 hover:text-blue-600">
            <FaCalendarPlus /> Add a New Forum
          </Link>
        </>
      )}

     

      {role_info === "trainer" && (
        <>
          <Link onClick={() => setSidebarOpen(false)} to="/dashboard/add-new-slot" className="flex items-center gap-2 hover:text-blue-600">
            <FaCalendarPlus /> Add New Slot
          </Link>
          <Link onClick={() => setSidebarOpen(false)} to="/dashboard/manage-slot" className="flex items-center gap-2 hover:text-blue-600">
            <FaCalendarPlus /> Manage Slot
          </Link>
          <Link onClick={() => setSidebarOpen(false)} to="/dashboard/new-forum" className="flex items-center gap-2 hover:text-blue-600">
            <FaCalendarPlus /> Add a New Forum
          </Link>
        </>
      )}

      {role_info === "member" && (
        <>
          <Link onClick={() => setSidebarOpen(false)} to="/dashboard/activity-log" className="flex items-center gap-2 hover:text-blue-600">
            <FaClipboardList /> Activity Log
          </Link>
          <Link onClick={() => setSidebarOpen(false)} to="/dashboard/profile" className="flex items-center gap-2 hover:text-blue-600">
            <FaUserCheck /> Profile
          </Link>
          <Link onClick={() => setSidebarOpen(false)} to="/dashboard/booked-trainer" className="flex items-center gap-2 hover:text-blue-600">
            <FaAddressBook /> Booke a Trainer
          </Link>
          <Link onClick={() => setSidebarOpen(false)} to="/dashboard/be-a-trainer" className="flex items-center gap-2 hover:text-blue-600">
            <FaClipboardList /> Be a Trainer
          </Link>
        </>
      )}

       <Link onClick={() => setSidebarOpen(false)} to="/dashboard/my-bookings" className="flex items-center gap-2 hover:text-blue-600">
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
      <div className="md:hidden flex items-center justify-between bg-white p-4 shadow">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <button onClick={toggleSidebar} className="text-xl">
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className="min-h-screen flex">
        {/* Sidebar for desktop */}
        <aside className="hidden md:block w-64 h-screen sticky top-0 bg-white shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          <nav className="space-y-4 text-sm font-medium text-gray-700">
            <NavLinks />
          </nav>
        </aside>

        {/* Sidebar for mobile */}
        {sidebarOpen && (
          <aside className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg p-6 z-50 md:hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Dashboard</h2>
              <button onClick={toggleSidebar} className="text-xl">
                <FaTimes />
              </button>
            </div>
            <nav className="space-y-4 text-sm font-medium text-gray-700">
              <NavLinks />
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 bg-gray-100 min-h-screen">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashBoardLayout;

