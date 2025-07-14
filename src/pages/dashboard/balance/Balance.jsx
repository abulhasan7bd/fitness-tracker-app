import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import UseAxios from "../../../hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";
const Balance = () => {
  const useAxios = UseAxios();

  // ১. বুকিং পেমেন্ট ডেটা নিয়ে আসা (শেষ ৬ ট্রানজেকশন এবং টোটাল)
  const { data: payments = [], isLoading: loadingPayments } = useQuery({
    queryKey: ["bookingPayments"],
    queryFn: async () => {
      const res = await useAxios.get("/booking-payments"); // তোমার API এন্ডপয়েন্ট দিন
      return res.data;
    },
  });

  // ২. নিউজলেটার সাবস্ক্রাইবার সংখ্যা
  const { data: newsletterSubscribers = [], isLoading: loadingSubscribers } =
    useQuery({
      queryKey: ["newsletterSubscribers"],
      queryFn: async () => {
        const res = await useAxios.get("/subscriptions"); // API এন্ডপয়েন্ট দিন
        return res.data;
      },
    });

  // ৩. পেইড মেম্বার সংখ্যা
  const { data: paidMembers = [], isLoading: loadingPaidMembers } = useQuery({
    queryKey: ["paidMembers"],
    queryFn: async () => {
      const res = await useAxios.get("/paid-members"); // তোমার API এন্ডপয়েন্ট দিন
      return res.data;
    },
  });

  if (loadingPayments || loadingSubscribers || loadingPaidMembers) {
    return <p>Loading...</p>;
  }

  // Total balance (সব পেমেন্টের যোগফল)
  const totalBalance = payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  // সর্বশেষ ৬ টি ট্রানজেকশন
  const lastSixTransactions = payments.slice(-6).reverse();

  // চার্ট ডাটা
  const chartData = [
    { name: "Newsletter Subscribers", value: newsletterSubscribers.length },
    { name: "Paid Members", value: paidMembers.length },
  ];

  const COLORS = ["#0088FE", "#00C49F"];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Balance Overview</h2>

      <div className="mb-8 text-center">
        <p className="text-xl font-semibold">
          Total Remaining Balance:{" "}
          <span className="text-green-600">${totalBalance.toFixed(2)}</span>
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Last 6 Transactions</h3>
        {lastSixTransactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <table className="w-full border border-gray-300 text-left text-sm">
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
        <h3 className="text-2xl font-semibold mb-4">
          Subscribers vs Paid Members
        </h3>
        <PieChart width={400} height={300}>
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
      </div>
    </div>
  );
};

export default Balance;
