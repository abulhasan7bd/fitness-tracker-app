import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { ResponsiveContainer } from "recharts";
import UseSecure from './../../../hooks/UseSecure';

// Simple Tailwind spinner
const Spinner = () => (
  <div className="flex justify-center items-center h-40">
    <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
  </div>
);

const Balance = () => {
  const useAxios = UseSecure();

  // Newsletter Subscribers
  const { data: newsletterSubscribers = [], isLoading: loadingSubscribers } =
    useQuery({
      queryKey: ["newsletterSubscribers"],
      queryFn: async () => {
        const res = await useAxios.get("/subscriptions");
        return res.data;
      },
    });

  // Payment Transactions
  const { data: paidMembers = [], isLoading: loadingPaidMembers } = useQuery({
    queryKey: ["paidMembers"],
    queryFn: async () => {
      const res = await useAxios.get("/payment");
      return res.data;
    },
  });

  // Show spinner while loading
  if (loadingSubscribers || loadingPaidMembers) {
    return <Spinner />;
  }

  // Total Balance Calculation
  const totalBalance = paidMembers.reduce(
    (sum, item) => sum + (item.price || 0),
    0
  );

  // Last 6 transactions
  const lastSixTransactions = [...paidMembers]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6)
    .map((txn) => ({
      _id: txn._id,
      date: txn.date,
      memberEmail: txn.payerEmail || txn.email || txn.userEmail,
      amount: txn.price || 0,
      status: txn.status || "paid",
    }));

  // Chart Data
  const chartData = [
    { name: "Newsletter Subscribers", value: newsletterSubscribers.length },
    { name: "Paid Members", value: paidMembers.length },
  ];

  const COLORS = ["#0088FE", "#00C49F"];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 bg-white shadow rounded-lg">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Balance Overview
      </h2>

      <div className="mb-8 text-center">
        <p className="text-lg sm:text-xl font-semibold">
          Total Remaining Balance:{" "}
          <span className="text-green-600">${totalBalance.toFixed(2)}</span>
        </p>
      </div>

      <div className="mb-8 overflow-x-auto">
        <h3 className="text-xl sm:text-2xl font-semibold mb-4">
          Last 6 Transactions
        </h3>
        {lastSixTransactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <table className="min-w-[600px] w-full border border-gray-300 text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Member Email</th>
                <th className="py-2 px-4 border">Amount</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {lastSixTransactions.map((txn) => (
                <tr key={txn._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">
                    {new Date(txn.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">{txn.memberEmail}</td>
                  <td className="py-2 px-4 border">${txn.amount.toFixed(2)}</td>
                  <td className="py-2 px-4 border capitalize">{txn.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div>
        <h3 className="text-xl sm:text-2xl font-semibold mb-4">
          Subscribers vs Paid Members
        </h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
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

export default Balance;
