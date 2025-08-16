import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../hooks/UseAxios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
 import LoadingSpiner from './../../pages/loading/LoadingSpiner';

const Overview = () => {
  const axios = UseAxios();

  // Fetch Users
  const {
    data: users = [],
    isLoading: loadingUsers,
    error: errorUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get("/users").then((res) => res.data),
  });

  // Fetch Approved Trainers
  const {
    data: trainers = [],
    isLoading: loadingTrainers,
    error: errorTrainers,
  } = useQuery({
    queryKey: ["approvedTrainers"],
    queryFn: () => axios.get("/approved-trainers").then((res) => res.data),
  });

  if (loadingUsers || loadingTrainers) return <LoadingSpiner />;
  if (errorUsers || errorTrainers) return <p className="text-red-600">Failed to load data.</p>;

  // Summary stats
  const stats = [
    { title: "Total Users", value: users.length, color: "bg-blue-500" },
    { title: "Total Trainers", value: trainers.length, color: "bg-green-500" },
    { title: "Total Classes", value: 80, color: "bg-purple-500" }, // Replace with real data if available
    { title: "Total Bookings", value: 350, color: "bg-yellow-500" }, // Replace with real data if available
  ];

  // Dummy chart data
  const weeklyBookings = [
    { day: "Mon", bookings: 20 },
    { day: "Tue", bookings: 35 },
    { day: "Wed", bookings: 25 },
    { day: "Thu", bookings: 40 },
    { day: "Fri", bookings: 30 },
    { day: "Sat", bookings: 50 },
    { day: "Sun", bookings: 45 },
  ];

  const classBookings = [
    { name: "Yoga", count: 50 },
    { name: "Crossfit", count: 30 },
    { name: "Cardio", count: 40 },
    { name: "Pilates", count: 25 },
  ];

  const memberPlan = [
    { name: "Basic", value: 400 },
    { name: "Premium", value: 300 },
    { name: "Pro", value: 200 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl text-white shadow-lg ${stat.color}`}
          >
            <h2 className="text-2xl font-bold">{stat.value}</h2>
            <p className="mt-2">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Line Chart - Weekly Bookings */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Weekly Bookings</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyBookings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="bookings" stroke="#8884d8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Class Bookings */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Bookings by Class</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={classBookings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Members by Plan */}
        <div className="bg-white p-6 rounded-2xl shadow-lg lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Members by Plan</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={memberPlan}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {memberPlan.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Overview;
